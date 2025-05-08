'use client'

import { CardHeader, CardTitle } from '@/components/ui/card'
export default function ExecutiveSummaryStep() {
	return (
		<CardHeader>
			<CardTitle>
				<h3 className='text-xl font-medium leading-none tracking-tight py-4'>
					Step 3: Add Executive Summary
				</h3>
			</CardTitle>

			<p className='text-sm text-muted-foreground'>
				Enter a summary based on the observations you have entered in the audit table. This summary
				will appear in the PDF report and should highlight key findings, major issues, and general
				recommendations. (The placeholder text in the field below is meant as an example).
			</p>
			<p className='text-sm text-muted-foreground'>
				Tip: Paste in all your observations into chatGPT and ask it to summarize it for you, and
				then paste the summary in the Add executive summary field below.
			</p>
		</CardHeader>
	)
}
