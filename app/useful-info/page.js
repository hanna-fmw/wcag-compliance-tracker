'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Hero from '../components/Hero'

export default function UsefulInfoPage() {
	const [expandedSections, setExpandedSections] = useState({
		pages: false,
		usefulLinks: false,
	})

	const toggleSection = (section) => {
		setExpandedSections((prev) => ({
			...prev,
			[section]: !prev[section],
		}))
	}
	return (
		<main className='container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6'>
			<div className='space-y-6'>
				<Hero title='Useful Info' description='Useful info and links for web accessibility' />
				{/* Pages to Include Section */}
				<Card>
					<CardHeader>
						<CardTitle
							className='flex justify-between items-center cursor-pointer'
							onClick={() => toggleSection('pages')}>
							How Many Pages to Include in an Audit?
							<span
								className={`transform transition-transform ${
									expandedSections.pages ? 'rotate-90' : ''
								}`}>
								▶
							</span>
						</CardTitle>
					</CardHeader>
					<CardContent>
						{expandedSections.pages && (
							<div className='space-y-6'>
								<div>
									<h3 className='text-lg font-semibold mb-2'>Representative Sampling</h3>
									<p className='text-muted-foreground mb-3'>
										The audit should cover a diverse and representative selection of pages,
										including:
									</p>
									<ul className='list-disc pl-6 space-y-2 text-muted-foreground'>
										<li>Homepage</li>
										<li>Navigation menus</li>
										<li>Key user flows (e.g., login, forms, checkout)</li>
										<li>Dynamic content (e.g., pop-ups, modals)</li>
										<li>Different content types (text, images, videos, PDFs, etc.)</li>
									</ul>
								</div>

								<div>
									<h3 className='text-lg font-semibold mb-2'>Minimum Recommendation</h3>
									<ul className='list-disc pl-6 space-y-2 text-muted-foreground'>
										<li>Small websites (under 10 pages): Test all pages</li>
										<li>Medium websites (10-100 pages): Test at least 10-15 key pages</li>
										<li>
											Large websites (100+ pages): Test a percentage (e.g., 5-10%) across different
											templates and functionalities
										</li>
									</ul>
								</div>
								<div>
									<h3 className='text-lg font-semibold mb-2'>Other Recommendations</h3>
									<p className='pl-6 space-y-2 text-muted-foreground'>
										Instead of evaluating every page, choose the pages and functionalities that
										represent the broader experience of the website. For example:
									</p>
									<ul className='list-disc pl-6 space-y-2 text-muted-foreground'>
										<li>Most popular pages</li>
										<li>Range of template types</li>
										<li>At least one service end-to-end (where possible)</li>
										<li>Other pages your stakeholders (or you) thinks really need to be tested</li>
										<li>Try to limit the amount of pages (8-10).</li>
										<li>
											When writing down issues you'll need to refer to screens (and sometimes
											specific states), so it helps to list the URLs and to take screenshots of all
											the pages and create an overview in FigJam or Miro to refer to.
										</li>
									</ul>
								</div>
							</div>
						)}
					</CardContent>
				</Card>
				{/* Pages to Include Section */}
				<Card>
					<CardHeader>
						<CardTitle
							className='flex justify-between items-center cursor-pointer'
							onClick={() => toggleSection('usefulLinks')}>
							Useful Links
							<span
								className={`transform transition-transform ${
									expandedSections.pages ? 'rotate-90' : ''
								}`}>
								▶
							</span>
						</CardTitle>
					</CardHeader>
					<CardContent>
						{expandedSections.usefulLinks && (
							<div className='space-y-6'>
								<div>
									<h3 className='text-lg font-semibold mb-2'>Webbriktlinjer</h3>
									<p className='text-muted-foreground mb-3'>
										<span className='font-bold'>Digg's</span> (myndigheten för digital förvaltning)
										webbriktlinjer. Should cover all necessary checks. In Swedish, well explained:
									</p>
									<Link
										className='underline text-muted-foreground mb-3'
										href='https://www.digg.se/webbriktlinjer/alla-webbriktlinjer'>
										Webbriktlinjer
									</Link>{' '}
								</div>
								<div className='space-y-6'>
									<div>
										<h3 className='text-lg font-semibold mb-2'>
											Tillgänglighetskrav på webbplatser och appar
										</h3>
										<p className='text-muted-foreground mb-3'>
											<span className='font-bold'>PTS's</span> (Post- och telestyrelsen) page about
											accessibility requirements. See section Tillgänglighetskrav på webbplatser och
											appar:
										</p>
										<Link
											className='underline text-muted-foreground mb-3'
											href='https://pts.se/digital-inkludering/digin/lagkrav/introduktion-till-tillganglighetsdirektivet/vilka-ar-kraven/tillganglighetskrav/'>
											Accessibility requirements
										</Link>
									</div>
								</div>
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</main>
	)
}
