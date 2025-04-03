'use client'

export default function AuditSteps() {
	return (
		<div className='text-sm text-muted-foreground'>
			<p className='py-2'>
				Go through the 4 steps below to complete the audit. Before you start: Decide which automated
				tool you will use, eg. Silktide Accessibility Checker (great tool), Lighthouse, WAVE, etc.
				(also see Tool/Method column in the audit table).
			</p>
			<ul>
				<li className='py-2'>Step 1. Enter client info.</li>
				<li className='py-2'>
					Step 2. Click the Click to expand the audit table link. Enter your observations in the
					Observations column, eg. "The form is not accessible because there is no label for the
					input field." See How to Check and Where to Check columns for more information on how to
					check the criteria.
				</li>
				<li className='py-2'>Step 3. Add an executive summary.</li>
				<li className='py-2'>
					Step 4. Export the audit data as an HTML. When the file opens, press Cmd + P, select Save
					as PDF in the dropdown and save the file.
				</li>
			</ul>
		</div>
	)
}
