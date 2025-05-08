'use client'
import React, { useRef } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export default function ReportPreview({ auditData, onClose }) {
	const reportRef = useRef(null)
	if (!auditData) return null

	const handleDownloadJSON = () => {
		const jsonString = JSON.stringify(auditData, null, 2)
		const blob = new Blob([jsonString], { type: 'application/json' })
		const url = URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = `wcag-audit-${auditData.clientName || 'unnamed'}.json`
		document.body.appendChild(a)
		a.click()
		document.body.removeChild(a)
		URL.revokeObjectURL(url)
	}

	const handleDownloadHTML = () => {
		const htmlContent = `
			<!DOCTYPE html>
			<html>
			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>WCAG Accessibility Audit Report</title>
				<style>
					@page { size: auto; margin: 0; }
					body { margin: 0; padding: 0; }
					${document.querySelector('style').innerHTML}
				</style>
			</head>
			<body>
				${reportRef.current.innerHTML}
			</body>
			</html>
		`
		const blob = new Blob([htmlContent], { type: 'text/html' })
		const url = URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = `wcag-audit-${auditData.clientName || 'unnamed'}.html`
		document.body.appendChild(a)
		a.click()
		document.body.removeChild(a)
		URL.revokeObjectURL(url)
	}

	const handleDownloadPDF = async () => {
		if (!reportRef.current) return

		try {
			const contentHeight = reportRef.current.scrollHeight
			const contentWidth = reportRef.current.scrollWidth

			const canvas = await html2canvas(reportRef.current, {
				scale: 2,
				useCORS: true,
				logging: false,
				backgroundColor: '#ffffff',
				height: contentHeight,
				width: contentWidth,
				windowHeight: contentHeight,
				windowWidth: contentWidth,
			})

			const imgData = canvas.toDataURL('image/png')
			const pdfWidth = 210
			const pdfHeight = (canvas.height * pdfWidth) / canvas.width

			const pdf = new jsPDF({
				orientation: pdfHeight > pdfWidth ? 'portrait' : 'landscape',
				unit: 'mm',
				format: [pdfWidth, pdfHeight],
			})

			pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
			pdf.save(`wcag-audit-${auditData.clientName || 'unnamed'}.pdf`)
		} catch (error) {
			console.error('Error generating PDF:', error)
			alert('There was an error generating the PDF. Please try again.')
		}
	}

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
			<div className='bg-gray-900 text-[#212121] rounded-md max-w-4xl w-full max-h-[90vh] overflow-y-auto'>
				<div className='p-4 border-b flex justify-between items-center bg-gray-900 text-white'>
					<h1 className='text-xl font-semibold'>Report Preview</h1>
					<button
						onClick={onClose}
						className='text-white hover:text-white font-bold hover:cursor-pointer'>
						✕
					</button>
				</div>

				<div className='p-4' ref={reportRef}>
					<style>
						{`
							/* Base styles for the report */
							body, .report-container {
								font-family: inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
								padding: 1rem;
								line-height: 1.5;
								font-size: 0.75rem;
								color: #3d3d3d;
								
							}
							
							/* Section spacing */
							.report-section {
								padding: 1.5rem;
								border: 1px solid #e5e7eb;
								background-color: white;
								
							}
							
							/* Headings */
							.report-heading {
								font-family: JubilatRegular;
								font-size: 1rem;
								line-height: 1;
								letter-spacing: -0.025em;
								padding: 1.25rem;
								padding-bottom: 0.75rem;
							}
							
							/* Text styles */
							.report-text {
								padding: 0.75rem 1.25rem;
								font-size: 0.75rem;
								color: #3d3d3d;
							}
							
							/* Lists */
							.report-list {
								padding: 0.75rem 1.25rem;
								margin-top: 0.75rem;
								margin-bottom: 0.75rem;
								font-size: 0.75rem;
								color: #3d3d3d;
							}
							
							.report-list li {
								display: flex;
								align-items: flex-start;
								margin-bottom: 1rem;
							}
							
							.report-list li::before {
								content: "•";
								margin-right: 0.5rem;
							}
							
							/* Observation cards */
							.observation-card {
								border-radius: 0.5rem;
								border: 1px solid #e5e7eb;
								background-color: white;
								box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
								padding: 1.5rem;
							}
							
							.observation-header {
								display: flex;
								justify-content: space-between;
								align-items: flex-start;
								margin-bottom: 1rem;
							}
							
							.observation-title {
								font-size: 1rem;
								line-height: 1;
								letter-spacing: -0.025em;
							}
							
							.observation-level {
								font-size: 0.75rem;
								color: #3d3d3d;
							}
							
							.observation-description {
								font-size: 0.875rem;
								color: #3d3d3d;
								margin-bottom: 1rem;
							}
							
							.observation-label {
								margin-bottom: 0.5rem;
							}
							
							.observation-content {
								font-size: 0.75rem;
								color: #3d3d3d;
								white-space: pre-wrap;
							}

							/* Links */
							.report-link {
								color: #2563eb;
							}
							
							.report-link:hover {
								text-decoration: underline;
							}

							/* Executive Summary */
							.executive-summary {
								white-space: pre-wrap;
								font-size: 0.75rem;
								color: #3d3d3d;
							}

							/* Space between observation cards */
							.observations-container > div + div {
								margin-top: 1.5rem;
							}

							/* Subheadings in Review Process 
							.text-lg.font-semibold {
								font-size: 1rem;
								
								margin-top: 1.5rem;
								margin-bottom: 0.75rem;
							}*/
						`}
					</style>

					{/* <section className='report-section'>
						<h1 className='report-heading'>WCAG Accessibility Audit Report</h1>

						<h2 className='report-heading'>About the Audit</h2>
						<p className='report-text'>
							The aim of this audit is to evaluate the conformance of {auditData.clientName} with
							W3C's Web Content Accessibility Guidelines (WCAG) 2.2 at level AA and the European
							Accessibility Act. The assessment includes automated testing, manual review, and
							assistive technology simulations to identify barriers affecting users with
							disabilities.
						</p>
						<p className='report-text'>
							The evaluation results in this report are based on evaluations conducted on the
							following date(s): {new Date(auditData.dateCreated).toLocaleDateString('sv-SE')}. The
							website may have changed since that time.
						</p>
					</section> */}

					<section className='report-section'>
						<h2 className='report-heading'>Scope of the Audit</h2>
						<ul className='report-list'>
							<li>Website: {auditData.clientName}</li>
							<li>Client: {auditData.clientId}</li>
							<li>WCAG Version: 2.2</li>
							<li>Conformance Target: AA</li>
							<li>Audit By: Stormfors</li>
						</ul>
					</section>

					<section className='report-section'>
						<h2 className='report-heading'>Executive Summary</h2>
						<div className='report-text'>
							<p className='executive-summary'>{auditData.executiveSummary}</p>
							<p>More details on these findings can be found below.</p>
						</div>
					</section>

					<section className='report-section'>
						<h2 className='report-heading'>Review Process</h2>
						<p className='report-text'>
							To evaluate the website's accessibility, we conducted a combination of automated
							testing, manual review, and assistive technology simulations. This approach ensures a
							thorough assessment of potential barriers affecting users with disabilities.
						</p>

						<h3 className='report-heading mt-6 mb-3'>Automated Testing</h3>
						<p className='report-text'>
							Automated tools can quickly scan a website for common accessibility issues. However,
							they should always be complemented with manual testing.
						</p>

						<h3 className='report-heading mt-6 mb-3'>Manual Testing & Visual Inspection</h3>
						<ul className='report-list mb-4'>
							<li>
								Surface level checks to the text to catch readability issues, inconsistencies,
								spelling mistakes, and grammatical errors
							</li>
							<li>General inspection of the website's layout, spacing, and alignment</li>
							<li>Ensuring content structure follows a logical reading order</li>
						</ul>

						<h3 className='report-heading mt-6 mb-3'>Assistive Technology & Simulations</h3>
						<ul className='report-list mb-4'>
							<li>Screen reader testing for navigation and content accessibility</li>
							<li>Color blindness simulation tools to assess contrast and usability</li>
							<li>Keyboard navigation checks to ensure users can interact with all elements</li>
						</ul>
					</section>

					<section className='report-section'>
						<h2 className='report-heading'>Observations</h2>
						<div className='observations-container'>
							{auditData.observations.map((urlSection, urlIndex) => (
								<div key={urlIndex} className='mb-8'>
									<h3 className='report-heading mt-6 mb-3 bg-gray-100 p-4 rounded-lg'>
										URL: {urlSection.url}
									</h3>
									<div className='space-y-4'>
										{urlSection.observations.map((obs, index) => (
											<div key={index} className='observation-card'>
												<div className='observation-header'>
													<h3 className='observation-title'>{obs.criterion}</h3>
													<span className='observation-level'>{obs.level}</span>
												</div>
												<p className='report-text'>{obs.description}</p>
												<h4 className='observation-label'>Evaluation</h4>
												<p className='report-text'>{obs.observation}</p>
											</div>
										))}
									</div>
								</div>
							))}
						</div>
					</section>

					{auditData.otherFindings && (
						<section className='report-section'>
							<h2 className='report-heading'>Other Findings</h2>
							<div className='report-text'>
								<p className='executive-summary'>{auditData.otherFindings}</p>
							</div>
						</section>
					)}

					<section className='report-section'>
						<h2 className='report-heading'>Next Steps & Recommended Actions</h2>
						<p className='report-text'>
							Based on our findings, we recommend implementing the necessary fixes to improve
							accessibility. Our developers and designers will review the identified issues, assess
							their impact, and determine how they should be addressed. Some adjustments may be
							simple, while others could require more extensive changes.
						</p>
						<p className='report-text'>
							For the next steps we typically provide a time estimate to make the improvements and
							discuss the best approach to improving the website's accessibility in line with WCAG
							2.2 and the European Accessibility Act.
						</p>
					</section>

					<section className='report-section'>
						<h2 className='report-heading'>References</h2>

						<ul className='report-list space-y-2'>
							<li>
								<a href='https://www.w3.org/WAI/standards-guidelines/wcag/' className='report-link'>
									Web Content Accessibility Guidelines (WCAG) Overview
								</a>
							</li>
							<li>
								<a href='https://www.w3.org/TR/WCAG22/' className='report-link'>
									Web Content Accessibility Guidelines 2.2
								</a>
							</li>
							<li>
								<a href='https://www.w3.org/WAI/WCAG22/Techniques/' className='report-link'>
									Techniques for WCAG 2
								</a>
							</li>
							<li>
								<a
									href='https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/disability/union-equality-strategy-rights-persons-disabilities-2021-2030/european-accessibility-act_en'
									className='report-link'>
									European Accessibility Act
								</a>
							</li>
						</ul>
					</section>
				</div>

				<div className='p-4 border-t flex justify-end gap-4'>
					<button
						onClick={handleDownloadPDF}
						className='bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900'>
						Download PDF
					</button>
					<button
						onClick={handleDownloadHTML}
						className='bg-green-800 text-white px-4 py-2 rounded hover:bg-green-900'>
						Download HTML
					</button>
					<button
						onClick={handleDownloadJSON}
						className='bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900'>
						Download JSON
					</button>
				</div>
			</div>
		</div>
	)
}
