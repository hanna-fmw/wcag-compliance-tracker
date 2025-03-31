export default function Instructions() {
	return (
		<div className='rounded-lg border bg-card text-card-foreground shadow-sm'>
			<div className='flex flex-col space-y-1.5 p-6'>
				<h2 className='text-2xl font-semibold leading-none tracking-tight'>Instructions</h2>
			</div>
			<div className='p-6 pt-0'>
				<ul className='space-y-4 text-sm text-muted-foreground'>
					<li className='flex items-start'>
						<span className='mr-2'>•</span>
						Select Pages Home page + 3-5 critical pages (e.g., contact, services, forms). See How
						Many Pages to Include in an Audit? on Useful Info page. Also, go to "website
						URL"/sitemap.xml. Copy paste the sitemap. Paste it into chatGPT with the following
						prompt or similar: The following is the sitemap.xml for konnect.se - what pages should I
						include in the accessibility report to get a representative sample of the site,
						including any translated pages? Use the answer as a guideline.
					</li>
					<li className='flex items-start'>
						<span className='mr-2'>•</span>
						Pick an automated tool, eg Silktide Accessibility Checker, Lighthouse, WAVE, etc. (also
						see Tool/Method column).
					</li>
					<li className='flex items-start'>
						<span className='mr-2'>•</span>
						Enter observations in the Observations column, eg. "The form is not accessible because
						there is no label for the input field." See How to Check and Where to Check columns for
						more information on how to check the criteria.
					</li>

					<li className='flex items-start'>
						<span className='mr-2'>•</span>
						Export the audit data to a PDF, HTML, or JSON file.
					</li>
					<li className='flex items-start'>
						<span className='mr-2'>•</span>
						Clear the data to start over and create a new audit.
					</li>
				</ul>
			</div>
		</div>
	)
}
