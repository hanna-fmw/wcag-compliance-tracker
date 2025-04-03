export default function Instructions() {
	return (
		<div className='rounded-lg border bg-card text-card-foreground shadow-sm'>
			<div className='flex flex-col space-y-1.5 p-6'>
				<h2 className='text-2xl font-semibold leading-none tracking-tight'>General Instructions</h2>
			</div>
			<div className='p-6 pt-0'>
				<ul className='space-y-4 text-sm text-muted-foreground'>
					<li className='flex items-start'>
						<span className='mr-2'>•</span>
						Decide which automated tool you will use, eg. Silktide Accessibility Checker (great
						tool), Lighthouse, WAVE, etc. (also see Tool/Method column).
					</li>
					<li className='flex items-start'>
						<span className='mr-2'>•</span>
						Select which pages should be included in the audit, eg. Home page + 3-5 critical pages
						(e.g., contact, services, forms).
						<br />
						You can also go to "website URL"/sitemap.xml. Copy the sitemap. Paste it into chatGPT
						with the following prompt or similar:
						<br />
						"Here is the sitemap.xml for website.se. Based on it, identify which pages should be
						included in an accessibility report to ensure a representative sample of the site,
						including translated pages. Consider key templates, functionalities, and content
						variations in your selection. Use your answer as a guideline."
						<br />
						More info on how to do this in the Useful Info page.
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
