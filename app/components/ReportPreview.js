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
		a.download = `wcag-audit-${auditData.clientName || 'unnamed'}-${
			new Date().toISOString().split('T')[0]
		}.json`
		document.body.appendChild(a)
		a.click()
		document.body.removeChild(a)
		URL.revokeObjectURL(url)
	}

	const handleDownloadHTML = () => {
		const htmlContent = reportRef.current.innerHTML
		const blob = new Blob([htmlContent], { type: 'text/html' })
		const url = URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = `wcag-audit-${auditData.clientName || 'unnamed'}-${
			new Date().toISOString().split('T')[0]
		}.html`
		document.body.appendChild(a)
		a.click()
		document.body.removeChild(a)
		URL.revokeObjectURL(url)
	}

	const handleDownloadPDF = async () => {
		if (!reportRef.current) return

		try {
			// Get the full height of the content
			const contentHeight = reportRef.current.scrollHeight
			const contentWidth = reportRef.current.scrollWidth

			const canvas = await html2canvas(reportRef.current, {
				scale: 2,
				useCORS: true,
				logging: false,
				backgroundColor: '#ffffff',
				// Explicitly set dimensions to match content
				height: contentHeight,
				width: contentWidth,
				// Ensure full content capture
				windowHeight: contentHeight,
				windowWidth: contentWidth,
			})

			const imgData = canvas.toDataURL('image/png')

			// Calculate PDF dimensions to fit content
			const pdfWidth = 210 // A4 width in mm
			const pdfHeight = (canvas.height * pdfWidth) / canvas.width

			const pdf = new jsPDF({
				orientation: pdfHeight > pdfWidth ? 'portrait' : 'landscape',
				unit: 'mm',
				format: [pdfWidth, pdfHeight],
			})

			pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)

			pdf.save(
				`wcag-audit-${auditData.clientName || 'unnamed'}-${
					new Date().toISOString().split('T')[0]
				}.pdf`
			)
		} catch (error) {
			console.error('Error generating PDF:', error)
			alert('There was an error generating the PDF. Please try again.')
		}
	}

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
			<div className='bg-gray-200 text-black rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto'>
				<div className='p-4 border-b flex justify-between items-center bg-gray-700 text-white'>
					<h1 className='text-xl font-semibold'>Report Preview</h1>
					<button
						onClick={onClose}
						className='text-gray-500 hover:text-gray-700 hover:cursor-pointer'>
						✕
					</button>
				</div>

				<div className='p-4' ref={reportRef}>
					<section className='mb-8'>
						<h1 className='text-xl font-semibold border-b py-4 mb-4'>
							WCAG Accessibility Audit Report
						</h1>

						<h2 className='text-xl font-semibold mb-4'>About the Evaluation</h2>
						<p className='mb-4'>
							The aim of this audit is to evaluate the conformance of {auditData.clientName} with
							W3C's Web Content Accessibility Guidelines (WCAG) 2.2 at level AA and the European
							Accessibility Act. The assessment includes automated testing, manual review, and
							assistive technology simulations to identify barriers affecting users with
							disabilities.
						</p>
						<p>
							The evaluation results in this report are based on evaluations conducted on the
							following date(s): {new Date(auditData.dateCreated).toLocaleDateString()}. The website
							may have changed since that time.
						</p>
					</section>

					<section className='mb-8'>
						<h2 className='text-xl font-semibold mb-4'>Scope of the Evaluation</h2>
						<ul className='list-disc pl-5'>
							<li>Website Name: {auditData.clientName}</li>
							<li>Client ID: {auditData.clientId}</li>
							<li>WCAG Version: 2.2</li>
							<li>Conformance Target: AA</li>
							<li>Evaluation By: Stormfors</li>
						</ul>
					</section>

					<section className='mb-8'>
						<h2 className='text-xl font-semibold mb-4'>Executive Summary</h2>
						<div className='space-y-4'>
							<p>{auditData.executiveSummary}</p>

							<p>More details on these findings can be found below.</p>
						</div>
					</section>

					<section className='mb-8'>
						<h2 className='text-xl font-semibold mb-4'>Review Process</h2>
						<p className='mb-4'>
							To evaluate the website's accessibility, we conducted a combination of automated
							testing, manual review, and assistive technology simulations. This approach ensures a
							thorough assessment of potential barriers affecting users with disabilities.
						</p>

						<h3 className='text-lg font-semibold mt-6 mb-3'>Automated Testing</h3>
						<p className='mb-4'>
							Automated tools can quickly scan a website for common accessibility issues. However,
							they should always be complemented with manual testing. Among others, we use tools
							like Lighthouse (Chrome DevTools), WAVE Evaluation Tool, Pa11y (CLI tool), ARIA
							DevTools, Readable, as well as custom internal auditing software solutions
						</p>

						<h3 className='text-lg font-semibold mt-6 mb-3'>Manual Testing & Visual Inspection</h3>
						<ul className='list-disc pl-5 mb-4'>
							<li>
								Light proof-reading (spot-check) to catch readability issues, inconsistencies,
								spelling mistakes, and grammatical errors
							</li>
							<li>General inspection of the website's layout, spacing, and alignment</li>
							<li>Ensuring content structure follows a logical reading order</li>
						</ul>

						<h3 className='text-lg font-semibold mt-6 mb-3'>Assistive Technology & Simulations</h3>
						<ul className='list-disc pl-5 mb-4'>
							<li>Screen reader testing for navigation and content accessibility</li>
							<li>Color blindness simulation tools to assess contrast and usability</li>
							<li>Keyboard navigation checks to ensure users can interact with all elements</li>
						</ul>
					</section>

					<section className='mb-8'>
						<h2 className='text-xl font-semibold mb-4'>Observations</h2>
						<div className='space-y-6'>
							{auditData.observations.map((obs, index) => (
								<div key={index} className='border rounded p-4'>
									<div className='flex justify-between items-start mb-2'>
										<h3 className='font-semibold'>{obs.criterion}</h3>
										<span className='text-sm'>{obs.level}</span>
									</div>
									<p className='text-sm mb-2'>{obs.description}</p>
									<h4 className='font-semibold mb-2'>Evaluation</h4>
									<p className='text-sm whitespace-pre-wrap'>{obs.observation}</p>
								</div>
							))}
						</div>
					</section>

					<section className='mb-8'>
						<h2 className='text-xl font-semibold mb-4'>Next Steps & Recommended Actions</h2>
						<p className='mb-4'>
							Based on our findings, we recommend implementing the necessary fixes to improve
							accessibility. Our developers and designers will review the identified issues, assess
							their impact, and determine how they should be addressed. Some adjustments may be
							simple, while others could require more extensive changes.
						</p>
						<p>
							We would be happy to provide a time estimate for the improvements and discuss the best
							approach to improving the website's accessibility in line with WCAG 2.2 and the
							European Accessibility Act.
						</p>
					</section>

					<section className='mb-8'>
						<h2 className='text-xl font-semibold mb-4'>References</h2>
						<ul className='space-y-2'>
							<li>
								<a
									href='https://www.w3.org/WAI/standards-guidelines/wcag/'
									className='text-blue-600 hover:underline'>
									Web Content Accessibility Guidelines (WCAG) Overview
								</a>
							</li>
							<li>
								<a href='https://www.w3.org/TR/WCAG22/' className='text-blue-600 hover:underline'>
									Web Content Accessibility Guidelines 2.2
								</a>
							</li>
							<li>
								<a
									href='https://www.w3.org/WAI/WCAG22/Techniques/'
									className='text-blue-600 hover:underline'>
									Techniques for WCAG 2
								</a>
							</li>
							<li>
								<a
									href='https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/disability/union-equality-strategy-rights-persons-disabilities-2021-2030/european-accessibility-act_en'
									className='text-blue-600 hover:underline'>
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
