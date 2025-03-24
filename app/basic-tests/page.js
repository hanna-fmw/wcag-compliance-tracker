'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
	const [expandedSections, setExpandedSections] = useState({
		step1: false,
		step2: false,
		step2a: false,
		step2b: false,
		step3: false,
		example: false,
		automatedTests: false,
		pages: false,
		manualTests: false,
	})

	const [checkedItems, setCheckedItems] = useState({
		imageAlt: false,
		pageTitle: false,
		headings: false,
		colorContrast: false,
		skipLink: false,
		keyboardFocus: false,
		language: false,
		zoom: false,
		captions: false,
		transcripts: false,
		audioDescription: false,
		formLabels: false,
		requiredFields: false,
		bodyText: false,
		screenReader: false,
		tables: false,
	})

	const toggleSection = (section) => {
		setExpandedSections((prev) => ({
			...prev,
			[section]: !prev[section],
			...(section === 'step2' && !prev.step2
				? {}
				: section === 'step2' && prev.step2
				? { step2a: false, step2b: false }
				: {}),
		}))
	}

	const toggleCheck = (checkId) => {
		setCheckedItems((prev) => ({
			...prev,
			[checkId]: !prev[checkId],
		}))
	}

	return (
		<main className='min-h-screen p-8 max-w-4xl mx-auto bg-white'>
			<h1 className='text-4xl font-bold mb-8 text-gray-900'>
				Internal Accessibility WCAG Audit Guide
			</h1>

			<div className='space-y-12'>
				{/* Step 1 */}
				<section
					className={`space-y-4 border rounded-lg p-6 transition-colors ${
						expandedSections.step1 ? 'bg-gray-50' : 'bg-white'
					}`}>
					<button
						onClick={() => toggleSection('step1')}
						className='flex justify-between items-center w-full text-left group'>
						<h2 className='text-2xl font-semibold text-gray-900'>Step 1: Determine the Scope</h2>
						<span
							className={`transform transition-transform text-gray-700 cursor-pointer ${
								expandedSections.step1 ? 'rotate-90' : ''
							}`}>
							▶
						</span>
					</button>
					{expandedSections.step1 && (
						<div className='mt-4'>
							<p className='text-gray-600'>
								Instead of evaluating every page, choose the pages and functionalities that
								represent the broader experience of the website. For example:
							</p>
							<ul className='list-disc pl-6 space-y-2 text-gray-600'>
								<li>Most popular pages</li>
								<li>Range of template types</li>
								<li>At least one service end-to-end (where possible)</li>
								<li>Other pages your stakeholders (or you) thinks really need to be tested</li>
							</ul>
							<p className='text-gray-600'>Try to limit the amount of pages (8-10).</p>
							<p className='text-gray-600'>
								When writing down issues you'll need to refer to screens (and sometimes specific
								states), so it helps to list the URLs and to take screenshots of all the pages and
								create an overview in FigJam or Miro to refer to.
							</p>
						</div>
					)}
				</section>

				{/* Step 2 */}
				<section
					className={`space-y-4 border rounded-lg p-6 transition-colors ${
						expandedSections.step2 ? 'bg-gray-50' : 'bg-white'
					}`}>
					<button
						onClick={() => toggleSection('step2')}
						className='flex justify-between items-center w-full text-left group'>
						<h2 className='text-2xl font-semibold text-gray-900'>Step 2: Audit</h2>
						<span
							className={`transform transition-transform text-gray-700 cursor-pointer ${
								expandedSections.step2 ? 'rotate-90' : ''
							}`}>
							▶
						</span>
					</button>
					<div>
						<p className='text-gray-600'>
							Write the issues in a short and consistent way. Here are 2 formats we like but find
							something that works for you. Some people like to also include a potential solution.
							It's up to you and your team.
						</p>
						<ul className='list-disc pl-6 space-y-2 text-gray-600'>
							<li>&lt;Element&gt;&lt;Location on page&gt;&lt;Issue&gt;</li>
							<li>When &lt;action&gt;&lt;location on page&gt;&lt;result&gt;&lt;issue&gt;</li>
						</ul>
					</div>

					<div className='mt-4 space-y-8'>
						<div className='border-t pt-6'>
							<button
								onClick={() => toggleSection('step2a')}
								className='flex justify-between items-center w-full text-left group'>
								<h3 className='text-xl font-semibold text-blue-500'>
									Basic Checks (go to Start page for in-depth audit)
								</h3>
								<span
									className={`transform transition-transform text-gray-700 cursor-pointer ${
										expandedSections.step2a ? 'rotate-90' : ''
									}`}>
									▶
								</span>
							</button>
							{expandedSections.step2a && (
								<div className='mt-4'>
									<p className='text-gray-600'>
										Easy checks from{' '}
										<a
											href='https://www.w3.org/WAI/test-evaluate/easy-checks/'
											className='text-blue-500 hover:text-blue-700 hover:underline'
											target='_blank'
											rel='noopener noreferrer'>
											W3C WAI Easy Checks
										</a>
									</p>

									<div className='space-y-8'>
										{/* Common Checks */}
										<div>
											<h4 className='text-xl font-semibold mb-4 text-gray-900'>Common Checks</h4>
											<div className='space-y-6'>
												<div className='border-b border-gray-200 pb-4'>
													<div className='flex items-start gap-3'>
														<input
															type='checkbox'
															id='imageAlt'
															checked={checkedItems.imageAlt}
															onChange={() => toggleCheck('imageAlt')}
															className='mt-1 h-5 w-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500'
														/>
														<div>
															<h5 className='font-semibold text-blue-500'>
																Image Alternative Text
																<a
																	href='https://www.w3.org/WAI/test-evaluate/easy-checks/image-alt/'
																	className='ml-2 text-sm text-blue-500 hover:text-blue-700 hover:underline'
																	target='_blank'
																	rel='noopener noreferrer'>
																	(Learn more)
																</a>
															</h5>
															<p className='text-gray-600 mb-2'>
																Image alternative text ("alt text") is a short description that
																conveys the purpose of an image. Alternative text is used by people
																who do not see the image.
															</p>
															<ul className='list-disc pl-6 space-y-2 text-gray-600'>
																<li>
																	Ensure alternative "alt" text conveys the content and function for
																	all non-decorative images. It should be succinct, accurate, and
																	useful.
																</li>
																<li>
																	Look for images of text or text embedded on images, and confirm
																	that the text is represented either in the body text or in the alt
																	text. Check this by trying to highlight text with your cursor.
																</li>
															</ul>
														</div>
													</div>
												</div>

												<div className='border-b border-gray-200 pb-4'>
													<div className='flex items-start gap-3'>
														<input
															type='checkbox'
															id='pageTitle'
															checked={checkedItems.pageTitle}
															onChange={() => toggleCheck('pageTitle')}
															className='mt-1 h-5 w-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500'
														/>
														<div>
															<h5 className='font-semibold text-blue-500'>
																Page Title
																<a
																	href='https://www.w3.org/WAI/test-evaluate/easy-checks/title/'
																	className='ml-2 text-sm text-blue-500 hover:text-blue-700 hover:underline'
																	target='_blank'
																	rel='noopener noreferrer'>
																	(Learn more)
																</a>
															</h5>
															<p className='text-gray-600'>
																Page titles are shown in the window title bar or tab in browsers.
																They are the first thing read by screen readers and help people know
																where they are.
															</p>
														</div>
													</div>
												</div>

												<div className='border-b border-gray-200 pb-4'>
													<div className='flex items-start gap-3'>
														<input
															type='checkbox'
															id='headings'
															checked={checkedItems.headings}
															onChange={() => toggleCheck('headings')}
															className='mt-1 h-5 w-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500'
														/>
														<div>
															<h5 className='font-semibold text-blue-500'>
																Headings
																<a
																	href='https://www.w3.org/WAI/test-evaluate/easy-checks/headings/'
																	className='ml-2 text-sm text-blue-500 hover:text-blue-700 hover:underline'
																	target='_blank'
																	rel='noopener noreferrer'>
																	(Learn more)
																</a>
															</h5>
															<p className='text-gray-600'>
																Headings communicate the organization of the content on the page,
																like a table of contents. Screen reader users often use page
																headings as a way to navigate a web page. Also see Body Text Review.
															</p>
														</div>
													</div>
												</div>

												<div className='border-b border-gray-200 pb-4'>
													<div className='flex items-start gap-3'>
														<input
															type='checkbox'
															id='colorContrast'
															checked={checkedItems.colorContrast}
															onChange={() => toggleCheck('colorContrast')}
															className='mt-1 h-5 w-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500'
														/>
														<div>
															<h5 className='font-semibold text-blue-500'>
																Color Contrast
																<a
																	href='https://www.w3.org/WAI/test-evaluate/easy-checks/color-contrast/'
																	className='ml-2 text-sm text-blue-500 hover:text-blue-700 hover:underline'
																	target='_blank'
																	rel='noopener noreferrer'>
																	(Learn more)
																</a>
															</h5>
															<p className='text-gray-600 mb-2'>
																Color contrast refers to the difference between adjacent colors.
																Typically this is the text and background color. It also includes
																interactive elements and their background, and parts of graphs or
																charts. Some people cannot read text or find elements if there is
																insufficient contrast between colors.
															</p>
															<ul className='list-disc pl-6 space-y-2 text-gray-600'>
																<li>
																	Check that the text and background color has a contrast ratio of
																	at least 4.5:1.
																</li>
																<li>
																	Ensure color is not used as the only way of conveying meaning or
																	information.
																</li>
															</ul>
														</div>
													</div>
												</div>

												<div className='border-b border-gray-200 pb-4'>
													<div className='flex items-start gap-3'>
														<input
															type='checkbox'
															id='skipLink'
															checked={checkedItems.skipLink}
															onChange={() => toggleCheck('skipLink')}
															className='mt-1 h-5 w-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500'
														/>
														<div>
															<h5 className='font-semibold text-blue-500'>
																Skip Link
																<a
																	href='https://www.w3.org/WAI/test-evaluate/easy-checks/skip-link/'
																	className='ml-2 text-sm text-blue-500 hover:text-blue-700 hover:underline'
																	target='_blank'
																	rel='noopener noreferrer'>
																	(Learn more)
																</a>
															</h5>
															<p className='text-gray-600'>
																A skip link is the first interactive element on a page. People using
																keyboards, screen readers and other assistive technologies can use
																skip links to quickly and easily reach the main page content.
															</p>
														</div>
													</div>
												</div>

												<div className='border-b border-gray-200 pb-4'>
													<div className='flex items-start gap-3'>
														<input
															type='checkbox'
															id='keyboardFocus'
															checked={checkedItems.keyboardFocus}
															onChange={() => toggleCheck('keyboardFocus')}
															className='mt-1 h-5 w-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500'
														/>
														<div>
															<h5 className='font-semibold text-blue-500'>
																Visible Keyboard Focus
																<a
																	href='https://www.w3.org/WAI/test-evaluate/easy-checks/keyboard-focus/'
																	className='ml-2 text-sm text-blue-500 hover:text-blue-700 hover:underline'
																	target='_blank'
																	rel='noopener noreferrer'>
																	(Learn more)
																</a>
															</h5>
															<p className='text-gray-600 mb-2'>
																Can all interactive elements be selected and activated using the
																keyboard?
															</p>

															<h6 className='font-semibold text-gray-900 mb-2'>
																How to test with a keyboard
															</h6>
															<ul className='list-disc pl-6 space-y-2 text-gray-600 mb-4'>
																<li>
																	<span className='font-medium'>Tab:</span> Navigate to links and
																	form controls.
																</li>
																<li>
																	<span className='font-medium'>Shift + Tab:</span> Navigate
																	backwards.
																</li>
																<li>
																	<span className='font-medium'>Spacebar:</span> Activate checkboxes
																	and buttons.
																</li>
																<li>
																	<span className='font-medium'>Enter:</span> Activate links and
																	buttons.
																</li>
																<li>
																	<span className='font-medium'>Arrow keys:</span> Radio buttons,
																	select/drop-down menus, sliders, tab panels, auto-complete, tree
																	menus, etc.
																</li>
																<li>
																	<span className='font-medium'>Escape:</span> Dismisses browser
																	dialog or menu.
																</li>
															</ul>

															<h6 className='font-semibold text-gray-900 mb-2'>
																What to check for
															</h6>
															<ul className='list-disc pl-6 space-y-2 text-gray-600'>
																<li>Is anything mouse-only, such as rollover menus?</li>
																<li>
																	Is a "skip navigation" link available? Activate the skip link and
																	hit Tab again to ensure it functions correctly.
																</li>
																<li>Is the navigation order logical and intuitive?</li>
																<li>Is a visible keyboard focus indicator present?</li>
																<li>
																	Test dialogs that 'pop' open. Can you navigate and close the
																	dialog? Does focus return to a logical place?
																</li>
																<li>Esc should also close all dialogs.</li>
															</ul>
														</div>
													</div>
												</div>

												<div className='border-b border-gray-200 pb-4'>
													<div className='flex items-start gap-3'>
														<input
															type='checkbox'
															id='language'
															checked={checkedItems.language}
															onChange={() => toggleCheck('language')}
															className='mt-1 h-5 w-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500'
														/>
														<div>
															<h5 className='font-semibold text-blue-500'>
																Language of Page
																<a
																	href='https://www.w3.org/WAI/test-evaluate/easy-checks/language/'
																	className='ml-2 text-sm text-blue-500 hover:text-blue-700 hover:underline'
																	target='_blank'
																	rel='noopener noreferrer'>
																	(Learn more)
																</a>
															</h5>
															<p className='text-gray-600'>
																Web pages should identify the primary language of the page.
																Specifying the language of the page means that assistive technology
																that speaks content can correctly pronounce words.
															</p>
														</div>
													</div>
												</div>

												<div className='border-b border-gray-200 pb-4'>
													<div className='flex items-start gap-3'>
														<input
															type='checkbox'
															id='zoom'
															checked={checkedItems.zoom}
															onChange={() => toggleCheck('zoom')}
															className='mt-1 h-5 w-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500'
														/>
														<div>
															<h5 className='font-semibold text-blue-500'>
																Zoom
																<a
																	href='https://www.w3.org/WAI/test-evaluate/easy-checks/zoom/'
																	className='ml-2 text-sm text-blue-500 hover:text-blue-700 hover:underline'
																	target='_blank'
																	rel='noopener noreferrer'>
																	(Learn more)
																</a>
															</h5>
															<p className='text-gray-600 mb-2'>
																Zoom is used to enlarge the text and images on web pages to make
																them more readable. Some people need to enlarge content in order to
																read it. When content is zoomed it still needs to be legible and
																usable.
															</p>
															<h5 className='font-semibold text-black'>Zoom to 200%</h5>
															<p className='text-gray-600 mb-2'>
																Control + for PCs, Command + for Mac
															</p>
															<ul className='list-disc pl-6 space-y-2 text-gray-600'>
																<li>
																	Is all the content still present on the page and is it still in an
																	order that makes sense?
																</li>
																<li>Does any of the content overlap or become far apart?</li>
																<li>
																	Do navigation bars or menus get replaced with mobile-style menus,
																	and can you navigate and close the menus?
																</li>
																<li>
																	Do you have to scroll horizontally to read everything, and is
																	anything cut off?
																</li>
																<li>
																	Do links, buttons, forms, and menus still function with the
																	content zoomed?
																</li>
															</ul>
														</div>
													</div>
												</div>

												<div className='border-b border-gray-200 pb-4'>
													<div className='flex items-start gap-3'>
														<input
															type='checkbox'
															id='bodyText'
															checked={checkedItems.bodyText}
															onChange={() => toggleCheck('bodyText')}
															className='mt-1 h-5 w-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500'
														/>
														<div>
															<h5 className='font-semibold text-blue-500'>Body Text Review</h5>
															<p className='text-gray-600 mb-2'>
																The body text of a page should be well-structured and easy to
																understand. This includes proper heading hierarchy, descriptive link
																text, and clear language.
															</p>
															<ul className='list-disc pl-6 space-y-2 text-gray-600'>
																<li>
																	Confirm that page titles are unique and descriptive, marked as
																	&lt;h1&gt;. There should only be one &lt;h1&gt; per page.
																</li>
																<li>
																	Ensure visual headings are useful and descriptive, and marked up
																	with an &lt;h&gt; element and in hierarchical order (&lt;h1&gt;,
																	&lt;h2&gt;, etc.). Look for skipped heading levels (&lt;h2&gt; to
																	&lt;h4&gt;).
																</li>
																<li>
																	Look for generic link text like "read more" or "click here."
																</li>
																<li>
																	Check that plain language is used instead of jargon, and all
																	acronyms are spelled out on first reference.
																</li>
															</ul>
														</div>
													</div>
												</div>

												{/* Common Checks section - add after Body Text Review and before Tables Section */}
												<div className='border-b border-gray-200 pb-4'>
													<div className='flex items-start gap-3'>
														<input
															type='checkbox'
															id='screenReader'
															checked={checkedItems.screenReader}
															onChange={() => toggleCheck('screenReader')}
															className='mt-1 h-5 w-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500'
														/>
														<div>
															<h5 className='font-semibold text-blue-500'>Screen Reader Test</h5>
															<p className='text-gray-600 mb-6'>
																Test with a screen reader to uncover issues with reading order,
																spelling, dynamic content, and interactive elements. While a little
																daunting at first, it is an essential and informative step in
																assessing your content for accessibility.
															</p>
															<p className='text-gray-600 mb-6'>
																We've created three guides - customized to whichever system and
																screen reader that you're using to test.
															</p>

															<div className='mb-6'>
																<h6 className='font-semibold text-gray-900 mb-2'>
																	Free screen readers:
																</h6>
																<ul className='list-disc pl-6 space-y-2 text-gray-600'>
																	<li>
																		<span className='font-medium'>Mac users:</span>{' '}
																		<a
																			href='#'
																			className='text-blue-500 hover:text-blue-700 hover:underline'>
																			Getting Started Testing with VoiceOver
																		</a>
																	</li>
																	<li>
																		<span className='font-medium'>PC users:</span>{' '}
																		<a
																			href='#'
																			className='text-blue-500 hover:text-blue-700 hover:underline'>
																			Getting Started Testing with NVDA
																		</a>
																	</li>
																</ul>
															</div>

															<div className='mb-6'>
																<h6 className='font-semibold text-gray-900 mb-2'>
																	Other screen readers:
																</h6>
																<ul className='list-disc pl-6 space-y-2 text-gray-600'>
																	<li>
																		<span className='font-medium'>PC users:</span>{' '}
																		<a
																			href='#'
																			className='text-blue-500 hover:text-blue-700 hover:underline'>
																			Getting Started Testing with JAWS
																		</a>
																	</li>
																</ul>
															</div>
														</div>
													</div>
												</div>

												{/* Tables Section */}
												<div className='border-b border-gray-200 pb-4'>
													<div className='flex items-start gap-3'>
														<input
															type='checkbox'
															id='tables'
															checked={checkedItems.tables}
															onChange={() => toggleCheck('tables')}
															className='mt-1 h-5 w-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500'
														/>
														<div>
															<h5 className='font-semibold text-blue-500'>Tables</h5>
															<p className='text-gray-600 mb-2'>
																Tables should be used for presenting tabular data, not for layout
																purposes. Proper table structure helps screen reader users
																understand the relationships between headers and data cells.
															</p>
															<ul className='list-disc pl-6 space-y-2 text-gray-600'>
																<li>
																	Confirm that tables are only used for tabular data, not for
																	layout.
																</li>
																<li>
																	If data tables are present, ensure table caption and row and/or
																	column headers are present.
																</li>
															</ul>
														</div>
													</div>
												</div>
											</div>
										</div>

										{/* Audio/Visual Checks */}
										<div>
											<h4 className='text-xl font-semibold mb-4 text-gray-900'>
												Audio/Visual Checks
											</h4>
											<div className='space-y-6'>
												<div className='border-b border-gray-200 pb-4'>
													<div className='flex items-start gap-3'>
														<input
															type='checkbox'
															id='captions'
															checked={checkedItems.captions}
															onChange={() => toggleCheck('captions')}
															className='mt-1 h-5 w-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500'
														/>
														<div>
															<h5 className='font-semibold text-blue-500'>
																Captions
																<a
																	href='https://www.w3.org/WAI/test-evaluate/easy-checks/captions/'
																	className='ml-2 text-sm text-blue-500 hover:text-blue-700 hover:underline'
																	target='_blank'
																	rel='noopener noreferrer'>
																	(Learn more)
																</a>
															</h5>
															<p className='text-gray-600'>
																Captions are a text version of the speech and non-speech audio
																information needed to understand the video and displayed with the
																video. The audio in video content needs to be available to people
																who are Deaf or hard of hearing.
															</p>
														</div>
													</div>
												</div>

												<div className='border-b border-gray-200 pb-4'>
													<div className='flex items-start gap-3'>
														<input
															type='checkbox'
															id='transcripts'
															checked={checkedItems.transcripts}
															onChange={() => toggleCheck('transcripts')}
															className='mt-1 h-5 w-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500'
														/>
														<div>
															<h5 className='font-semibold text-blue-500'>
																Transcripts
																<a
																	href='https://www.w3.org/WAI/test-evaluate/easy-checks/transcripts/'
																	className='ml-2 text-sm text-blue-500 hover:text-blue-700 hover:underline'
																	target='_blank'
																	rel='noopener noreferrer'>
																	(Learn more)
																</a>
															</h5>
															<p className='text-gray-600'>
																Transcripts are a text version of the speech and non-speech
																information in audio content and available separately from the
																video. They are used by people who are Deaf, hard of hearing or who
																have difficulty processing audio information.
															</p>
														</div>
													</div>
												</div>

												<div className='border-b border-gray-200 pb-4'>
													<div className='flex items-start gap-3'>
														<input
															type='checkbox'
															id='audioDescription'
															checked={checkedItems.audioDescription}
															onChange={() => toggleCheck('audioDescription')}
															className='mt-1 h-5 w-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500'
														/>
														<div>
															<h5 className='font-semibold text-blue-500'>
																Audio Description
																<a
																	href='https://www.w3.org/WAI/test-evaluate/easy-checks/description/'
																	className='ml-2 text-sm text-blue-500 hover:text-blue-700 hover:underline'
																	target='_blank'
																	rel='noopener noreferrer'>
																	(Learn more)
																</a>
															</h5>
															<p className='text-gray-600'>
																Audio description describes visual information needed to understand
																the content, including text displayed in the video, as part of the
																video. It provides content to people who are blind and others who
																cannot see the video adequately.
															</p>
														</div>
													</div>
												</div>
											</div>
										</div>

										{/* Form Checks */}
										<div>
											<h4 className='text-xl font-semibold mb-4 text-gray-900'>Form Checks</h4>
											<div className='space-y-6'>
												<div className='border-b border-gray-200 pb-4'>
													<div className='flex items-start gap-3'>
														<input
															type='checkbox'
															id='formLabels'
															checked={checkedItems.formLabels}
															onChange={() => toggleCheck('formLabels')}
															className='mt-1 h-5 w-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500'
														/>
														<div>
															<h5 className='font-semibold text-blue-500'>
																Labels
																<a
																	href='https://www.w3.org/WAI/test-evaluate/easy-checks/form-field-labels/'
																	className='ml-2 text-sm text-blue-500 hover:text-blue-700 hover:underline'
																	target='_blank'
																	rel='noopener noreferrer'>
																	(Learn more)
																</a>
															</h5>
															<p className='text-gray-600 mb-2'>
																Form field labels are the text beside form fields. They should tell
																us what information to enter or what checkbox to select. Everyone
																needs labels to understand how to interact with a form.
															</p>
															<ul className='list-disc pl-6 space-y-2 text-gray-600'>
																<li>Make sure form controls have descriptive labels.</li>
																<li>
																	If a label is not visible, check for a hidden &lt;label&gt;,
																	aria-label, or title attribute.
																</li>
															</ul>
														</div>
													</div>
												</div>

												<div className='border-b border-gray-200 pb-4'>
													<div className='flex items-start gap-3'>
														<input
															type='checkbox'
															id='requiredFields'
															checked={checkedItems.requiredFields}
															onChange={() => toggleCheck('requiredFields')}
															className='mt-1 h-5 w-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500'
														/>
														<div>
															<h5 className='font-semibold text-blue-500'>
																Required Fields
																<a
																	href='https://www.w3.org/WAI/test-evaluate/easy-checks/required-fields/'
																	className='ml-2 text-sm text-blue-500 hover:text-blue-700 hover:underline'
																	target='_blank'
																	rel='noopener noreferrer'>
																	(Learn more)
																</a>
															</h5>
															<p className='text-gray-600'>
																A required form field must be completed before you submit a form.
																Marking which fields are required in a form makes it easier for
																everyone to complete forms.
															</p>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							)}
						</div>

						{/* Step 2b nested inside Step 2 */}
						{/* <div className='border-t pt-6'>
								<button
									onClick={() => toggleSection('step2b')}
									className='flex justify-between items-center w-full text-left group'>
									<h3 className='text-xl font-semibold text-gray-900'>
										Step 2b: WCAG Criteria Review
									</h3>
									<span
										className={`transform transition-transform text-gray-700 cursor-pointer ${
											expandedSections.step2b ? 'rotate-90' : ''
										}`}>
										▶
									</span>
								</button>
								{expandedSections.step2b && (
									<div className='mt-4'>
										<p className='text-gray-600'>
											Go through WCAG Criteria (to be added as a table, including explanations) from{' '}
											<a
												href='https://www.w3.org/WAI/eval/report-tool/evaluation/audit-sample'
												className='text-blue-500 hover:text-blue-700 hover:underline'
												target='_blank'
												rel='noopener noreferrer'>
												W3C WAI Evaluation Report Tool
											</a>
										</p>
										<Link
											href='/wcagCriteria'
											className='text-blue-600 hover:text-blue-800 underline'>
											View WCAG Criteria Table
										</Link>
									</div>
								)}
							</div> */}
					</div>
					{/* )} */}
				</section>

				{/* Automated Tests Section */}
				<section
					className={`space-y-4 border rounded-lg p-6 transition-colors ${
						expandedSections.automatedTests ? 'bg-gray-50' : 'bg-white'
					}`}>
					<button
						onClick={() => toggleSection('automatedTests')}
						className='flex justify-between items-center w-full text-left group'>
						<h2 className='text-2xl font-semibold text-gray-900'>Automated Tests</h2>
						<span
							className={`transform transition-transform text-gray-700 cursor-pointer ${
								expandedSections.automatedTests ? 'rotate-90' : ''
							}`}>
							▶
						</span>
					</button>
					{expandedSections.automatedTests && (
						<div className='mt-4 space-y-6'>
							<div className='space-y-8'>
								<div className='border-b border-gray-200 pb-4'>
									<h3 className='text-lg font-semibold text-blue-500'>
										<a
											href='https://www.w3.org/WAI/test-evaluate/tools/list/'
											className='hover:text-blue-700 hover:underline'
											target='_blank'
											rel='noopener noreferrer'>
											W3.org Web Accessibility Evaluation Tools List
										</a>
									</h3>
								</div>

								{/* Silktide */}

								<div className='border-b border-gray-200 pb-4'>
									<h3 className='text-lg font-semibold text-blue-500'>
										<a
											href='https://silktide.com/installed-silktide-toolbar/'
											className='hover:text-blue-700 hover:underline'
											target='_blank'
											rel='noopener noreferrer'>
											Silktide Accessibility Checker
										</a>
										<span className='ml-2 text-sm text-gray-600'>(Chrome extension)</span>
									</h3>
									<p className='text-gray-600 mt-2'>
										Silktide's free accessibility checker tests your web page for over 200 WCAG
										issues, giving you straightforward, step-by-step guidance. The browser plugin
										highlights accessibility issues on each page, includes information on how to fix
										them, and offers a range of accessibility tools to help you monitor WCAG and ADA
										compliance.
									</p>
								</div>

								{/* Color Contrast Checker */}
								<div className='border-b border-gray-200 pb-4'>
									<h3 className='text-lg font-semibold text-blue-500'>
										<a
											href='https://chromewebstore.google.com/detail/color-contrast-checker-by/hfcoldjibhgbnlambdiecfneiegagkhi?hl=en'
											className='hover:text-blue-700 hover:underline'
											target='_blank'
											rel='noopener noreferrer'>
											Color Contrast Checker by DigitalA11Y
										</a>
										<span className='ml-2 text-sm text-gray-600'>(Chrome extension)</span>
									</h3>
									<p className='text-gray-600 mt-2'>
										A Chrome extension to check color combinations against WCAG contrast ratios,
										offering palette suggestions. Ideal for designers, developers and accessibility
										experts to review or audit site color contrast. Features include top-of-page
										access, one-click color picking, manual hex input, instant ratio display, and
										WCAG-compliant color recommendations.
									</p>
								</div>

								{/* Accessibility Cloud Lite */}
								<div className='border-b border-gray-200 pb-4'>
									<h3 className='text-lg font-semibold text-blue-500'>
										<a
											href='https://www.accessibilitycloud.com/lite/'
											className='hover:text-blue-700 hover:underline'
											target='_blank'
											rel='noopener noreferrer'>
											Accessibility Cloud Lite
										</a>
										<span className='ml-2 text-sm text-gray-600'>(Bookmarklet)</span>
									</h3>
									<p className='text-gray-600 mt-2'>
										Lite is Accessibility Cloud's bookmarklet. You can use it to test any web page,
										whether it's behind a login or not. It runs locally on your computer. Just add
										to bookmarks bar: Please drag and drop the link from the website to your
										bookmarks bar. When you want to test a page, click the bookmarklet to see the
										errors on the page.
									</p>
								</div>

								{/* Pope Tech */}
								<div className='border-b border-gray-200 pb-4'>
									<h3 className='text-lg font-semibold text-blue-500'>
										<a
											href='https://pope.tech/'
											className='hover:text-blue-700 hover:underline'
											target='_blank'
											rel='noopener noreferrer'>
											Pope Tech
										</a>
										<span className='ml-2 text-sm text-gray-600'>(Free for 25 pages)</span>
									</h3>
									<p className='text-gray-600 mt-2'>
										Pope Tech simplifies web accessibility and makes compliance easier with
										automation, flexible team management, dynamic reporting, and a friendly
										interface made for beginners and experts. The tool crawls all pages, is based on
										WAVE, allows export of reports, and also helps with manual testing and much
										more.
									</p>
								</div>

								{/* A11y Quick Check */}
								<div className='border-b border-gray-200 pb-4'>
									<h3 className='text-lg font-semibold text-blue-500'>
										<a
											href='https://chromewebstore.google.com/detail/a11y-quick-check/jlamgighkcjniljcdfpnhiemcakibepi'
											className='hover:text-blue-700 hover:underline'
											target='_blank'
											rel='noopener noreferrer'>
											A11y Quick Check
										</a>
										<span className='ml-2 text-sm text-gray-600'>(Chrome extension)</span>
									</h3>
									<p className='text-gray-600 mt-2'>
										A11y Quick Check is a browser extension for evaluating web accessibility through
										a structured checklist. It provides 42 individual tests focused on key
										accessibility aspects, including headings, grouping elements, lists, tables,
										related controls, and accessible names and descriptions. The tool identifies
										accessibility, structural, and semantic issues and includes guidance for manual
										verification.
									</p>
								</div>

								{/* VoiceOver */}
								<div className='border-b border-gray-200 pb-4'>
									<h3 className='text-lg font-semibold text-blue-500'>
										<a
											href='https://assistivlabs.com/use-cases/testing-any-screen-reader-on-mac'
											className='hover:text-blue-700 hover:underline'
											target='_blank'
											rel='noopener noreferrer'>
											VoiceOver
										</a>
										<span className='ml-2 text-sm text-gray-600'>
											(Built-in screen reader for Mac)
										</span>
									</h3>
									<p className='text-gray-600 mt-2'>
										VoiceOver is the built-in screen reader for Mac. While it's a powerful tool for
										Mac users, it's important to note that it uses a different interaction model
										than Windows screen readers. VoiceOver requires holding down the "VO keys"
										(Control + Option) for navigation, whereas Windows screen readers like NVDA use
										a virtual cursor model. Testing with multiple screen readers is recommended for
										comprehensive accessibility testing.
									</p>
								</div>

								{/* WCAG Checklist by Level Access */}
								<div className='border-b border-gray-200 pb-4'>
									<h3 className='text-lg font-semibold text-blue-500'>
										<a
											href='https://www.levelaccess.com/thank-you-download-the-must-have-wcag-2-1-checklist/'
											className='hover:text-blue-700 hover:underline'
											target='_blank'
											rel='noopener noreferrer'>
											WCAG Checklist by Level Access
										</a>
										<span className='ml-2 text-sm text-gray-600'>(Downloadable resource)</span>
									</h3>
									<p className='text-gray-600 mt-2'>
										A comprehensive WCAG 2.1 checklist that helps evaluate your current state of
										accessibility. This checklist is foundational for accessibility compliance and
										helps meet most global accessibility laws. Includes detailed criteria
										explanations and evaluation guidance.
									</p>
								</div>

								{/* Hike One Accessibility Evaluation Template */}
								<div className='border-b border-gray-200 pb-4'>
									<h3 className='text-lg font-semibold text-blue-500'>
										<a
											href='https://hike.one/insights/accessibility-evaluation-template'
											className='hover:text-blue-700 hover:underline'
											target='_blank'
											rel='noopener noreferrer'>
											Hike One Accessibility Evaluation Template
										</a>
										<span className='ml-2 text-sm text-gray-600'>(Free template)</span>
									</h3>
									<p className='text-gray-600 mt-2'>
										A practical template for conducting accessibility audits, including step-by-step
										instructions for checking criteria, simplified WCAG descriptions, and helpful
										references. The template is designed to make accessibility evaluation
										approachable even for those new to accessibility testing.
									</p>
								</div>

								{/* W3C WAI Easy Checks */}
								<div className='border-b border-gray-200 pb-4'>
									<h3 className='text-lg font-semibold text-blue-500'>
										<a
											href='https://www.w3.org/WAI/test-evaluate/#initial'
											className='hover:text-blue-700 hover:underline'
											target='_blank'
											rel='noopener noreferrer'>
											W3C WAI Easy Checks
										</a>
										<span className='ml-2 text-sm text-gray-600'>(Official W3C resource)</span>
									</h3>
									<p className='text-gray-600 mt-2'>
										The Web Accessibility Initiative's official guide for initial accessibility
										checks. Provides detailed instructions for evaluating key accessibility features
										like page titles, image text alternatives, headings, contrast ratio, and more.
										Each check includes step-by-step guidance and explanations of why these aspects
										are important for accessibility.
									</p>
								</div>
							</div>
						</div>
					)}
				</section>

				{/* Manual Tests Section */}
				<section
					className={`space-y-4 border rounded-lg p-6 transition-colors ${
						expandedSections.manualTests ? 'bg-gray-50' : 'bg-white'
					}`}>
					<button
						onClick={() => toggleSection('manualTests')}
						className='flex justify-between items-center w-full text-left group'>
						<h2 className='text-2xl font-semibold text-gray-900'>Manual Tests</h2>
						<span
							className={`transform transition-transform text-gray-700 cursor-pointer ${
								expandedSections.manualTests ? 'rotate-90' : ''
							}`}>
							▶
						</span>
					</button>
					{expandedSections.manualTests && (
						<div className='mt-4 space-y-8'>
							{/* Content Review Section */}
							<div>
								<h3 className='text-xl font-semibold text-gray-900 mb-4'>Content Review</h3>
								<p className='text-gray-600 mb-4'>
									Read through your content with accessibility best practices in mind.
								</p>

								{/* Zoom Section */}
								<div className='mb-6'>
									<h4 className='text-lg font-semibold text-gray-900 mb-2'>Zoom in to 200%</h4>
									<p className='text-gray-600 mb-2'>Control + for PCs, Command + for Mac</p>
									<ul className='list-disc pl-6 space-y-2 text-gray-600'>
										<li>
											Is all the content still present on the page and is it still in an order that
											makes sense?
										</li>
										<li>Does any of the content overlap or become far apart?</li>
										<li>
											Do navigation bars or menus get replaced with mobile-style menus, and can you
											navigate and close the menus?
										</li>
										<li>
											Do you have to scroll horizontally to read everything, and is anything cut
											off?
										</li>
										<li>
											Do links, buttons, forms, and menus still function with the content zoomed?
										</li>
									</ul>
								</div>

								{/* Body Text Section */}
								<div className='border-b border-gray-200 pb-4'>
									<h4 className='text-lg font-semibold text-gray-900 mb-2'>Body Text</h4>
									<ul className='list-disc pl-6 space-y-2 text-gray-600'>
										<li>
											Confirm that page titles are unique and descriptive, marked as &lt;h1&gt;.
											There should only be one &lt;h1&gt; per page.
										</li>
										<li>
											Ensure visual headings are useful and descriptive, and marked up with an
											&lt;h&gt; element and in hierarchical order (&lt;h1&gt;, &lt;h2&gt;, etc.).
											Look for skipped heading levels (&lt;h2&gt; to &lt;h4&gt;).
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
									<h4 className='text-lg font-semibold text-gray-900 mb-2'>Screen Reader Test</h4>
									<p className='text-gray-600 mb-6'>
										Test with a screen reader to uncover issues with reading order, spelling,
										dynamic content, and interactive elements. While a little daunting at first, it
										is an essential and informative step in assessing your content for
										accessibility.
									</p>
									<p className='text-gray-600 mb-6'>
										We've created three guides - customized to whichever system and screen reader
										that you're using to test.
									</p>

									<div className='mb-6'>
										<h6 className='font-semibold text-gray-900 mb-2'>Free screen readers:</h6>
										<ul className='list-disc pl-6 space-y-2 text-gray-600'>
											<li>
												<span className='font-medium'>Mac users:</span>{' '}
												<a href='#' className='text-blue-500 hover:text-blue-700 hover:underline'>
													Getting Started Testing with VoiceOver
												</a>
											</li>
											<li>
												<span className='font-medium'>PC users:</span>{' '}
												<a href='#' className='text-blue-500 hover:text-blue-700 hover:underline'>
													Getting Started Testing with NVDA
												</a>
											</li>
										</ul>
									</div>

									<div className='mb-6'>
										<h6 className='font-semibold text-gray-900 mb-2'>Other screen readers:</h6>
										<ul className='list-disc pl-6 space-y-2 text-gray-600'>
											<li>
												<span className='font-medium'>PC users:</span>{' '}
												<a href='#' className='text-blue-500 hover:text-blue-700 hover:underline'>
													Getting Started Testing with JAWS
												</a>
											</li>
										</ul>
									</div>
								</div>

								{/* Tables Section */}
								<div className='mb-6'>
									<h4 className='text-lg font-semibold text-gray-900 mb-2'>Tables</h4>
									<ul className='list-disc pl-6 space-y-2 text-gray-600'>
										<li>Confirm that tables are only used for tabular data, not for layout.</li>
										<li>
											If data tables are present, ensure table caption and row and/or column headers
											are present.
										</li>
									</ul>
								</div>

								{/* Images Section */}
								<div className='mb-6'>
									<h4 className='text-lg font-semibold text-gray-900 mb-2'>Images</h4>
									<ul className='list-disc pl-6 space-y-2 text-gray-600'>
										<li>
											Ensure alternative "alt" text conveys the content and function for all
											non-decorative images. It should be succinct, accurate, and useful.
										</li>
										<li>
											Look for images of text or text embedded on images, and confirm that the text
											is represented either in the body text or in the alt text. Check this by
											trying to highlight text with your cursor.
										</li>
									</ul>
								</div>

								{/* Color Section */}
								<div className='mb-6'>
									<h4 className='text-lg font-semibold text-gray-900 mb-2'>Color</h4>
									<ul className='list-disc pl-6 space-y-2 text-gray-600'>
										<li>
											Check that the text and background color has a contrast ratio of at least
											4.5:1.
										</li>
										<li>
											Ensure color is not used as the only way of conveying meaning or information.
										</li>
									</ul>
								</div>

								{/* Forms Section */}
								<div className='mb-6'>
									<h4 className='text-lg font-semibold text-gray-900 mb-2'>Forms</h4>
									<ul className='list-disc pl-6 space-y-2 text-gray-600'>
										<li>Make sure form controls have descriptive labels.</li>
										<li>
											If a label is not visible, check for a hidden &lt;label&gt;, aria-label, or
											title attribute.
										</li>
									</ul>
								</div>

								{/* Tables Section */}
								<div className='mb-6'>
									<h4 className='text-lg font-semibold text-gray-900 mb-2'>Tables</h4>
									<ul className='list-disc pl-6 space-y-2 text-gray-600'>
										<li>Confirm that tables are only used for tabular data, not for layout.</li>
										<li>
											If data tables are present, ensure table caption and row and/or column headers
											are present.
										</li>
									</ul>
								</div>
							</div>

							{/* Keyboard Testing Section */}
							<div>
								<h3 className='text-xl font-semibold text-gray-900 mb-4'>Keyboard Testing</h3>
								<p className='text-gray-600 mb-4'>
									Can all interactive elements be selected and activated using the keyboard?
								</p>

								{/* How to Test Section */}
								<div className='mb-6'>
									<h4 className='text-lg font-semibold text-gray-900 mb-2'>
										How to test with a keyboard
									</h4>
									<ul className='list-disc pl-6 space-y-2 text-gray-600'>
										<li>
											<span className='font-medium'>Tab:</span> Navigate to links and form controls.
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
											select/drop-down menus, sliders, tab panels, auto-complete, tree menus, etc.
										</li>
										<li>
											<span className='font-medium'>Escape:</span> Dismisses browser dialog or menu.
										</li>
									</ul>
								</div>

								{/* What to Check Section */}
								<div className='mb-6'>
									<h4 className='text-lg font-semibold text-gray-900 mb-2'>What to check for</h4>
									<ul className='list-disc pl-6 space-y-2 text-gray-600'>
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
				</section>

				{/* Pages to Include Section */}
				<section
					className={`space-y-4 border rounded-lg p-6 transition-colors ${
						expandedSections.pages ? 'bg-gray-50' : 'bg-white'
					}`}>
					<button
						onClick={() => toggleSection('pages')}
						className='flex justify-between items-center w-full text-left group'>
						<h2 className='text-2xl font-semibold text-gray-900'>
							How Many Pages to Include in an Audit?
						</h2>
						<span
							className={`transform transition-transform text-gray-700 cursor-pointer ${
								expandedSections.pages ? 'rotate-90' : ''
							}`}>
							▶
						</span>
					</button>
					{expandedSections.pages && (
						<div className='mt-4 space-y-6'>
							<div>
								<h3 className='text-lg font-semibold text-gray-900 mb-2'>
									Representative Sampling
								</h3>
								<p className='text-gray-600 mb-3'>
									The audit should cover a diverse and representative selection of pages, including:
								</p>
								<ul className='list-disc pl-6 space-y-2 text-gray-600'>
									<li>Homepage</li>
									<li>Navigation menus</li>
									<li>Key user flows (e.g., login, forms, checkout)</li>
									<li>Dynamic content (e.g., pop-ups, modals)</li>
									<li>Different content types (text, images, videos, PDFs, etc.)</li>
								</ul>
							</div>

							<div>
								<h3 className='text-lg font-semibold text-gray-900 mb-2'>Minimum Recommendation</h3>
								<ul className='list-disc pl-6 space-y-2 text-gray-600'>
									<li>Small websites (under 10 pages): Test all pages</li>
									<li>Medium websites (10-100 pages): Test at least 10-15 key pages</li>
									<li>
										Large websites (100+ pages): Test a percentage (e.g., 5-10%) across different
										templates and functionalities
									</li>
								</ul>
							</div>
						</div>
					)}
				</section>
			</div>
		</main>
	)
}
