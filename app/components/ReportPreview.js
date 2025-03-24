'use client'
import React from 'react'

export default function ReportPreview({ auditData, onClose }) {
	if (!auditData) return null

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
			<div className='bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto'>
				<div className='p-4 border-b flex justify-between items-center'>
					<h1 className='text-xl font-semibold'>WCAG Accessibility Audit Report Preview</h1>
					<button onClick={onClose} className='text-gray-500 hover:text-gray-700'>
						✕
					</button>
				</div>

				<div className='p-4'>
					<section className='mb-8'>
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
							<p>Overall evaluation, including what is good.</p>
							<p>Any Critical Issues.</p>
							<p>Moderate Issues.</p>
							<p>Minor Issues.</p>
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
						onClick={() => {
							// TODO: Implement PDF download
							console.log('Download PDF')
						}}
						className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
						Download PDF
					</button>
					<button
						onClick={() => {
							// TODO: Implement HTML download
							console.log('Download HTML')
						}}
						className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'>
						Download HTML
					</button>
					<button
						onClick={() => {
							// TODO: Implement JSON download
							console.log('Download JSON')
						}}
						className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600'>
						Download JSON
					</button>
				</div>
			</div>
		</div>
	)
}
