'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ReportPreview from '../components/ReportPreview'

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

	const [basicTestObservations, setBasicTestObservations] = useState({})

	// Add new state variables for report preview
	const [showPreview, setShowPreview] = useState(false)
	const [previewData, setPreviewData] = useState(null)
	const [executiveSummary, setExecutiveSummary] = useState('')

	// Add dateCreated state
	const [dateCreated, setDateCreated] = useState(new Date().toISOString())
	const [clientName, setClientName] = useState('')
	const [clientId, setClientId] = useState('')

	// Modify useEffect to include new fields
	useEffect(() => {
		const savedData = localStorage.getItem('basicTestsAuditData')
		if (savedData) {
			const { clientName, clientId, observations, dateCreated, executiveSummary } =
				JSON.parse(savedData)
			setBasicTestObservations(observations || {})
			setDateCreated(dateCreated || new Date().toISOString())
			setExecutiveSummary(executiveSummary || '')
			setClientName(clientName || '')
			setClientId(clientId || '')
		}
	}, [])

	// Modify save effect to include new fields
	useEffect(() => {
		const auditData = {
			clientName,
			clientId,
			observations: basicTestObservations,
			dateCreated,
			executiveSummary,
		}
		localStorage.setItem('basicTestsAuditData', JSON.stringify(auditData))
	}, [basicTestObservations, dateCreated, executiveSummary, clientName, clientId])

	// Add export handler
	const handleExport = () => {
		// Create an array of observations with additional fields
		const observationsWithDetails = Object.entries(basicTestObservations).map(
			([checkId, observation]) => ({
				criterion: checkId,
				observation,
				category: 'Basic Test',
				level: 'A/AA',
				description: 'Basic accessibility test observation',
			})
		)

		const auditData = {
			clientName,
			clientId,
			observations: observationsWithDetails,
			dateCreated,
			executiveSummary,
		}

		setPreviewData(auditData)
		setShowPreview(true)
	}

	// Add clear data handler
	const handleClearData = () => {
		if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
			localStorage.removeItem('basicTestsAuditData')
			setBasicTestObservations({})
			setDateCreated(new Date().toISOString())
			setExecutiveSummary('')
			setClientName('')
			setClientId('')
		}
	}

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

	const handleBasicTestObservationChange = (checkId, value) => {
		setBasicTestObservations((prev) => ({
			...prev,
			[checkId]: value,
		}))
	}

	return (
		<main className='min-h-screen p-8 max-w-4xl mx-auto bg-white'>
			<h1 className='text-4xl font-bold mb-8 text-gray-900'>
				Internal Accessibility WCAG Audit Guide
			</h1>
			<div className='flex justify-between items-center mb-8'>
				<Link href='/' className='text-blue-500 hover:text-gray-900'>
					Back to Home
				</Link>
			</div>

			{/* Client info and buttons section */}
			<div className='flex gap-4 py-6 border-b'>
				<div>
					<label className='block text-sm font-bold'>Client Name</label>
					<input
						type='text'
						value={clientName}
						onChange={(e) => setClientName(e.target.value)}
						className='mt-1 block w-full border-gray-300 focus:border-gray-500 focus:ring-gray-500'
						placeholder='Enter client name'
					/>
				</div>
				<div>
					<label className='block text-sm font-bold'>Client ID</label>
					<input
						type='text'
						value={clientId}
						onChange={(e) => setClientId(e.target.value)}
						className='mt-1 block w-full border-gray-300 focus:border-gray-500 focus:ring-gray-500'
						placeholder='Enter client ID'
					/>
				</div>
				<div className='flex items-end gap-2'>
					<button
						onClick={handleExport}
						className='bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 hover:cursor-pointer'>
						Export Audit
					</button>
					<button
						onClick={handleClearData}
						className='bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 hover:cursor-pointer'>
						Clear Data
					</button>
				</div>
			</div>

			{/* Executive summary section */}
			<div className='mb-8 py-6 border-b'>
				<h2 className='text-lg font-bold mb-4'>Executive Summary</h2>
				<p className='text-sm mb-4'>
					Enter a summary based on the observations you have entered in the table below. This
					summary will appear in the PDF report and should highlight key findings, major issues, and
					general recommendations.
				</p>
				<textarea
					value={executiveSummary}
					onChange={(e) => setExecutiveSummary(e.target.value)}
					className='w-full text-sm p-4 border focus:ring-gray-500 focus:border-gray-500 min-h-[200px]'
					placeholder={`Example:

Overall Evaluation:
• The site demonstrates good accessibility practices in [areas]...
• Several critical issues were identified...

Critical Issues:
• Issue 1...
• Issue 2...

Moderate Issues:
• Issue 1...
• Issue 2...

Minor Issues:
• Issue 1...
• Issue 2...`}
				/>
			</div>

			{/* Move Step 1 content here as a regular section */}
			<div className='mb-8 py-6 border-b'>
				<h2 className='text-2xl font-semibold text-gray-900 mb-4'>Step 1: Determine the Scope</h2>
				<div className='mt-4'>
					<p className='text-gray-600'>
						Instead of evaluating every page, choose the pages and functionalities that represent
						the broader experience of the website. For example:
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
			</div>

			<div className='space-y-12'>
				{/* Step 2 */}
				<div className='space-y-4'>
					<h2 className='text-2xl font-semibold text-gray-900'>Step 2: Audit</h2>
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
									<p className='text-gray-600 mb-4'>
										Easy checks from{' '}
										<a
											href='https://www.w3.org/WAI/test-evaluate/easy-checks/'
											className='text-blue-500 hover:text-blue-700 hover:underline'
											target='_blank'
											rel='noopener noreferrer'>
											W3C WAI Easy Checks
										</a>
									</p>

									<div className='overflow-x-auto'>
										<table className='min-w-full bg-white border border-gray-300 text-black'>
											<thead>
												<tr>
													<th className='border p-2 text-md w-[15%] text-left align-top'>
														Check Type
													</th>
													<th className='border p-2 text-md w-[20%] text-left align-top'>
														Description
													</th>
													<th className='border p-2 text-md w-[25%] text-left align-top'>
														Observations
													</th>
													<th className='border p-2 text-md w-[15%] text-left align-top'>
														How to Check
													</th>
													<th className='border p-2 text-md w-[10%] text-left align-top'>
														Tool/Method
													</th>
													<th className='border p-2 text-md w-[15%] text-left align-top'>
														Where to Check
													</th>
												</tr>
											</thead>
											<tbody className='text-sm'>
												<tr>
													<td className='border p-2'>Image Alternative Text</td>
													<td className='border p-2'>
														Image alternative text ("alt text") is a short description that conveys
														the purpose of an image. Alternative text is used by people who do not
														see the image, including: • People who are blind and use a screen reader
														• People with low vision that magnify the screen and use text-to-speech
														• Some people with learning or reading disabilities who have information
														read aloud
													</td>
													<td className='border p-2'>
														<textarea
															value={basicTestObservations['imageAlt'] || ''}
															onChange={(e) =>
																handleBasicTestObservationChange('imageAlt', e.target.value)
															}
															className='w-full p-1 border rounded focus:ring-gray-500 focus:border-gray-500'
															rows={3}
															placeholder='Enter observations...'
														/>
													</td>
													<td className='border p-2'>
														• Images with information relevant to content should have descriptive
														alt text • Images with text should have that text in the alt text •
														Decorative images should have empty alt text (alt="") • Functional
														images (links/buttons) should describe their function • Complex images
														(graphs/charts) should have short alt text plus detailed description
														elsewhere
													</td>
													<td className='border p-2'>
														Browser dev tools, Screen reader, W3C WAI Easy Checks - Image Alt Text
														(https://www.w3.org/WAI/test-evaluate/easy-checks/image-alt/)
													</td>
													<td className='border p-2'>
														• All images on page • Special attention to: - Informative images -
														Images of text - Functional images - Complex images - Groups of images -
														Image maps
													</td>
												</tr>

												{/* Add more rows for each basic check */}
												<tr>
													<td className='border p-2'>Page Title</td>
													<td className='border p-2'>
														Page titles are shown in: • Browser window title bar • Browser tabs when
														multiple pages are open • Search engine results • Browser
														bookmarks/favorites • First thing read by screen readers when opening a
														page They help screen reader users understand what page is loading and
														navigate among open tabs.
													</td>
													<td className='border p-2'>
														<textarea
															value={basicTestObservations['pageTitle'] || ''}
															onChange={(e) =>
																handleBasicTestObservationChange('pageTitle', e.target.value)
															}
															className='w-full p-1 border rounded focus:ring-gray-500 focus:border-gray-500'
															rows={3}
															placeholder='Enter observations...'
														/>
													</td>
													<td className='border p-2'>
														• Check that there is a title that adequately and briefly describes the
														page content • Check that the title is different from other pages on the
														website • Verify that important and unique information comes first
														("front-loading") Example of good titles: • "About Acme Web Solutions"
														(not "Acme Web Solutions - About Us") • "Contact Acme Web Solutions"
														(not "Acme Web Solutions - Contact Us")
													</td>
													<td className='border p-2'>
														Visual inspection (browser tab/title bar), Screen reader, W3C WAI Easy
														Checks - Page Title
														(https://www.w3.org/WAI/test-evaluate/easy-checks/title/)
													</td>
													<td className='border p-2'>
														• Browser title bar • Browser tabs • Compare across different pages of
														the site
													</td>
												</tr>

												{/* Add these rows after the Page Title row */}
												<tr>
													<td className='border p-2'>Headings</td>
													<td className='border p-2'>
														Headings communicate the organization of the content on the page, like a
														table of contents. They should be nested by their rank/level (h1-h6).
														Headings are important for: • Screen reader users who can jump between
														headings with a single keystroke • People with low vision who rely on
														larger visual headings before zooming in • People with cognitive and
														learning disabilities who use headings to understand and focus on topics
													</td>
													<td className='border p-2'>
														<textarea
															value={basicTestObservations['headings'] || ''}
															onChange={(e) =>
																handleBasicTestObservationChange('headings', e.target.value)
															}
															className='w-full p-1 border rounded focus:ring-gray-500 focus:border-gray-500'
															rows={3}
															placeholder='Enter observations...'
														/>
													</td>
													<td className='border p-2'>
														Check for: • Presence of headings on the page • Page starts with an h1 •
														No skipped heading levels • No blank headings • Visual headings are
														marked up as actual headings • Heading text reflects the content that
														follows • Headings represent proper content structure, especially nested
														content
													</td>
													<td className='border p-2'>
														Browser dev tools, Screen reader, W3C WAI Easy Checks - Headings
														(https://www.w3.org/WAI/test-evaluate/easy-checks/headings/), Body Text
														Review section in Manual Tests
													</td>
													<td className='border p-2'>
														• All page headings • Visual text that appears to be headings • Document
														structure/outline
													</td>
												</tr>

												<tr>
													<td className='border p-2'>Color Contrast</td>
													<td className='border p-2'>
														Color contrast refers to the difference between adjacent colors: • Text
														and background color • Interactive elements and their background • Parts
														of graphs or charts that need to be understood Good contrast is
														important for: • People with low vision who have reduced contrast acuity
														• People with color deficient vision ('color blindness') • Anyone trying
														to read content in bright light conditions
													</td>
													<td className='border p-2'>
														<textarea
															value={basicTestObservations['colorContrast'] || ''}
															onChange={(e) =>
																handleBasicTestObservationChange('colorContrast', e.target.value)
															}
															className='w-full p-1 border rounded focus:ring-gray-500 focus:border-gray-500'
															rows={3}
															placeholder='Enter observations...'
														/>
													</td>
													<td className='border p-2'>
														Check for: • Text contrast ratio meets minimum requirement (4.5:1) •
														Interactive elements have sufficient contrast • Color is not the only
														way to convey information • Graphs and charts are understandable without
														relying on color Quick check: View page in grayscale to identify
														potential contrast issues
													</td>
													<td className='border p-2'>
														Color Contrast Analyzer, Browser dev tools, W3C WAI Easy Checks - Color
														Contrast
														(https://www.w3.org/WAI/test-evaluate/easy-checks/color-contrast/),
														Grayscale viewing
													</td>
													<td className='border p-2'>
														• All text content • Interactive elements (buttons, links, etc.) •
														Information conveyed through color • Visual elements like graphs and
														charts
													</td>
												</tr>

												<tr>
													<td className='border p-2'>Skip Link</td>
													<td className='border p-2'>
														A skip link is the first interactive element on a page that allows users
														to bypass blocks of repeated content. The most important instance is a
														skip navigation link at the start of a page. Skip links are important
														for: • Screen reader users • People with poor dexterity • People with
														various motor disabilities • People using mouth sticks or head pointers
														• People using switch devices
													</td>
													<td className='border p-2'>
														<textarea
															value={basicTestObservations['skipLink'] || ''}
															onChange={(e) =>
																handleBasicTestObservationChange('skipLink', e.target.value)
															}
															className='w-full p-1 border rounded focus:ring-gray-500 focus:border-gray-500'
															rows={3}
															placeholder='Enter observations...'
														/>
													</td>
													<td className='border p-2'>
														Check for: • Presence of skip link as first interactive element • Skip
														link becomes visible on keyboard focus (if initially hidden) • Skip link
														functionality works correctly • Link text clearly indicates purpose
														(e.g., "Skip navigation", "Skip to content", "Skip to main content") •
														After activation, focus moves to main content
													</td>
													<td className='border p-2'>
														Keyboard navigation, Screen reader, W3C WAI Easy Checks - Skip Link
														(https://www.w3.org/WAI/test-evaluate/easy-checks/skip-link/)
													</td>
													<td className='border p-2'>
														• Top of page • Verify skip link target (main content) • Test with
														keyboard Tab key
													</td>
												</tr>

												<tr>
													<td className='border p-2'>Keyboard Focus</td>
													<td className='border p-2'>
														Visible keyboard focus indicates which interactive element (link,
														button, form field) you are on when using the keyboard to navigate. This
														is essential for: • Sighted users with physical disabilities
														(quadriplegia, limited dexterity, tremors) • People navigating by
														keyboard or voice • People who are blind (using keyboard with non-visual
														cues)
													</td>
													<td className='border p-2'>
														<textarea
															value={basicTestObservations['keyboardFocus'] || ''}
															onChange={(e) =>
																handleBasicTestObservationChange('keyboardFocus', e.target.value)
															}
															className='w-full p-1 border rounded focus:ring-gray-500 focus:border-gray-500'
															rows={3}
															placeholder='Enter observations...'
														/>
													</td>
													<td className='border p-2'>
														Test using keyboard controls: • Tab: Navigate to links and form controls
														• Shift + Tab: Navigate backwards • Spacebar: Activate checkboxes and
														buttons • Enter: Activate links and buttons • Arrow keys: Navigate radio
														buttons, menus, sliders • Escape: Close dialogs/menus Check for: •
														Visible focus indicator on all interactive elements • No mouse-only
														interactions (e.g., hover menus) • Logical navigation order • Proper
														dialog behavior (navigation, closure, focus return) • No keyboard traps
													</td>
													<td className='border p-2'>
														Keyboard navigation, W3C WAI Easy Checks - Keyboard Focus
														(https://www.w3.org/WAI/test-evaluate/easy-checks/keyboard-focus/)
													</td>
													<td className='border p-2'>
														• All interactive elements • Navigation menus • Forms and controls •
														Modal dialogs • Custom widgets • Dynamic content
													</td>
												</tr>

												<tr>
													<td className='border p-2'>Language</td>
													<td className='border p-2'>
														Web pages should identify the primary language of the page. This is
														crucial because: • Screen readers and other text-to-speech tools need to
														know which language to use for correct pronunciation • Browser
														translation tools need to know which language to translate from • It
														helps search engines identify the language of content
													</td>
													<td className='border p-2'>
														<textarea
															value={basicTestObservations['language'] || ''}
															onChange={(e) =>
																handleBasicTestObservationChange('language', e.target.value)
															}
															className='w-full p-1 border rounded focus:ring-gray-500 focus:border-gray-500'
															rows={3}
															placeholder='Enter observations...'
														/>
													</td>
													<td className='border p-2'>
														Check for: • Primary language is correctly identified in HTML lang
														attribute • Language declaration matches the actual content language •
														If page has no language set, it will show "Page language is not
														specified" • For multilingual pages, check that language changes within
														content are properly marked
													</td>
													<td className='border p-2'>
														View page source, Browser dev tools, Screen reader, W3C WAI Easy Checks
														- Language (https://www.w3.org/WAI/test-evaluate/easy-checks/language/)
													</td>
													<td className='border p-2'>
														• HTML tag (lang attribute) • Content sections in different languages •
														Page metadata
													</td>
												</tr>

												<tr>
													<td className='border p-2'>Zoom</td>
													<td className='border p-2'>
														Zoom is used to enlarge text and images on web pages to make them more
														readable. This is crucial for: • People who need to enlarge content to
														read it • People who forgot their reading glasses • People with low
														vision who need significant magnification (200% or larger) • Anyone
														viewing content on small screens or from a distance
													</td>
													<td className='border p-2'>
														<textarea
															value={basicTestObservations['zoom'] || ''}
															onChange={(e) =>
																handleBasicTestObservationChange('zoom', e.target.value)
															}
															className='w-full p-1 border rounded focus:ring-gray-500 focus:border-gray-500'
															rows={3}
															placeholder='Enter observations...'
														/>
													</td>
													<td className='border p-2'>
														Test at 200% zoom (Ctrl/Cmd + to zoom in): • Verify all content remains
														visible and in logical order • Check for content overlap or spacing
														issues • Ensure navigation menus remain usable (mobile-style menus are
														acceptable) • Confirm no horizontal scrolling is needed (for horizontal
														text) • Test all interactive elements still function properly • Check
														that text isn't hidden behind other content
													</td>
													<td className='border p-2'>
														Browser zoom controls (Ctrl/Cmd + to zoom in, Ctrl/Cmd - to zoom out,
														Ctrl/Cmd 0 to reset), W3C WAI Easy Checks - Zoom
														(https://www.w3.org/WAI/test-evaluate/easy-checks/zoom/)
													</td>
													<td className='border p-2'>
														• All page content • Navigation menus • Interactive elements • Text
														content • Images and media • Forms and controls
													</td>
												</tr>

												<tr>
													<td className='border p-2'>Multimedia (Captions)</td>
													<td className='border p-2'>
														Captions are a text version of the speech and non-speech audio
														information needed to understand the video and displayed with the video.
														The audio in video content needs to be available to people who are Deaf
														or hard of hearing. Captions are important for: • People who are Deaf or
														hard of hearing • People watching video in noisy environments • People
														learning to read or learning the language • People who process written
														information better than audio
													</td>
													<td className='border p-2'>
														<textarea
															value={basicTestObservations['captions'] || ''}
															onChange={(e) =>
																handleBasicTestObservationChange('captions', e.target.value)
															}
															className='w-full p-1 border rounded focus:ring-gray-500 focus:border-gray-500'
															rows={3}
															placeholder='Enter observations...'
														/>
													</td>
													<td className='border p-2'>
														Check for: • Presence of captions for all video content • Captions are
														synchronized with the audio • Captions include all speech and important
														non-speech sounds • Captions are accurate and properly punctuated •
														Speaker identification when multiple people are speaking •
														Auto-generated captions alone are not sufficient
													</td>
													<td className='border p-2'>
														Manual check, Media player controls, W3C WAI Easy Checks - Captions
														(https://www.w3.org/WAI/test-evaluate/easy-checks/captions/)
													</td>
													<td className='border p-2'>
														• All video content • Video player caption controls • Caption quality
														and accuracy • Caption timing and synchronization
													</td>
												</tr>

												<tr>
													<td className='border p-2'>Multimedia (Transcripts)</td>
													<td className='border p-2'>
														Transcripts are a text version of the speech and non-speech information
														in audio content and available separately from the video. They are used
														by: • People who are Deaf or hard of hearing • People who have
														difficulty processing audio information • People who are deafblind •
														Screen reader users who may prefer reading the transcript over listening
														to audio • People who want to quickly scan or search through the content
													</td>
													<td className='border p-2'>
														<textarea
															value={basicTestObservations['transcripts'] || ''}
															onChange={(e) =>
																handleBasicTestObservationChange('transcripts', e.target.value)
															}
															className='w-full p-1 border rounded focus:ring-gray-500 focus:border-gray-500'
															rows={3}
															placeholder='Enter observations...'
														/>
													</td>
													<td className='border p-2'>
														Check for: • Presence of transcript with the media or a link to
														transcript • Transcript is easy to find near the audio/video content •
														All speech is accurately reflected in the transcript • Speakers are
														properly identified • Important sounds are described (e.g., "soft
														clapping", "tires screeching") • For videos, important visual
														information is described in the transcript
													</td>
													<td className='border p-2'>
														Manual check, W3C WAI Easy Checks - Transcripts
														(https://www.w3.org/WAI/test-evaluate/easy-checks/transcripts/)
													</td>
													<td className='border p-2'>
														• All audio content • All video content • Transcript location and
														accessibility • Transcript completeness and accuracy
													</td>
												</tr>

												<tr>
													<td className='border p-2'>Multimedia (Audio Description)</td>
													<td className='border p-2'>
														Audio description describes visual information needed to understand the
														content, including text displayed in the video, as part of the video. It
														provides content to: • People who are blind and others who cannot see
														the video adequately • People with cognitive disabilities who benefit
														from both visual and auditory information • People learning the language
														who benefit from additional verbal descriptions
													</td>
													<td className='border p-2'>
														<textarea
															value={basicTestObservations['audioDescription'] || ''}
															onChange={(e) =>
																handleBasicTestObservationChange('audioDescription', e.target.value)
															}
															className='w-full p-1 border rounded focus:ring-gray-500 focus:border-gray-500'
															rows={3}
															placeholder='Enter observations...'
														/>
													</td>
													<td className='border p-2'>
														Check for: • Whether description is needed (are there important visual
														elements?) • If needed, check if description is provided through: -
														Integration in the main audio - Separate described video - Separate
														description file • All important visual information is described,
														including: - Title text at the beginning - Links and contact information
														shown - Speakers' names in text - Text in presentations - Important
														actions and expressions
													</td>
													<td className='border p-2'>
														Manual check, Media player controls, W3C WAI Easy Checks - Audio
														Description
														(https://www.w3.org/WAI/test-evaluate/easy-checks/description/)
													</td>
													<td className='border p-2'>
														• All video content • Visual information in videos • Text displayed in
														videos • Actions and expressions • Scene changes
													</td>
												</tr>

												<tr>
													<td className='border p-2'>Forms (Labels)</td>
													<td className='border p-2'>
														Form field labels are the text beside form fields. They should tell us
														what information to enter or what checkbox to select. Everyone needs
														labels to understand how to interact with a form. Labels are especially
														important for: • Screen reader users who need to know what information
														to enter • People with cognitive disabilities who benefit from clear
														instructions • People with motor disabilities who need larger clickable
														areas • Anyone filling out forms who needs clear guidance
													</td>
													<td className='border p-2'>
														<textarea
															value={basicTestObservations['formLabels'] || ''}
															onChange={(e) =>
																handleBasicTestObservationChange('formLabels', e.target.value)
															}
															className='w-full p-1 border rounded focus:ring-gray-500 focus:border-gray-500'
															rows={3}
															placeholder='Enter observations...'
														/>
													</td>
													<td className='border p-2'>
														Check for: • All form controls have descriptive labels • Labels are
														properly associated with their form fields • If visual label is not
														present, check for: - Hidden &lt;label&gt; element - aria-label
														attribute - title attribute • Labels clearly describe the required input
														• Clicking on label activates the associated form control
													</td>
													<td className='border p-2'>
														Browser dev tools, Screen reader, W3C WAI Easy Checks - Form Labels
														(https://www.w3.org/WAI/test-evaluate/easy-checks/form-field-labels/)
													</td>
													<td className='border p-2'>
														• All form fields • Text inputs • Checkboxes • Radio buttons • Select
														menus • Text areas • Custom form controls
													</td>
												</tr>

												<tr>
													<td className='border p-2'>Forms (Required Fields)</td>
													<td className='border p-2'>
														A required form field must be completed before you submit a form.
														Marking which fields are required in a form makes it easier for everyone
														to complete forms. This is important for: • All users who need to
														complete forms correctly • Screen reader users who need to know
														requirements before submission • People with cognitive disabilities who
														benefit from clear instructions • Anyone who wants to avoid form
														submission errors
													</td>
													<td className='border p-2'>
														<textarea
															value={basicTestObservations['requiredFields'] || ''}
															onChange={(e) =>
																handleBasicTestObservationChange('requiredFields', e.target.value)
															}
															className='w-full p-1 border rounded focus:ring-gray-500 focus:border-gray-500'
															rows={3}
															placeholder='Enter observations...'
														/>
													</td>
													<td className='border p-2'>
														Check for: • Fields marked as required have a visible indicator • The
														word "required" is included in the label (preferred method) • If using
														an asterisk (*), ensure it's explained at the form start • If marking
														optional fields instead, ensure there's a clear message that all
														unmarked fields are required • Required fields are properly marked in
														HTML code (required attribute) • Error messages clearly indicate missing
														required fields
													</td>
													<td className='border p-2'>
														Visual inspection, Screen reader, W3C WAI Easy Checks - Required Fields
														(https://www.w3.org/WAI/test-evaluate/easy-checks/required-fields/)
													</td>
													<td className='border p-2'>
														• All forms • Required field indicators • Form instructions • Error
														messages • Form validation
													</td>
												</tr>

												<tr>
													<td className='border p-2'>Tables</td>
													<td className='border p-2'>
														Tables should be used for presenting tabular data, not for layout
														purposes. Proper table structure helps screen reader users understand
														the relationships between headers and data cells. This is important for:
														• Screen reader users who need to understand data relationships • People
														with cognitive disabilities who benefit from structured information •
														Users who need to navigate complex data efficiently • Anyone who needs
														to understand the logical relationships between data points
													</td>
													<td className='border p-2'>
														<textarea
															value={basicTestObservations['tables'] || ''}
															onChange={(e) =>
																handleBasicTestObservationChange('tables', e.target.value)
															}
															className='w-full p-1 border rounded focus:ring-gray-500 focus:border-gray-500'
															rows={3}
															placeholder='Enter observations...'
														/>
													</td>
													<td className='border p-2'>
														Check for: • Tables are only used for tabular data, not for layout
														purposes • Table captions are present and descriptive • Row and/or
														column headers are properly marked up • Complex tables have appropriate
														header associations • Data cells are properly associated with their
														headers • Tables make sense when read in a linear order
													</td>
													<td className='border p-2'>Browser dev tools, Screen reader</td>
													<td className='border p-2'>
														• All data tables on the page • Table headers and captions • Table
														structure and markup • Header-cell relationships • Table navigation with
														screen reader
													</td>
												</tr>

												<tr>
													<td className='border p-2'>Body Text</td>
													<td className='border p-2'>
														The body text of a page should be well-structured and easy to
														understand. This is important for: • All users, particularly those with
														cognitive disabilities • Screen reader users who rely on proper document
														structure • People with reading difficulties who need clear, simple
														language • Users who scan content using headings and links
													</td>
													<td className='border p-2'>
														<textarea
															value={basicTestObservations['bodyText'] || ''}
															onChange={(e) =>
																handleBasicTestObservationChange('bodyText', e.target.value)
															}
															className='w-full p-1 border rounded focus:ring-gray-500 focus:border-gray-500'
															rows={3}
															placeholder='Enter observations...'
														/>
													</td>
													<td className='border p-2'>
														Check for: • Page title is unique and descriptive, marked as &lt;h1&gt;
														(only one per page) • Visual headings use proper hierarchy (&lt;h1&gt;,
														&lt;h2&gt;, etc.) without skipping levels • Link text is descriptive
														(avoid "read more" or "click here") • Plain language is used instead of
														jargon • Acronyms are spelled out on first reference • Content is
														organized in clear, logical sections
													</td>
													<td className='border p-2'>
														Visual inspection, Screen reader, Browser dev tools to verify heading
														structure
													</td>
													<td className='border p-2'>
														• Page titles • Heading structure • Link text • General content •
														Technical terms and acronyms • Document organization
													</td>
												</tr>

												<tr>
													<td className='border p-2'>Screen Reader</td>
													<td className='border p-2'>
														Screen reader testing helps identify issues with content structure,
														reading order, dynamic updates, and interactive elements. This testing
														is essential for: • People who are blind or have severe visual
														impairments • Users who rely on keyboard navigation • People with
														cognitive disabilities who use text-to-speech • Developers and testers
														verifying accessibility implementation
													</td>
													<td className='border p-2'>
														<textarea
															value={basicTestObservations['screenReader'] || ''}
															onChange={(e) =>
																handleBasicTestObservationChange('screenReader', e.target.value)
															}
															className='w-full p-1 border rounded focus:ring-gray-500 focus:border-gray-500'
															rows={3}
															placeholder='Enter observations...'
														/>
													</td>
													<td className='border p-2'>
														Test with appropriate screen reader for your system: • Mac users:
														VoiceOver (built-in) • PC users: NVDA (free) or JAWS Check for: • Proper
														reading order • Accurate pronunciation • Dynamic content updates •
														Interactive element behavior • Form field labels and instructions •
														Table structure and navigation • Image descriptions • Heading hierarchy
													</td>
													<td className='border p-2'>
														Screen reader software: • Mac:{' '}
														<a href='#' className='text-blue-500 hover:underline'>
															VoiceOver Guide
														</a>
														• PC:{' '}
														<a href='#' className='text-blue-500 hover:underline'>
															NVDA Guide
														</a>
														• PC:{' '}
														<a href='#' className='text-blue-500 hover:underline'>
															JAWS Guide
														</a>
													</td>
													<td className='border p-2'>
														• Page structure and navigation • Interactive elements • Forms and
														controls • Dynamic content • Tables and lists • Images and media • Error
														messages • Status updates
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>

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

			{/* Add ReportPreview component */}
			{showPreview && (
				<ReportPreview auditData={previewData} onClose={() => setShowPreview(false)} />
			)}
		</main>
	)
}
