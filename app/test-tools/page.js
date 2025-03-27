'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import Hero from '../components/Hero'

export default function TestToolsPage() {
	const [expandedSections, setExpandedSections] = useState({
		automatedTests: false,
		pages: false,
		manualTests: false,
	})

	const toggleSection = (section) => {
		setExpandedSections((prev) => ({
			...prev,
			[section]: !prev[section],
		}))
	}

	return (
		<main className='flex flex-1 flex-col'>
			<Hero
				title='Accessibility Testing Tools and Guides'
				description='A comprehensive collection of tools and resources for testing web accessibility'
			/>

			{/* Main Content */}
			<div className='container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6'>
				<div className='space-y-6'>
					{/* Automated Tests Section */}
					<Card>
						<CardHeader>
							<CardTitle
								className='flex justify-between items-center cursor-pointer'
								onClick={() => toggleSection('automatedTests')}>
								Automated Tests
								<span
									className={`transform transition-transform ${
										expandedSections.automatedTests ? 'rotate-90' : ''
									}`}>
									▶
								</span>
							</CardTitle>
						</CardHeader>
						<CardContent>
							{expandedSections.automatedTests && (
								<div className='space-y-6'>
									<div className='space-y-6'>
										{/* W3.org Tools */}
										<div className='border-b border-gray-200 pb-4'>
											<h3 className='text-lg font-semibold'>
												<a
													href='https://www.w3.org/WAI/test-evaluate/tools/list/'
													className='text-primary hover:underline'
													target='_blank'
													rel='noopener noreferrer'>
													W3.org Web Accessibility Evaluation Tools List
												</a>
											</h3>
										</div>

										{/* Silktide */}
										<div className='border-b border-gray-200 pb-4'>
											<h3 className='text-lg font-semibold'>
												<a
													href='https://silktide.com/installed-silktide-toolbar/'
													className='text-primary hover:underline'
													target='_blank'
													rel='noopener noreferrer'>
													Silktide Accessibility Checker
												</a>
												<span className='ml-2 text-sm text-muted-foreground'>
													(Chrome extension)
												</span>
											</h3>
											<p className='text-muted-foreground mt-2'>
												Silktide's free accessibility checker tests your web page for over 200 WCAG
												issues, giving you straightforward, step-by-step guidance. The browser
												plugin highlights accessibility issues on each page, includes information on
												how to fix them, and offers a range of accessibility tools to help you
												monitor WCAG and ADA compliance.
											</p>
										</div>

										{/* Color Contrast Checker */}
										<div className='border-b border-gray-200 pb-4'>
											<h3 className='text-lg font-semibold'>
												<a
													href='https://chromewebstore.google.com/detail/color-contrast-checker-by/hfcoldjibhgbnlambdiecfneiegagkhi?hl=en'
													className='text-primary hover:underline'
													target='_blank'
													rel='noopener noreferrer'>
													Color Contrast Checker by DigitalA11Y
												</a>
												<span className='ml-2 text-sm text-muted-foreground'>
													(Chrome extension)
												</span>
											</h3>
											<p className='text-muted-foreground mt-2'>
												A Chrome extension to check color combinations against WCAG contrast ratios,
												offering palette suggestions. Ideal for designers, developers and
												accessibility experts to review or audit site color contrast. Features
												include top-of-page access, one-click color picking, manual hex input,
												instant ratio display, and WCAG-compliant color recommendations.
											</p>
										</div>

										{/* Accessibility Cloud Lite */}
										<div className='border-b border-gray-200 pb-4'>
											<h3 className='text-lg font-semibold'>
												<a
													href='https://www.accessibilitycloud.com/lite/'
													className='text-primary hover:underline'
													target='_blank'
													rel='noopener noreferrer'>
													Accessibility Cloud Lite
												</a>
												<span className='ml-2 text-sm text-muted-foreground'>(Bookmarklet)</span>
											</h3>
											<p className='text-muted-foreground mt-2'>
												Lite is Accessibility Cloud's bookmarklet. You can use it to test any web
												page, whether it's behind a login or not. It runs locally on your computer.
												Just add to bookmarks bar: Please drag and drop the link from the website to
												your bookmarks bar. When you want to test a page, click the bookmarklet to
												see the errors on the page.
											</p>
										</div>

										{/* Pope Tech */}
										<div className='border-b border-gray-200 pb-4'>
											<h3 className='text-lg font-semibold'>
												<a
													href='https://pope.tech/'
													className='text-primary hover:underline'
													target='_blank'
													rel='noopener noreferrer'>
													Pope Tech
												</a>
												<span className='ml-2 text-sm text-muted-foreground'>
													(Free for 25 pages)
												</span>
											</h3>
											<p className='text-muted-foreground mt-2'>
												Pope Tech simplifies web accessibility and makes compliance easier with
												automation, flexible team management, dynamic reporting, and a friendly
												interface made for beginners and experts. The tool crawls all pages, is
												based on WAVE, allows export of reports, and also helps with manual testing
												and much more.
											</p>
										</div>

										{/* A11y Quick Check */}
										<div className='border-b border-gray-200 pb-4'>
											<h3 className='text-lg font-semibold'>
												<a
													href='https://chromewebstore.google.com/detail/a11y-quick-check/jlamgighkcjniljcdfpnhiemcakibepi'
													className='text-primary hover:underline'
													target='_blank'
													rel='noopener noreferrer'>
													A11y Quick Check
												</a>
												<span className='ml-2 text-sm text-muted-foreground'>
													(Chrome extension)
												</span>
											</h3>
											<p className='text-muted-foreground mt-2'>
												A11y Quick Check is a browser extension for evaluating web accessibility
												through a structured checklist. It provides 42 individual tests focused on
												key accessibility aspects, including headings, grouping elements, lists,
												tables, related controls, and accessible names and descriptions. The tool
												identifies accessibility, structural, and semantic issues and includes
												guidance for manual verification.
											</p>
										</div>

										{/* VoiceOver */}
										<div className='border-b border-gray-200 pb-4'>
											<h3 className='text-lg font-semibold'>
												<a
													href='https://assistivlabs.com/use-cases/testing-any-screen-reader-on-mac'
													className='text-primary hover:underline'
													target='_blank'
													rel='noopener noreferrer'>
													VoiceOver
												</a>
												<span className='ml-2 text-sm text-muted-foreground'>
													(Built-in screen reader for Mac)
												</span>
											</h3>
											<p className='text-muted-foreground mt-2'>
												VoiceOver is the built-in screen reader for Mac. While it's a powerful tool
												for Mac users, it's important to note that it uses a different interaction
												model than Windows screen readers. VoiceOver requires holding down the "VO
												keys" (Control + Option) for navigation, whereas Windows screen readers like
												NVDA use a virtual cursor model. Testing with multiple screen readers is
												recommended for comprehensive accessibility testing.
											</p>
										</div>

										{/* WCAG Checklist by Level Access */}
										<div className='border-b border-gray-200 pb-4'>
											<h3 className='text-lg font-semibold'>
												<a
													href='https://www.levelaccess.com/thank-you-download-the-must-have-wcag-2-1-checklist/'
													className='text-primary hover:underline'
													target='_blank'
													rel='noopener noreferrer'>
													WCAG Checklist by Level Access
												</a>
												<span className='ml-2 text-sm text-muted-foreground'>
													(Downloadable resource)
												</span>
											</h3>
											<p className='text-muted-foreground mt-2'>
												A comprehensive WCAG 2.1 checklist that helps evaluate your current state of
												accessibility. This checklist is foundational for accessibility compliance
												and helps meet most global accessibility laws. Includes detailed criteria
												explanations and evaluation guidance.
											</p>
										</div>

										{/* Hike One Accessibility Evaluation Template */}
										<div className='border-b border-gray-200 pb-4'>
											<h3 className='text-lg font-semibold'>
												<a
													href='https://hike.one/insights/accessibility-evaluation-template'
													className='text-primary hover:underline'
													target='_blank'
													rel='noopener noreferrer'>
													Hike One Accessibility Evaluation Template
												</a>
												<span className='ml-2 text-sm text-muted-foreground'>(Free template)</span>
											</h3>
											<p className='text-muted-foreground mt-2'>
												A practical template for conducting accessibility audits, including
												step-by-step instructions for checking criteria, simplified WCAG
												descriptions, and helpful references. The template is designed to make
												accessibility evaluation approachable even for those new to accessibility
												testing.
											</p>
										</div>

										{/* W3C WAI Easy Checks */}
										<div className='border-b border-gray-200 pb-4'>
											<h3 className='text-lg font-semibold'>
												<a
													href='https://www.w3.org/WAI/test-evaluate/#initial'
													className='text-primary hover:underline'
													target='_blank'
													rel='noopener noreferrer'>
													W3C WAI Easy Checks
												</a>
												<span className='ml-2 text-sm text-muted-foreground'>
													(Official W3C resource)
												</span>
											</h3>
											<p className='text-muted-foreground mt-2'>
												The Web Accessibility Initiative's official guide for initial accessibility
												checks. Provides detailed instructions for evaluating key accessibility
												features like page titles, image text alternatives, headings, contrast
												ratio, and more. Each check includes step-by-step guidance and explanations
												of why these aspects are important for accessibility.
											</p>
										</div>
									</div>
								</div>
							)}
						</CardContent>
					</Card>

					{/* Manual Tests Section */}
					<Card>
						<CardHeader>
							<CardTitle
								className='flex justify-between items-center cursor-pointer'
								onClick={() => toggleSection('manualTests')}>
								Manual Tests
								<span
									className={`transform transition-transform ${
										expandedSections.manualTests ? 'rotate-90' : ''
									}`}>
									▶
								</span>
							</CardTitle>
						</CardHeader>
						<CardContent>
							{expandedSections.manualTests && (
								<div className='mt-4 space-y-8'>
									{/* Content Review Section */}
									<div>
										<h3 className='text-xl font-semibold mb-4'>Content Review</h3>
										<p className='text-muted-foreground mb-4'>
											Read through your content with accessibility best practices in mind.
										</p>

										{/* Zoom Section */}
										<div className='mb-6'>
											<h4 className='text-lg font-semibold mb-2'>Zoom in to 200%</h4>
											<p className='text-muted-foreground mb-2'>
												Control + for PCs, Command + for Mac
											</p>
											<ul className='list-disc pl-6 space-y-2 text-muted-foreground'>
												<li>
													Is all the content still present on the page and is it still in an order
													that makes sense?
												</li>
												<li>Does any of the content overlap or become far apart?</li>
												<li>
													Do navigation bars or menus get replaced with mobile-style menus, and can
													you navigate and close the menus?
												</li>
												<li>
													Do you have to scroll horizontally to read everything, and is anything cut
													off?
												</li>
												<li>
													Do links, buttons, forms, and menus still function with the content
													zoomed?
												</li>
											</ul>
										</div>

										{/* Body Text Section */}
										<div className='border-b border-gray-200 pb-4'>
											<h4 className='text-lg font-semibold mb-2'>Body Text</h4>
											<ul className='list-disc pl-6 space-y-2 text-muted-foreground'>
												<li>
													Confirm that page titles are unique and descriptive, marked as &lt;h1&gt;.
													There should only be one &lt;h1&gt; per page.
												</li>
												<li>
													Ensure visual headings are useful and descriptive, and marked up with an
													&lt;h&gt; element and in hierarchical order (&lt;h1&gt;, &lt;h2&gt;,
													etc.). Look for skipped heading levels (&lt;h2&gt; to &lt;h4&gt;).
												</li>
												<li>Look for generic link text like "read more" or "click here."</li>
												<li>
													Check that plain language is used instead of jargon, and all acronyms are
													spelled out on first reference.
												</li>
											</ul>
										</div>

										{/* Screen Reader Section */}
										<div className='mb-6'>
											<h4 className='text-lg font-semibold mb-2'>Screen Reader Test</h4>
											<p className='text-muted-foreground mb-6'>
												Test with a screen reader to uncover issues with reading order, spelling,
												dynamic content, and interactive elements. While a little daunting at first,
												it is an essential and informative step in assessing your content for
												accessibility.
											</p>
											<p className='text-muted-foreground mb-6'>
												We've created three guides - customized to whichever system and screen
												reader that you're using to test.
											</p>

											<div className='mb-6'>
												<h6 className='font-semibold mb-2'>Free screen readers:</h6>
												<ul className='list-disc pl-6 space-y-2 text-muted-foreground'>
													<li>
														<span className='font-medium'>Mac users:</span>{' '}
														<a href='#' className='text-primary hover:underline'>
															Getting Started Testing with VoiceOver
														</a>
													</li>
													<li>
														<span className='font-medium'>PC users:</span>{' '}
														<a href='#' className='text-primary hover:underline'>
															Getting Started Testing with NVDA
														</a>
													</li>
												</ul>
											</div>

											<div className='mb-6'>
												<h6 className='font-semibold mb-2'>Other screen readers:</h6>
												<ul className='list-disc pl-6 space-y-2 text-muted-foreground'>
													<li>
														<span className='font-medium'>PC users:</span>{' '}
														<a href='#' className='text-primary hover:underline'>
															Getting Started Testing with JAWS
														</a>
													</li>
												</ul>
											</div>
										</div>

										{/* Tables Section */}
										<div className='mb-6'>
											<h4 className='text-lg font-semibold mb-2'>Tables</h4>
											<ul className='list-disc pl-6 space-y-2 text-muted-foreground'>
												<li>Confirm that tables are only used for tabular data, not for layout.</li>
												<li>
													If data tables are present, ensure table caption and row and/or column
													headers are present.
												</li>
											</ul>
										</div>

										{/* Images Section */}
										<div className='mb-6'>
											<h4 className='text-lg font-semibold mb-2'>Images</h4>
											<ul className='list-disc pl-6 space-y-2 text-muted-foreground'>
												<li>
													Ensure alternative "alt" text conveys the content and function for all
													non-decorative images. It should be succinct, accurate, and useful.
												</li>
												<li>
													Look for images of text or text embedded on images, and confirm that the
													text is represented either in the body text or in the alt text. Check this
													by trying to highlight text with your cursor.
												</li>
											</ul>
										</div>

										{/* Color Section */}
										<div className='mb-6'>
											<h4 className='text-lg font-semibold mb-2'>Color</h4>
											<ul className='list-disc pl-6 space-y-2 text-muted-foreground'>
												<li>
													Check that the text and background color has a contrast ratio of at least
													4.5:1.
												</li>
												<li>
													Ensure color is not used as the only way of conveying meaning or
													information.
												</li>
											</ul>
										</div>

										{/* Forms Section */}
										<div className='mb-6'>
											<h4 className='text-lg font-semibold mb-2'>Forms</h4>
											<ul className='list-disc pl-6 space-y-2 text-muted-foreground'>
												<li>Make sure form controls have descriptive labels.</li>
												<li>
													If a label is not visible, check for a hidden &lt;label&gt;, aria-label,
													or title attribute.
												</li>
											</ul>
										</div>
									</div>

									{/* Keyboard Testing Section */}
									<div>
										<h3 className='text-xl font-semibold mb-4'>Keyboard Testing</h3>
										<p className='text-muted-foreground mb-4'>
											Can all interactive elements be selected and activated using the keyboard?
										</p>

										{/* How to Test Section */}
										<div className='mb-6'>
											<h4 className='text-lg font-semibold mb-2'>How to test with a keyboard</h4>
											<ul className='list-disc pl-6 space-y-2 text-muted-foreground'>
												<li>
													<span className='font-medium'>Tab:</span> Navigate to links and form
													controls.
												</li>
												<li>
													<span className='font-medium'>Shift + Tab:</span> Navigate backwards.
												</li>
												<li>
													<span className='font-medium'>Spacebar:</span> Activate checkboxes and
													buttons.
												</li>
												<li>
													<span className='font-medium'>Enter:</span> Activate links and buttons.
												</li>
												<li>
													<span className='font-medium'>Arrow keys:</span> Radio buttons,
													select/drop-down menus, sliders, tab panels, auto-complete, tree menus,
													etc.
												</li>
												<li>
													<span className='font-medium'>Escape:</span> Dismisses browser dialog or
													menu.
												</li>
											</ul>
										</div>

										{/* What to Check Section */}
										<div className='mb-6'>
											<h4 className='text-lg font-semibold mb-2'>What to check for</h4>
											<ul className='list-disc pl-6 space-y-2 text-muted-foreground'>
												<li>Is anything mouse-only, such as rollover menus?</li>
												<li>
													Is a "skip navigation" link available? Activate the skip link and hit Tab
													again to ensure it functions correctly.
												</li>
												<li>Is the navigation order logical and intuitive?</li>
												<li>Is a visible keyboard focus indicator present?</li>
												<li>
													Test dialogs that 'pop' open. Can you navigate and close the dialog? Does
													focus return to a logical place?
												</li>
												<li>Esc should also close all dialogs.</li>
											</ul>
										</div>
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
											<li>
												Other pages your stakeholders (or you) thinks really need to be tested
											</li>
											<li>Try to limit the amount of pages (8-10).</li>
											<li>
												When writing down issues you'll need to refer to screens (and sometimes
												specific states), so it helps to list the URLs and to take screenshots of
												all the pages and create an overview in FigJam or Miro to refer to.
											</li>
										</ul>
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
