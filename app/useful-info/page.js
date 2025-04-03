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
				<div className='space-y-6 px-6'>
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
												Large websites (100+ pages): Test a percentage (e.g., 5-10%) across
												different templates and functionalities
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
											<span className='font-bold'>Digg's</span> (myndigheten för digital
											förvaltning) webbriktlinjer. Should cover all necessary checks. In Swedish,
											well explained:
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
												<span className='font-bold'>PTS's</span> (Post- och telestyrelsen) page
												about accessibility requirements. See section Tillgänglighetskrav på
												webbplatser och appar:
											</p>
											<Link
												className='underline text-muted-foreground mb-3'
												href='https://pts.se/digital-inkludering/digin/lagkrav/introduktion-till-tillganglighetsdirektivet/vilka-ar-kraven/tillganglighetskrav/'>
												Accessibility requirements
											</Link>
										</div>
									</div>
									<div className='space-y-6'>
										<div>
											<h3 className='text-lg font-semibold mb-2'>EU:s tillgänglighetsdirektiv</h3>
											<p className='text-muted-foreground mb-3'>
												<span className='font-bold'>PTS's</span> (Post- och telestyrelsen) page
												about tillgänglighetsdirektivet:
											</p>
											<Link
												className='underline text-muted-foreground mb-3'
												href='https://pts.se/digital-inkludering/digin/lagkrav/introduktion-till-tillganglighetsdirektivet/#:~:text=tj%C3%A4nster%20och%20produkter-,Vilka%20ber%C3%B6rs%3F,-Produkter%20och%20tj%C3%A4nster'>
												About Tillgänglighetsdirektivet and the requirements
											</Link>
										</div>
									</div>
									<div className='space-y-6'>
										<div>
											<h3 className='text-lg font-semibold mb-2'>
												PTS´s page: Omfattas jag av lagen?
											</h3>
											<p className='text-muted-foreground mb-3'>
												<span className='font-bold'>PTS's</span> (Post- och telestyrelsen) page with
												questions and answers about accessibility and tillgänglighetslagen:
											</p>
											<Link
												className='underline text-muted-foreground mb-3'
												href='https://pts.se/digital-inkludering/lagen-om-vissa-produkters-och-tjansters-tillganglighet/vanliga-fragor-och-svar-om-tillganglighetslagen/'>
												Questions and answers about the law
											</Link>
										</div>
									</div>
								</div>
							)}
						</CardContent>
					</Card>
				</div>
			</div>
		</main>
	)
}
