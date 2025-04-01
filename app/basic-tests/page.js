'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import ReportPreview from '../components/ReportPreview'
import { Button } from '@/components/ui/button'
import Instructions from '../components/Instructions'
import Hero from '../components/Hero'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'

// Add this mapping object at the top of the file, after the imports
const checkTypeDisplayNames = {
	imageAlt: 'Image Alternative Text',
	pageTitle: 'Page Title',
	headings: 'Headings',
	colorContrast: 'Color Contrast',
	skipLink: 'Skip Link',
	keyboardFocus: 'Keyboard Focus',
	language: 'Language',
	zoom: 'Zoom',
	captions: 'Multimedia (Captions)',
	transcripts: 'Multimedia (Transcripts)',
	audioDescription: 'Multimedia (Audio Description)',
	formLabels: 'Forms (Labels)',
	requiredFields: 'Forms (Required Fields)',
	bodyText: 'Body Text',
	screenReader: 'Screen Reader',
	tables: 'Tables',
	otherTests: 'Additional Tests',
}

// Add this after the checkTypeDisplayNames object
const checkDescriptions = {
	imageAlt:
		'Image alternative text ("alt text") is a short description that conveys the purpose of an image, essential for screen reader users and those with visual impairments.',
	pageTitle:
		'Page titles are shown in browser windows, tabs, and search results, helping users understand page content and navigate between pages.',
	headings:
		'Headings communicate the organization of content on the page, helping users navigate and understand the content structure.',
	colorContrast:
		'Color contrast between text and background must be sufficient to ensure readability for all users, including those with visual impairments.',
	skipLink:
		'Skip links allow keyboard users to bypass repetitive navigation and jump directly to main content.',
	keyboardFocus:
		'Visible keyboard focus indicators help keyboard users understand their current position on the page.',
	language:
		'Proper language declaration ensures correct pronunciation by screen readers and accurate translation by browser tools.',
	zoom: 'Content must remain functional and readable when zoomed up to 200% to accommodate users who need enlarged text.',
	captions:
		'Captions provide text alternatives for audio content in videos, essential for deaf or hard-of-hearing users.',
	transcripts:
		'Transcripts provide text versions of audio/video content, beneficial for deaf users and those who prefer reading.',
	audioDescription:
		'Audio descriptions provide verbal explanations of important visual content for blind or visually impaired users.',
	formLabels:
		'Form labels clearly identify input fields and their purpose for all users, especially those using screen readers.',
	requiredFields:
		'Clear indication of required form fields helps users complete forms accurately and efficiently.',
	bodyText:
		'Body text should be well-structured and easy to understand, with clear hierarchy and readable content.',
	screenReader:
		'Content should be properly structured and meaningful when accessed through screen readers.',
	tables:
		'Data tables should be properly structured with clear relationships between headers and data cells.',
	otherTests: 'Supplementary accessibility checks and observations',
}

export default function BasicTestsPage() {
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
		otherTests: false,
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

	// Add URL-related state variables
	const [urls, setUrls] = useState([])
	const [selectedUrl, setSelectedUrl] = useState('')
	const [newUrl, setNewUrl] = useState('')

	// Add new state for completed items after the other state declarations
	const [completedItems, setCompletedItems] = useState({})

	// Load saved data from localStorage on component mount
	useEffect(() => {
		console.log('=== Loading basic tests data from localStorage ===')
		const savedData = localStorage.getItem('basicTestsAuditData')
		console.log('Saved basic tests data:', savedData)
		if (savedData) {
			try {
				const {
					clientName,
					clientId,
					observations,
					dateCreated,
					executiveSummary,
					completedItems,
					urls,
					selectedUrl,
				} = JSON.parse(savedData)
				console.log('Parsed basic tests data:', {
					clientName,
					clientId,
					observations,
					dateCreated,
					executiveSummary,
					completedItems,
					urls,
					selectedUrl,
				})
				// Only set state if we have actual data
				if (Object.keys(observations || {}).length > 0 || (urls && urls.length > 0)) {
					setBasicTestObservations(observations || {})
					setDateCreated(dateCreated || new Date().toISOString())
					setExecutiveSummary(executiveSummary || '')
					setClientName(clientName || '')
					setClientId(clientId || '')
					setCompletedItems(completedItems || {})
					setUrls(urls || [])
					setSelectedUrl(selectedUrl || '')
				}
			} catch (error) {
				console.error('Error parsing saved basic tests data:', error)
			}
		}
	}, [])

	// Save data to localStorage whenever it changes
	useEffect(() => {
		console.log('=== Saving basic tests data to localStorage ===')
		const auditData = {
			clientName,
			clientId,
			observations: basicTestObservations,
			dateCreated,
			executiveSummary,
			completedItems,
			urls,
			selectedUrl,
		}
		console.log('Basic tests data to save:', auditData)
		// Only save if we have actual data
		if (Object.keys(basicTestObservations).length > 0 || urls.length > 0) {
			localStorage.setItem('basicTestsAuditData', JSON.stringify(auditData))
		}
	}, [
		basicTestObservations,
		dateCreated,
		executiveSummary,
		clientName,
		clientId,
		completedItems,
		urls,
		selectedUrl,
	])

	const handleAddUrl = () => {
		if (newUrl && !urls.includes(newUrl)) {
			console.log('=== Adding new URL to basic tests ===', newUrl)
			setUrls([...urls, newUrl])
			setSelectedUrl(newUrl)
			setNewUrl('')
		}
	}

	const handleUrlChange = (url) => {
		console.log('=== Changing URL in basic tests ===', url)
		setSelectedUrl(url)
	}

	const handleBasicTestObservationChange = (checkId, value) => {
		if (!selectedUrl) return
		console.log('=== Updating basic test observation ===', {
			url: selectedUrl,
			checkId,
			value,
		})
		setBasicTestObservations((prev) => {
			const newObservations = {
				...prev,
				[selectedUrl]: {
					...prev[selectedUrl],
					[checkId]: value,
				},
			}
			console.log('New basic test observations state:', newObservations)
			return newObservations
		})
	}

	const handleExport = () => {
		// Create observations array for all URLs
		const observationsWithDetails = Object.entries(basicTestObservations).map(
			([url, urlObservations]) => {
				// Filter and map observations for this URL
				const urlObservationsList = Object.entries(urlObservations)
					.filter(([_, observation]) => observation && observation.trim() !== '') // Only include non-empty observations
					.map(([checkId, observation]) => ({
						criterion: checkTypeDisplayNames[checkId] || checkId,
						observation,
						category: 'Basic Test',
						level: '',
						description: checkDescriptions[checkId] || 'Basic accessibility test observation',
					}))

				// Return URL section with its observations
				return {
					url,
					observations: urlObservationsList,
				}
			}
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

	const handleClearData = () => {
		if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
			console.log('=== Clearing basic tests data ===')
			localStorage.removeItem('basicTestsAuditData')
			setBasicTestObservations({})
			setDateCreated(new Date().toISOString())
			setExecutiveSummary('')
			setClientName('')
			setClientId('')
			setCompletedItems({})
			setUrls([])
			setSelectedUrl('')
			setNewUrl('')
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

	// Add handler for toggling completed status
	const toggleCompleted = (checkId) => {
		if (!selectedUrl) return

		setCompletedItems((prev) => ({
			...prev,
			[selectedUrl]: {
				...(prev[selectedUrl] || {}),
				[checkId]: !(prev[selectedUrl]?.[checkId] || false),
			},
		}))
	}

	return (
		<main className='flex flex-1 flex-col'>
			<Hero
				title='Basic Accessibility Tests'
				description='A step-by-step guide for conducting basic accessibility testing'
			/>
			<div className='container mx-auto p-4'>
				<Instructions />
			</div>
			<div className='container mx-auto p-4'>
				<div className='mb-6 flex flex-col gap-4'>
					<div className='py-6'>
						<Card className='bg-muted/50'>
							<CardHeader>
								<CardTitle>
									<h2 className='text-2xl font-semibold leading-none tracking-tight py-4'>Audit</h2>
								</CardTitle>
								<div className='text-sm text-muted-foreground'>
									<p className='py-2'>Go through the 4 steps below to complete the audit:</p>
									<ul>
										<li>Step 1. Enter client info</li>
										<li>Step 2. Enter observations (comments and issues)</li>
										<li>Step 3. Add a summary of findings</li>
										<li>Step 4. Preview and export audit</li>
									</ul>
								</div>
								<p className='text-sm text-muted-foreground py-2'>
									For each new audit, click <span className='font-bold'>Clear Data</span> to start
									fresh and clear local storage.
								</p>
								<div className='flex justify-start gap-2 py-6'>
									<Button className='cursor-pointer' onClick={handleClearData}>
										Clear Data
									</Button>
								</div>
							</CardHeader>
							<div className='container mx-auto p-4'>
								<div className='mb-6 flex flex-col gap-4 '>
									<div className='py-6'>
										<Card>
											<CardHeader>
												<CardTitle>
													<h3 className='text-xl font-semibold leading-none tracking-tight py-4'>
														Step 1: Enter client info
													</h3>
												</CardTitle>
												<p className='text-sm text-muted-foreground'>
													Enter client name and website URL.
												</p>
											</CardHeader>
											<CardContent className='space-y-6'>
												{/* Client info and buttons section */}
												<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
													<div className='space-y-2'>
														<Label htmlFor='clientId'>Client Name</Label>
														<Input
															id='clientId'
															value={clientId}
															onChange={(e) => setClientId(e.target.value)}
															placeholder='Enter client name'
														/>
													</div>
													<div className='space-y-2'>
														<Label htmlFor='client'>Website URL</Label>
														<Input
															id='client'
															value={clientName}
															onChange={(e) => setClientName(e.target.value)}
															placeholder='Enter website URL'
														/>
													</div>
												</div>
											</CardContent>
										</Card>
									</div>
								</div>
								<div className='mb-8 py-6'>
									<Card>
										<CardContent>
											<div className='space-y-4'>
												<div className='mt-4 space-y-8'>
													<div>
														<button
															onClick={() => toggleSection('step2a')}
															className='flex justify-between items-start w-full text-left group'>
															<div className='max-w-[80%]'>
																<CardTitle>
																	<h3 className='text-xl font-semibold leading-none tracking-tight py-4'>
																		Step 2: Enter observations (comments and issues)
																	</h3>
																</CardTitle>
																<p className='text-sm text-muted-foreground py-2'>
																	Go through each criterion in the{' '}
																	<span className='font-bold'>Criterion</span> column and document
																	your findings in the{' '}
																	<span className='font-bold'>Observations</span> column. Write the
																	issues and comments in a short and consistent way. Fill in only
																	where relevant; empty cells are allowed. If relevant, add page
																	URL/page name in your observations.
																</p>
																<p className='text-sm text-muted-foreground py-2'>
																	The data you enter will remain in the table until you clear the
																	data with the <span className='font-bold'>Clear Data</span>{' '}
																	button. If needed, refer to the following guidelines:{' '}
																	<Link
																		className='text-blue-500 hover:text-blue-700 hover:underline'
																		href='https://www.digg.se/webbriktlinjer/alla-webbriktlinjer'
																		target='_blank'
																		rel='noopener noreferrer'>
																		webbriktlinjer
																	</Link>{' '}
																	from Digg (myndigheten för digital förvaltning).
																</p>
																<p className='text-sm text-muted-foreground py-2'>
																	Also see, easy checks from{' '}
																	<a
																		href='https://www.w3.org/WAI/test-evaluate/easy-checks/'
																		className=' text-sm text-blue-500 hover:text-blue-700 hover:underline'
																		target='_blank'
																		rel='noopener noreferrer'>
																		W3C WAI Easy Checks
																	</a>
																</p>
																<div className='flex items-center gap-4'>
																	<p className='text-sm font-bold py-2 text-blue-500 cursor-pointer'>
																		Click to expand the audit table
																	</p>
																	<span
																		className={`transform transition-transform text-blue-500 cursor-pointer ${
																			expandedSections.step2a ? 'rotate-90' : ''
																		}`}>
																		▶
																	</span>
																</div>
															</div>
														</button>
														{expandedSections.step2a && (
															<div className='mt-4'>
																<div className='mb-4 flex flex-col gap-4'>
																	<div className='flex items-center gap-4'>
																		<div className='flex-1'>
																			<Label htmlFor='newUrl' className='my-4'>
																				Add URL to test
																			</Label>
																			<div className='flex gap-2'>
																				<Input
																					id='newUrl'
																					value={newUrl}
																					onChange={(e) => setNewUrl(e.target.value)}
																					placeholder='Enter URL to test'
																					className='flex-1'
																				/>
																				<Button onClick={handleAddUrl}>Add URL</Button>
																			</div>
																		</div>
																		<div className='flex-1'>
																			<Label htmlFor='urlSelect'>Select URL to test</Label>
																			<select
																				id='urlSelect'
																				value={selectedUrl}
																				onChange={(e) => handleUrlChange(e.target.value)}
																				className='w-full p-2 border rounded-md focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground'>
																				<option value=''>Select a URL</option>
																				{urls.map((url) => (
																					<option key={url} value={url}>
																						{url}
																					</option>
																				))}
																			</select>
																		</div>
																	</div>
																	{selectedUrl && (
																		<div className='text-sm text-muted-foreground'>
																			Testing:{' '}
																			<span className='text-black font-medium'>{selectedUrl}</span>
																		</div>
																	)}
																</div>

																<div className='overflow-x-auto'>
																	<table className='min-w-full border-collapse'>
																		<thead>
																			<tr>
																				<th className='border p-2 text-sm font-medium text-left align-top bg-muted/50 w-[5%]'>
																					Status
																				</th>
																				<th className='border p-2 text-sm font-medium text-left align-top bg-muted/50 w-[15%]'>
																					Check Type
																				</th>
																				<th className='border p-2 text-sm font-medium text-left align-top bg-muted/50 w-[20%]'>
																					Description
																				</th>
																				<th className='border p-2 text-sm font-medium text-left align-top bg-muted/50 w-[25%]'>
																					Observations
																				</th>
																				<th className='border p-2 text-sm font-medium text-left align-top bg-muted/50 w-[15%]'>
																					How to Check
																				</th>
																				<th className='border p-2 text-sm font-medium text-left align-top bg-muted/50 w-[10%]'>
																					Tool/Method
																				</th>
																				<th className='border p-2 text-sm font-medium text-left align-top bg-muted/50 w-[15%]'>
																					Where to Check
																				</th>
																			</tr>
																		</thead>
																		<tbody className='text-sm'>
																			<tr
																				key='imageAlt'
																				className={`border-b ${
																					completedItems[selectedUrl]?.[
																						checkTypeDisplayNames.imageAlt
																					]
																						? 'bg-gray-100'
																						: ''
																				}`}>
																				<td className='border p-2 align-top text-foreground'>
																					<div className='flex flex-col items-center gap-2'>
																						<span className='text-xs text-muted-foreground'>
																							#1
																						</span>
																						<div className='flex flex-col items-center gap-1'>
																							<span className='text-xs text-muted-foreground'>
																								Done?
																							</span>
																							<Checkbox
																								checked={
																									completedItems[selectedUrl]?.[
																										checkTypeDisplayNames.imageAlt
																									] || false
																								}
																								onCheckedChange={() =>
																									toggleCompleted(checkTypeDisplayNames.imageAlt)
																								}
																								className='data-[state=checked]:bg-gray-600 data-[state=checked]:border-gray-600'
																							/>
																						</div>
																					</div>
																				</td>
																				<td className='border p-2 font-medium align-top text-foreground'>
																					Alt Text
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					Image alternative text ("alt text") is a short description
																					that conveys the purpose of an image. Alternative text is
																					used by people who do not see the image, including: •
																					People who are blind and use a screen reader • People with
																					low vision that magnify the screen and use text-to-speech
																					• Some people with learning or reading disabilities who
																					have information read aloud
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					<Textarea
																						value={
																							basicTestObservations[selectedUrl]?.[
																								checkTypeDisplayNames.imageAlt
																							] || ''
																						}
																						onChange={(e) =>
																							handleBasicTestObservationChange(
																								checkTypeDisplayNames.imageAlt,
																								e.target.value
																							)
																						}
																						className='w-full p-2 border rounded-md focus:ring-2 focus:ring-ring focus:border-ring min-h-[100px] bg-background text-foreground'
																						placeholder='Enter observations...'
																						disabled={!selectedUrl}
																					/>
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					• Images with information relevant to content should have
																					descriptive alt text • Images with text should have that
																					text in the alt text • Decorative images should have empty
																					alt text (alt="") • Functional images (links/buttons)
																					should describe their function • Complex images
																					(graphs/charts) should have short alt text plus detailed
																					description elsewhere
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					Browser dev tools, Screen reader, W3C WAI Easy Checks -
																					Image Alt Text
																					(https://www.w3.org/WAI/test-evaluate/easy-checks/image-alt/)
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					• All images on page • Special attention to: - Informative
																					images - Images of text - Functional images - Complex
																					images - Groups of images - Image maps
																				</td>
																			</tr>

																			<tr
																				key='pageTitle'
																				className={`border-b ${
																					completedItems[selectedUrl]?.[
																						checkTypeDisplayNames.pageTitle
																					]
																						? 'bg-gray-100'
																						: ''
																				}`}>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					<div className='flex flex-col items-center gap-2'>
																						<span className='text-xs text-muted-foreground'>
																							#2
																						</span>
																						<div className='flex flex-col items-center gap-1'>
																							<span className='text-xs text-muted-foreground'>
																								Done?
																							</span>
																							<Checkbox
																								checked={
																									completedItems[selectedUrl]?.[
																										checkTypeDisplayNames.pageTitle
																									] || false
																								}
																								onCheckedChange={() =>
																									toggleCompleted(checkTypeDisplayNames.pageTitle)
																								}
																								className='data-[state=checked]:bg-gray-600 data-[state=checked]:border-gray-600'
																							/>
																						</div>
																					</div>
																				</td>
																				<td className='border p-2 font-medium align-top text-foreground'>
																					Page Title
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					Page titles are shown in: • Browser window title bar •
																					Browser tabs when multiple pages are open • Search engine
																					results • Browser bookmarks/favorites • First thing read
																					by screen readers when opening a page They help screen
																					reader users understand what page is loading and navigate
																					among open tabs.
																				</td>
																				<td className='border p-2 align-top'>
																					<Textarea
																						value={
																							basicTestObservations[selectedUrl]?.[
																								checkTypeDisplayNames.pageTitle
																							] || ''
																						}
																						onChange={(e) =>
																							handleBasicTestObservationChange(
																								checkTypeDisplayNames.pageTitle,
																								e.target.value
																							)
																						}
																						className='w-full p-2 border rounded-md focus:ring-2 focus:ring-ring focus:border-ring min-h-[100px] bg-background text-foreground'
																						placeholder='Enter observations...'
																						disabled={!selectedUrl}
																					/>
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					• Check that there is a title that adequately and briefly
																					describes the page content • Check that the title is
																					different from other pages on the website • Verify that
																					important and unique information comes first
																					("front-loading") Example of good titles: • "About Acme
																					Web Solutions" (not "Acme Web Solutions - About Us") •
																					"Contact Acme Web Solutions" (not "Acme Web Solutions -
																					Contact Us")
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					Visual inspection (browser tab/title bar), Screen reader,
																					W3C WAI Easy Checks - Page Title
																					(https://www.w3.org/WAI/test-evaluate/easy-checks/title/)
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					• Browser title bar • Browser tabs • Compare across
																					different pages of the site
																				</td>
																			</tr>

																			<tr
																				key='headings'
																				className={`border-b ${
																					completedItems[selectedUrl]?.[
																						checkTypeDisplayNames.headings
																					]
																						? 'bg-gray-100'
																						: ''
																				}`}>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					<div className='flex flex-col items-center gap-2'>
																						<span className='text-xs text-muted-foreground'>
																							#3
																						</span>
																						<div className='flex flex-col items-center gap-1'>
																							<span className='text-xs text-muted-foreground'>
																								Done?
																							</span>
																							<Checkbox
																								checked={
																									completedItems[selectedUrl]?.[
																										checkTypeDisplayNames.headings
																									] || false
																								}
																								onCheckedChange={() =>
																									toggleCompleted(checkTypeDisplayNames.headings)
																								}
																								className='data-[state=checked]:bg-gray-600 data-[state=checked]:border-gray-600'
																							/>
																						</div>
																					</div>
																				</td>
																				<td className='border p-2 font-medium align-top text-foreground'>
																					Headings
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					Headings communicate the organization of the content on
																					the page, like a table of contents. They should be nested
																					by their rank/level (h1-h6). Headings are important for: •
																					Screen reader users who can jump between headings with a
																					single keystroke • People with low vision who rely on
																					larger visual headings before zooming in • People with
																					cognitive and learning disabilities who use headings to
																					understand and focus on topics
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					<Textarea
																						value={
																							basicTestObservations[selectedUrl]?.[
																								checkTypeDisplayNames.headings
																							] || ''
																						}
																						onChange={(e) =>
																							handleBasicTestObservationChange(
																								checkTypeDisplayNames.headings,
																								e.target.value
																							)
																						}
																						className='w-full p-2 border rounded-md focus:ring-2 focus:ring-ring focus:border-ring min-h-[100px] bg-background text-foreground'
																						placeholder='Enter observations...'
																						disabled={!selectedUrl}
																					/>
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					• Check for: • Presence of headings on the page • Page
																					starts with an h1 • No skipped heading levels • No blank
																					headings • Visual headings are marked up as actual
																					headings • Heading text reflects the content that follows
																					• Headings represent proper content structure, especially
																					nested content
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					Browser dev tools, Screen reader, W3C WAI Easy Checks -
																					Headings
																					(https://www.w3.org/WAI/test-evaluate/easy-checks/headings/),
																					Body Text Review section in Manual Tests
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					• All page headings • Visual text that appears to be
																					headings • Document structure/outline
																				</td>
																			</tr>

																			<tr
																				key='colorContrast'
																				className={`border-b ${
																					completedItems[selectedUrl]?.[
																						checkTypeDisplayNames.colorContrast
																					]
																						? 'bg-gray-100'
																						: ''
																				}`}>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					<div className='flex flex-col items-center gap-2'>
																						<span className='text-xs text-muted-foreground'>
																							#4
																						</span>
																						<div className='flex flex-col items-center gap-1'>
																							<span className='text-xs text-muted-foreground'>
																								Done?
																							</span>
																							<Checkbox
																								checked={
																									completedItems[selectedUrl]?.[
																										checkTypeDisplayNames.colorContrast
																									] || false
																								}
																								onCheckedChange={() =>
																									toggleCompleted(
																										checkTypeDisplayNames.colorContrast
																									)
																								}
																								className='data-[state=checked]:bg-gray-600 data-[state=checked]:border-gray-600'
																							/>
																						</div>
																					</div>
																				</td>
																				<td className='border p-2 font-medium align-top text-foreground'>
																					Color Contrast
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					Color contrast refers to the difference between adjacent
																					colors: • Text and background color • Interactive elements
																					and their background • Parts of graphs or charts that need
																					to be understood Good contrast is important for: • People
																					with low vision who have reduced contrast acuity • People
																					with color deficient vision ('color blindness') • Anyone
																					trying to read content in bright light conditions
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					<Textarea
																						value={
																							basicTestObservations[selectedUrl]?.[
																								checkTypeDisplayNames.colorContrast
																							] || ''
																						}
																						onChange={(e) =>
																							handleBasicTestObservationChange(
																								checkTypeDisplayNames.colorContrast,
																								e.target.value
																							)
																						}
																						className='w-full p-2 border rounded-md focus:ring-2 focus:ring-ring focus:border-ring min-h-[100px] bg-background text-foreground'
																						placeholder='Enter observations...'
																						disabled={!selectedUrl}
																						rows='4'
																					/>
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					• Check for: • Text contrast ratio meets minimum
																					requirement (4.5:1) • Interactive elements have sufficient
																					contrast • Color is not the only way to convey information
																					• Graphs and charts are understandable without relying on
																					color Quick check: View page in grayscale to identify
																					potential contrast issues
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					Color Contrast Analyzer, Browser dev tools, W3C WAI Easy
																					Checks - Color Contrast
																					(https://www.w3.org/WAI/test-evaluate/easy-checks/color-contrast/),
																					Grayscale viewing
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					• All text content • Interactive elements (buttons, links,
																					etc.) • Information conveyed through color • Visual
																					elements like graphs and charts
																				</td>
																			</tr>

																			<tr
																				key='skipLink'
																				className={`border-b ${
																					completedItems[selectedUrl]?.[
																						checkTypeDisplayNames.skipLink
																					]
																						? 'bg-gray-100'
																						: ''
																				}`}>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					<div className='flex flex-col items-center gap-2'>
																						<span className='text-xs text-muted-foreground'>
																							#5
																						</span>
																						<div className='flex flex-col items-center gap-1'>
																							<span className='text-xs text-muted-foreground'>
																								Done?
																							</span>
																							<Checkbox
																								checked={
																									completedItems[selectedUrl]?.[
																										checkTypeDisplayNames.skipLink
																									] || false
																								}
																								onCheckedChange={() =>
																									toggleCompleted(checkTypeDisplayNames.skipLink)
																								}
																								className='data-[state=checked]:bg-gray-600 data-[state=checked]:border-gray-600'
																							/>
																						</div>
																					</div>
																				</td>
																				<td className='border p-2 font-medium align-top text-foreground'>
																					Skip Link
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					A skip link is the first interactive element on a page
																					that allows users to bypass blocks of repeated content.
																					The most important instance is a skip navigation link at
																					the start of a page. Skip links are important for: •
																					Screen reader users • People with poor dexterity • People
																					with various motor disabilities • People using mouth
																					sticks or head pointers • People using switch devices
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					<Textarea
																						value={
																							basicTestObservations[selectedUrl]?.[
																								checkTypeDisplayNames.skipLink
																							] || ''
																						}
																						onChange={(e) =>
																							handleBasicTestObservationChange(
																								checkTypeDisplayNames.skipLink,
																								e.target.value
																							)
																						}
																						className='w-full p-2 border rounded-md focus:ring-2 focus:ring-ring focus:border-ring min-h-[100px] bg-background text-foreground'
																						placeholder='Enter observations...'
																						disabled={!selectedUrl}
																						rows='4'
																					/>
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					• Check for: • Presence of skip link as first interactive
																					element • Skip link becomes visible on keyboard focus (if
																					initially hidden) • Skip link functionality works
																					correctly • Link text clearly indicates purpose (e.g.,
																					"Skip navigation", "Skip to content", "Skip to main
																					content") • After activation, focus moves to main content
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					Keyboard navigation, Screen reader, W3C WAI Easy Checks -
																					Skip Link
																					(https://www.w3.org/WAI/test-evaluate/easy-checks/skip-link/)
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					• Top of page • Verify skip link target (main content) •
																					Test with keyboard Tab key
																				</td>
																			</tr>

																			<tr
																				key='keyboardFocus'
																				className={`border-b ${
																					completedItems[selectedUrl]?.[
																						checkTypeDisplayNames.keyboardFocus
																					]
																						? 'bg-gray-100'
																						: ''
																				}`}>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					<div className='flex flex-col items-center gap-2'>
																						<span className='text-xs text-muted-foreground'>
																							#6
																						</span>
																						<div className='flex flex-col items-center gap-1'>
																							<span className='text-xs text-muted-foreground'>
																								Done?
																							</span>
																							<Checkbox
																								checked={
																									completedItems[selectedUrl]?.[
																										checkTypeDisplayNames.keyboardFocus
																									] || false
																								}
																								onCheckedChange={() =>
																									toggleCompleted(
																										checkTypeDisplayNames.keyboardFocus
																									)
																								}
																								className='data-[state=checked]:bg-gray-600 data-[state=checked]:border-gray-600'
																							/>
																						</div>
																					</div>
																				</td>
																				<td className='border p-2 font-medium align-top text-foreground'>
																					Keyboard Focus
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					Visible keyboard focus indicates which interactive element
																					(link, button, form field) you are on when using the
																					keyboard to navigate. This is essential for: • Sighted
																					users with physical disabilities (quadriplegia, limited
																					dexterity, tremors) • People navigating by keyboard or
																					voice • People who are blind (using keyboard with
																					non-visual cues)
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					<Textarea
																						value={
																							basicTestObservations[selectedUrl]?.[
																								checkTypeDisplayNames.keyboardFocus
																							] || ''
																						}
																						onChange={(e) =>
																							handleBasicTestObservationChange(
																								checkTypeDisplayNames.keyboardFocus,
																								e.target.value
																							)
																						}
																						className='w-full p-2 border rounded-md focus:ring-2 focus:ring-ring focus:border-ring min-h-[100px] bg-background text-foreground'
																						placeholder='Enter observations...'
																						disabled={!selectedUrl}
																						rows='4'
																					/>
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					• Test using keyboard controls: • Tab: Navigate to links
																					and form controls • Shift + Tab: Navigate backwards •
																					Spacebar: Activate checkboxes and buttons • Enter:
																					Activate links and buttons • Arrow keys: Navigate radio
																					buttons, menus, sliders • Escape: Close dialogs/menus
																					Check for: • Visible focus indicator on all interactive
																					elements • No mouse-only interactions (e.g., hover menus)
																					• Logical navigation order • Proper dialog behavior
																					(navigation, closure, focus return) • No keyboard traps
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					Keyboard navigation, W3C WAI Easy Checks - Keyboard Focus
																					(https://www.w3.org/WAI/test-evaluate/easy-checks/keyboard-focus/)
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					• All interactive elements • Navigation menus • Forms and
																					controls • Modal dialogs • Custom widgets • Dynamic
																					content
																				</td>
																			</tr>

																			<tr
																				key='language'
																				className={`border-b ${
																					completedItems[selectedUrl]?.[
																						checkTypeDisplayNames.language
																					]
																						? 'bg-gray-100'
																						: ''
																				}`}>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					<div className='flex flex-col items-center gap-2'>
																						<span className='text-xs text-muted-foreground'>
																							#7
																						</span>
																						<div className='flex flex-col items-center gap-1'>
																							<span className='text-xs text-muted-foreground'>
																								Done?
																							</span>
																							<Checkbox
																								checked={
																									completedItems[selectedUrl]?.[
																										checkTypeDisplayNames.language
																									] || false
																								}
																								onCheckedChange={() =>
																									toggleCompleted(checkTypeDisplayNames.language)
																								}
																								className='data-[state=checked]:bg-gray-600 data-[state=checked]:border-gray-600'
																							/>
																						</div>
																					</div>
																				</td>
																				<td className='border p-2 font-medium align-top text-foreground'>
																					Language
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					Web pages should identify the primary language of the
																					page. This is crucial because: • Screen readers and other
																					text-to-speech tools need to know which language to use
																					for correct pronunciation • Browser translation tools need
																					to know which language to translate from • It helps search
																					engines identify the language of content
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					<Textarea
																						value={
																							basicTestObservations[selectedUrl]?.[
																								checkTypeDisplayNames.language
																							] || ''
																						}
																						onChange={(e) =>
																							handleBasicTestObservationChange(
																								checkTypeDisplayNames.language,
																								e.target.value
																							)
																						}
																						className='w-full p-2 border rounded-md focus:ring-2 focus:ring-ring focus:border-ring min-h-[100px] bg-background text-foreground'
																						placeholder='Enter observations...'
																						disabled={!selectedUrl}
																						rows='4'
																					/>
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					• Check for: • Primary language is correctly identified in
																					HTML lang attribute • Language declaration matches the
																					actual content language • If page has no language set, it
																					will show "Page language is not specified" • For
																					multilingual pages, check that language changes within
																					content are properly marked
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					View page source, Browser dev tools, Screen reader, W3C
																					WAI Easy Checks - Language
																					(https://www.w3.org/WAI/test-evaluate/easy-checks/language/)
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					• HTML tag (lang attribute) • Content sections in
																					different languages • Page metadata
																				</td>
																			</tr>

																			<tr
																				key='zoom'
																				className={`border-b ${
																					completedItems[selectedUrl]?.[checkTypeDisplayNames.zoom]
																						? 'bg-gray-100'
																						: ''
																				}`}>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					<div className='flex flex-col items-center gap-2'>
																						<span className='text-xs text-muted-foreground'>
																							#8
																						</span>
																						<div className='flex flex-col items-center gap-1'>
																							<span className='text-xs text-muted-foreground'>
																								Done?
																							</span>
																							<Checkbox
																								checked={
																									completedItems[selectedUrl]?.[
																										checkTypeDisplayNames.zoom
																									] || false
																								}
																								onCheckedChange={() =>
																									toggleCompleted(checkTypeDisplayNames.zoom)
																								}
																								className='data-[state=checked]:bg-gray-600 data-[state=checked]:border-gray-600'
																							/>
																						</div>
																					</div>
																				</td>
																				<td className='border p-2 font-medium align-top text-foreground'>
																					Zoom
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					Zoom is used to enlarge text and images on web pages to
																					make them more readable. This is crucial for: • People who
																					need to enlarge content to read it • People who forgot
																					their reading glasses • People with low vision who need
																					significant magnification (200% or larger) • Anyone
																					viewing content on small screens or from a distance
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					<Textarea
																						value={
																							basicTestObservations[selectedUrl]?.[
																								checkTypeDisplayNames.zoom
																							] || ''
																						}
																						onChange={(e) =>
																							handleBasicTestObservationChange(
																								checkTypeDisplayNames.zoom,
																								e.target.value
																							)
																						}
																						className='w-full p-2 border rounded-md focus:ring-2 focus:ring-ring focus:border-ring min-h-[100px] bg-background text-foreground'
																						placeholder='Enter observations...'
																						disabled={!selectedUrl}
																						rows='4'
																					/>
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					• Test at 200% zoom (Ctrl/Cmd + to zoom in): • Verify all
																					content remains visible and in logical order • Check for
																					content overlap or spacing issues • Ensure navigation
																					menus remain usable (mobile-style menus are acceptable) •
																					Confirm no horizontal scrolling is needed (for horizontal
																					text) • Test all interactive elements still function
																					properly • Check that text isn't hidden behind other
																					content
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					Browser zoom controls (Ctrl/Cmd + to zoom in, Ctrl/Cmd -
																					to zoom out, Ctrl/Cmd 0 to reset), W3C WAI Easy Checks -
																					Zoom
																					(https://www.w3.org/WAI/test-evaluate/easy-checks/zoom/)
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					• All page content • Navigation menus • Interactive
																					elements • Text content • Images and media • Forms and
																					controls
																				</td>
																			</tr>

																			<tr
																				key='captions'
																				className={`border-b ${
																					completedItems[selectedUrl]?.[
																						checkTypeDisplayNames.captions
																					]
																						? 'bg-gray-100'
																						: ''
																				}`}>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					<div className='flex flex-col items-center gap-2'>
																						<span className='text-xs text-muted-foreground'>
																							#9
																						</span>
																						<div className='flex flex-col items-center gap-1'>
																							<span className='text-xs text-muted-foreground'>
																								Done?
																							</span>
																							<Checkbox
																								checked={
																									completedItems[selectedUrl]?.[
																										checkTypeDisplayNames.captions
																									] || false
																								}
																								onCheckedChange={() =>
																									toggleCompleted(checkTypeDisplayNames.captions)
																								}
																								className='data-[state=checked]:bg-gray-600 data-[state=checked]:border-gray-600'
																							/>
																						</div>
																					</div>
																				</td>
																				<td className='border p-2 font-medium align-top text-foreground'>
																					Multimedia (Captions)
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					Captions are a text version of the speech and non-speech
																					audio information needed to understand the video and
																					displayed with the video. The audio in video content needs
																					to be available to people who are Deaf or hard of hearing.
																					Captions are important for: • People who are Deaf or hard
																					of hearing • People watching video in noisy environments •
																					People learning to read or learning the language • People
																					who process written information better than audio
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					<Textarea
																						value={
																							basicTestObservations[selectedUrl]?.[
																								checkTypeDisplayNames.captions
																							] || ''
																						}
																						onChange={(e) =>
																							handleBasicTestObservationChange(
																								checkTypeDisplayNames.captions,
																								e.target.value
																							)
																						}
																						className='w-full p-2 border rounded-md focus:ring-2 focus:ring-ring focus:border-ring min-h-[100px] bg-background text-foreground'
																						placeholder='Enter observations...'
																						disabled={!selectedUrl}
																						rows='4'
																					/>
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					• Check for: • Presence of captions for all video content
																					• Captions are synchronized with the audio • Captions
																					include all speech and important non-speech sounds •
																					Captions are accurate and properly punctuated • Speaker
																					identification when multiple people are speaking •
																					Auto-generated captions alone are not sufficient
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					Manual check, Media player controls, W3C WAI Easy Checks -
																					Captions
																					(https://www.w3.org/WAI/test-evaluate/easy-checks/captions/)
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					• All video content • Video player caption controls •
																					Caption quality and accuracy • Caption timing and
																					synchronization
																				</td>
																			</tr>

																			<tr
																				key='transcripts'
																				className={`border-b ${
																					completedItems[selectedUrl]?.[
																						checkTypeDisplayNames.transcripts
																					]
																						? 'bg-gray-100'
																						: ''
																				}`}>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					<div className='flex flex-col items-center gap-2'>
																						<span className='text-xs text-muted-foreground'>
																							#10
																						</span>
																						<div className='flex flex-col items-center gap-1'>
																							<span className='text-xs text-muted-foreground'>
																								Done?
																							</span>
																							<Checkbox
																								checked={
																									completedItems[selectedUrl]?.[
																										checkTypeDisplayNames.transcripts
																									] || false
																								}
																								onCheckedChange={() =>
																									toggleCompleted(checkTypeDisplayNames.transcripts)
																								}
																								className='data-[state=checked]:bg-gray-600 data-[state=checked]:border-gray-600'
																							/>
																						</div>
																					</div>
																				</td>
																				<td className='border p-2 font-medium align-top text-foreground'>
																					Multimedia (Transcripts)
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					Transcripts are a text version of the speech and
																					non-speech information in audio content and available
																					separately from the video. They are used by: • People who
																					are Deaf or hard of hearing • People who have difficulty
																					processing audio information • People who are deafblind •
																					Screen reader users who may prefer reading the transcript
																					over listening to audio • People who want to quickly scan
																					or search through the content
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					<Textarea
																						value={
																							basicTestObservations[selectedUrl]?.[
																								checkTypeDisplayNames.transcripts
																							] || ''
																						}
																						onChange={(e) =>
																							handleBasicTestObservationChange(
																								checkTypeDisplayNames.transcripts,
																								e.target.value
																							)
																						}
																						className='w-full p-2 border rounded-md focus:ring-2 focus:ring-ring focus:border-ring min-h-[100px] bg-background text-foreground'
																						placeholder='Enter observations...'
																						disabled={!selectedUrl}
																						rows='4'
																					/>
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					• Check for: • Presence of transcript with the media or a
																					link to transcript • Transcript is easy to find near the
																					audio/video content • All speech is accurately reflected
																					in the transcript • Speakers are properly identified •
																					Important sounds are described (e.g., "soft clapping",
																					"tires screeching") • For videos, important visual
																					information is described in the transcript
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					Manual check, W3C WAI Easy Checks - Transcripts
																					(https://www.w3.org/WAI/test-evaluate/easy-checks/transcripts/)
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					• All audio content • All video content • Transcript
																					location and accessibility • Transcript completeness and
																					accuracy
																				</td>
																			</tr>

																			<tr
																				key='audioDescription'
																				className={`border-b ${
																					completedItems[selectedUrl]?.[
																						checkTypeDisplayNames.audioDescription
																					]
																						? 'bg-gray-100'
																						: ''
																				}`}>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					<div className='flex flex-col items-center gap-2'>
																						<span className='text-xs text-muted-foreground'>
																							#11
																						</span>
																						<div className='flex flex-col items-center gap-1'>
																							<span className='text-xs text-muted-foreground'>
																								Done?
																							</span>
																							<Checkbox
																								checked={
																									completedItems[selectedUrl]?.[
																										checkTypeDisplayNames.audioDescription
																									] || false
																								}
																								onCheckedChange={() =>
																									toggleCompleted(
																										checkTypeDisplayNames.audioDescription
																									)
																								}
																								className='data-[state=checked]:bg-gray-600 data-[state=checked]:border-gray-600'
																							/>
																						</div>
																					</div>
																				</td>
																				<td className='border p-2 font-medium align-top text-foreground'>
																					Multimedia (Audio Description)
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					Audio description describes visual information needed to
																					understand the content, including text displayed in the
																					video, as part of the video. It provides content to: •
																					People who are blind and others who cannot see the video
																					adequately • People with cognitive disabilities who
																					benefit from both visual and auditory information • People
																					learning the language who benefit from additional verbal
																					descriptions
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					<Textarea
																						value={
																							basicTestObservations[selectedUrl]?.[
																								checkTypeDisplayNames.audioDescription
																							] || ''
																						}
																						onChange={(e) =>
																							handleBasicTestObservationChange(
																								checkTypeDisplayNames.audioDescription,
																								e.target.value
																							)
																						}
																						className='w-full p-2 border rounded-md focus:ring-2 focus:ring-ring focus:border-ring min-h-[100px] bg-background text-foreground'
																						placeholder='Enter observations...'
																						disabled={!selectedUrl}
																						rows='4'
																					/>
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					• Check for: • Whether description is needed (are there
																					important visual elements?) • If needed, check if
																					description is provided through: - Integration in the main
																					audio - Separate described video - Separate description
																					file • All important visual information is described,
																					including: - Title text at the beginning - Links and
																					contact information shown - Speakers' names in text - Text
																					in presentations - Important actions and expressions
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					Manual check, Media player controls, W3C WAI Easy Checks -
																					Audio Description
																					(https://www.w3.org/WAI/test-evaluate/easy-checks/description/)
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					• All video content • Visual information in videos • Text
																					displayed in videos • Actions and expressions • Scene
																					changes
																				</td>
																			</tr>

																			<tr
																				key='formLabels'
																				className={`border-b ${
																					completedItems[selectedUrl]?.[
																						checkTypeDisplayNames.formLabels
																					]
																						? 'bg-gray-100'
																						: ''
																				}`}>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					<div className='flex flex-col items-center gap-2'>
																						<span className='text-xs text-muted-foreground'>
																							#12
																						</span>
																						<div className='flex flex-col items-center gap-1'>
																							<span className='text-xs text-muted-foreground'>
																								Done?
																							</span>
																							<Checkbox
																								checked={
																									completedItems[selectedUrl]?.[
																										checkTypeDisplayNames.formLabels
																									] || false
																								}
																								onCheckedChange={() =>
																									toggleCompleted(checkTypeDisplayNames.formLabels)
																								}
																								className='data-[state=checked]:bg-gray-600 data-[state=checked]:border-gray-600'
																							/>
																						</div>
																					</div>
																				</td>
																				<td className='border p-2 font-medium align-top text-foreground'>
																					Forms (Labels)
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					Form field labels are the text beside form fields. They
																					should tell us what information to enter or what checkbox
																					to select. Everyone needs labels to understand how to
																					interact with a form. Labels are especially important for:
																					• Screen reader users who need to know what information to
																					enter • People with cognitive disabilities who benefit
																					from clear instructions • People with motor disabilities
																					who need larger clickable areas • Anyone filling out forms
																					who needs clear guidance
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					<Textarea
																						value={
																							basicTestObservations[selectedUrl]?.[
																								checkTypeDisplayNames.formLabels
																							] || ''
																						}
																						onChange={(e) =>
																							handleBasicTestObservationChange(
																								checkTypeDisplayNames.formLabels,
																								e.target.value
																							)
																						}
																						className='w-full p-2 border rounded-md focus:ring-2 focus:ring-ring focus:border-ring min-h-[100px] bg-background text-foreground'
																						placeholder='Enter observations...'
																						disabled={!selectedUrl}
																						rows='4'
																					/>
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					• Check for: • All form controls have descriptive labels •
																					Labels are properly associated with their form fields • If
																					visual label is not present, check for: - Hidden
																					&lt;label&gt; element - aria-label attribute - title
																					attribute • Labels clearly describe the required input •
																					Clicking on label activates the associated form control
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					Browser dev tools, Screen reader, W3C WAI Easy Checks -
																					Form Labels
																					(https://www.w3.org/WAI/test-evaluate/easy-checks/form-field-labels/)
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					• All form fields • Text inputs • Checkboxes • Radio
																					buttons • Select menus • Text areas • Custom form controls
																				</td>
																			</tr>

																			<tr
																				key='requiredFields'
																				className={`border-b ${
																					completedItems[selectedUrl]?.[
																						checkTypeDisplayNames.requiredFields
																					]
																						? 'bg-gray-100'
																						: ''
																				}`}>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					<div className='flex flex-col items-center gap-2'>
																						<span className='text-xs text-muted-foreground'>
																							#13
																						</span>
																						<div className='flex flex-col items-center gap-1'>
																							<span className='text-xs text-muted-foreground'>
																								Done?
																							</span>
																							<Checkbox
																								checked={
																									completedItems[selectedUrl]?.[
																										checkTypeDisplayNames.requiredFields
																									] || false
																								}
																								onCheckedChange={() =>
																									toggleCompleted(
																										checkTypeDisplayNames.requiredFields
																									)
																								}
																								className='data-[state=checked]:bg-gray-600 data-[state=checked]:border-gray-600'
																							/>
																						</div>
																					</div>
																				</td>
																				<td className='border p-2 font-medium align-top text-foreground'>
																					Forms (Required Fields)
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					A required form field must be completed before you submit
																					a form. Marking which fields are required in a form makes
																					it easier for everyone to complete forms. This is
																					important for: • All users who need to complete forms
																					correctly • Screen reader users who need to know
																					requirements before submission • People with cognitive
																					disabilities who benefit from clear instructions • Anyone
																					who wants to avoid form submission errors
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					<Textarea
																						value={
																							basicTestObservations[selectedUrl]?.[
																								checkTypeDisplayNames.requiredFields
																							] || ''
																						}
																						onChange={(e) =>
																							handleBasicTestObservationChange(
																								checkTypeDisplayNames.requiredFields,
																								e.target.value
																							)
																						}
																						className='w-full p-2 border rounded-md focus:ring-2 focus:ring-ring focus:border-ring min-h-[100px] bg-background text-foreground'
																						placeholder='Enter observations...'
																						disabled={!selectedUrl}
																						rows='4'
																					/>
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					• Check for: • Fields marked as required have a visible
																					indicator • The word "required" is included in the label
																					(preferred method) • If using an asterisk (*), ensure it's
																					explained at the form start • If marking optional fields
																					instead, ensure there's a clear message that all unmarked
																					fields are required • Required fields are properly marked
																					in HTML code (required attribute) • Error messages clearly
																					indicate missing required fields
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					Visual inspection, Screen reader, W3C WAI Easy Checks -
																					Required Fields
																					(https://www.w3.org/WAI/test-evaluate/easy-checks/required-fields/)
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					• All forms • Required field indicators • Form
																					instructions • Error messages • Form validation
																				</td>
																			</tr>

																			<tr
																				key='tables'
																				className={`border-b ${
																					completedItems[selectedUrl]?.[
																						checkTypeDisplayNames.tables
																					]
																						? 'bg-gray-100'
																						: ''
																				}`}>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					<div className='flex flex-col items-center gap-2'>
																						<span className='text-xs text-muted-foreground'>
																							#14
																						</span>
																						<div className='flex flex-col items-center gap-1'>
																							<span className='text-xs text-muted-foreground'>
																								Done?
																							</span>
																							<Checkbox
																								checked={
																									completedItems[selectedUrl]?.[
																										checkTypeDisplayNames.tables
																									] || false
																								}
																								onCheckedChange={() =>
																									toggleCompleted(checkTypeDisplayNames.tables)
																								}
																								className='data-[state=checked]:bg-gray-600 data-[state=checked]:border-gray-600'
																							/>
																						</div>
																					</div>
																				</td>
																				<td className='border p-2 font-medium align-top text-foreground'>
																					Tables
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					Tables should be used for presenting tabular data, not for
																					layout purposes. Proper table structure helps screen
																					reader users understand the relationships between headers
																					and data cells. This is important for: • Screen reader
																					users who need to understand data relationships • People
																					with cognitive disabilities who benefit from structured
																					information • Users who need to navigate complex data
																					efficiently • Anyone who needs to understand the logical
																					relationships between data points
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					<Textarea
																						value={
																							basicTestObservations[selectedUrl]?.[
																								checkTypeDisplayNames.tables
																							] || ''
																						}
																						onChange={(e) =>
																							handleBasicTestObservationChange(
																								checkTypeDisplayNames.tables,
																								e.target.value
																							)
																						}
																						className='w-full p-2 border rounded-md focus:ring-2 focus:ring-ring focus:border-ring min-h-[100px] bg-background text-foreground'
																						placeholder='Enter observations...'
																						disabled={!selectedUrl}
																						rows='4'
																					/>
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					• Check for: • Tables are only used for tabular data, not
																					for layout purposes • Table captions are present and
																					descriptive • Row and/or column headers are properly
																					marked up • Complex tables have appropriate header
																					associations • Data cells are properly associated with
																					their headers • Tables make sense when read in a linear
																					order
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					Browser dev tools, Screen reader
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					• All data tables on the page • Table headers and captions
																					• Table structure and markup • Header-cell relationships •
																					Table navigation with screen reader
																				</td>
																			</tr>

																			<tr
																				key='bodyText'
																				className={`border-b ${
																					completedItems[selectedUrl]?.[
																						checkTypeDisplayNames.bodyText
																					]
																						? 'bg-gray-100'
																						: ''
																				}`}>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					<div className='flex flex-col items-center gap-2'>
																						<span className='text-xs text-muted-foreground'>
																							#15
																						</span>
																						<div className='flex flex-col items-center gap-1'>
																							<span className='text-xs text-muted-foreground'>
																								Done?
																							</span>
																							<Checkbox
																								checked={
																									completedItems[selectedUrl]?.[
																										checkTypeDisplayNames.bodyText
																									] || false
																								}
																								onCheckedChange={() =>
																									toggleCompleted(checkTypeDisplayNames.bodyText)
																								}
																								className='data-[state=checked]:bg-gray-600 data-[state=checked]:border-gray-600'
																							/>
																						</div>
																					</div>
																				</td>
																				<td className='border p-2 font-medium align-top text-foreground'>
																					Body Text
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					The body text of a page should be well-structured and easy
																					to understand. This is important for: • All users,
																					particularly those with cognitive disabilities • Screen
																					reader users who rely on proper document structure •
																					People with reading difficulties who need clear, simple
																					language • Users who scan content using headings and links
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					<Textarea
																						value={
																							basicTestObservations[selectedUrl]?.[
																								checkTypeDisplayNames.bodyText
																							] || ''
																						}
																						onChange={(e) =>
																							handleBasicTestObservationChange(
																								checkTypeDisplayNames.bodyText,
																								e.target.value
																							)
																						}
																						className='w-full p-2 border rounded-md focus:ring-2 focus:ring-ring focus:border-ring min-h-[100px] bg-background text-foreground'
																						placeholder='Enter observations...'
																						disabled={!selectedUrl}
																						rows='4'
																					/>
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					• Check for: • Page title is unique and descriptive,
																					marked as &lt;h1&gt; (only one per page) • Visual headings
																					use proper hierarchy (&lt;h1&gt;, &lt;h2&gt;, etc.)
																					without skipping levels • Link text is descriptive (avoid
																					"read more" or "click here") • Plain language is used
																					instead of jargon • Acronyms are spelled out on first
																					reference • Content is organized in clear, logical
																					sections
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					Visual inspection, Screen reader, Browser dev tools to
																					verify heading structure
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					• Page titles • Heading structure • Link text • General
																					content • Technical terms and acronyms • Document
																					organization
																				</td>
																			</tr>

																			<tr
																				key='screenReader'
																				className={`border-b ${
																					completedItems[selectedUrl]?.[
																						checkTypeDisplayNames.screenReader
																					]
																						? 'bg-gray-100'
																						: ''
																				}`}>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					<div className='flex flex-col items-center gap-2'>
																						<span className='text-xs text-muted-foreground'>
																							#16
																						</span>
																						<div className='flex flex-col items-center gap-1'>
																							<span className='text-xs text-muted-foreground'>
																								Done?
																							</span>
																							<Checkbox
																								checked={
																									completedItems[selectedUrl]?.[
																										checkTypeDisplayNames.screenReader
																									] || false
																								}
																								onCheckedChange={() =>
																									toggleCompleted(
																										checkTypeDisplayNames.screenReader
																									)
																								}
																								className='data-[state=checked]:bg-gray-600 data-[state=checked]:border-gray-600'
																							/>
																						</div>
																					</div>
																				</td>
																				<td className='border p-2 font-medium align-top text-foreground'>
																					Screen Reader
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					Screen reader testing helps identify issues with content
																					structure, reading order, dynamic updates, and interactive
																					elements. This testing is essential for: • People who are
																					blind or have severe visual impairments • Users who rely
																					on keyboard navigation • People with cognitive
																					disabilities who use text-to-speech • Developers and
																					testers verifying accessibility implementation
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					<Textarea
																						value={
																							basicTestObservations[selectedUrl]?.[
																								checkTypeDisplayNames.screenReader
																							] || ''
																						}
																						onChange={(e) =>
																							handleBasicTestObservationChange(
																								checkTypeDisplayNames.screenReader,
																								e.target.value
																							)
																						}
																						className='w-full p-2 border rounded-md focus:ring-2 focus:ring-ring focus:border-ring min-h-[100px] bg-background text-foreground'
																						placeholder='Enter observations...'
																						disabled={!selectedUrl}
																						rows='4'
																					/>
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					• Test with appropriate screen reader for your system: •
																					Mac users:
																					<a href='#' className='text-blue-500 hover:underline'>
																						VoiceOver (built-in)
																					</a>
																					• PC users: NVDA (free) or JAWS Check for: • Proper
																					reading order • Accurate pronunciation • Dynamic content
																					updates • Interactive element behavior • Form field labels
																					and instructions • Table structure and navigation • Image
																					descriptions • Heading hierarchy
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
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
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					• Page structure and navigation • Interactive elements •
																					Forms and controls • Dynamic content • Tables and lists •
																					Images and media • Error messages • Status updates
																				</td>
																			</tr>

																			<tr
																				key='otherTests'
																				className={`border-b ${
																					completedItems[selectedUrl]?.[
																						checkTypeDisplayNames.otherTests
																					]
																						? 'bg-gray-100'
																						: ''
																				}`}>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					<div className='flex flex-col items-center gap-2'>
																						<span className='text-xs text-muted-foreground'>
																							#17
																						</span>
																						<div className='flex flex-col items-center gap-1'>
																							<span className='text-xs text-muted-foreground'>
																								Done?
																							</span>
																							<Checkbox
																								checked={
																									completedItems[selectedUrl]?.[
																										checkTypeDisplayNames.otherTests
																									] || false
																								}
																								onCheckedChange={() =>
																									toggleCompleted(checkTypeDisplayNames.otherTests)
																								}
																								className='data-[state=checked]:bg-gray-600 data-[state=checked]:border-gray-600'
																							/>
																						</div>
																					</div>
																				</td>
																				<td className='border p-2 font-medium align-top text-foreground'>
																					Other Tests
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					Additional testing helps identify issues with various
																					content types and functionalities. This is important for:
																					• Users accessing PDF documents • People navigating
																					through complex workflows • Users interacting with
																					third-party content • Mobile users • People using
																					different browsers and assistive technologies • Anyone
																					encountering error states or authentication flows
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					<Textarea
																						value={
																							basicTestObservations[selectedUrl]?.[
																								checkTypeDisplayNames.otherTests
																							] || ''
																						}
																						onChange={(e) =>
																							handleBasicTestObservationChange(
																								checkTypeDisplayNames.otherTests,
																								e.target.value
																							)
																						}
																						className='w-full p-2 border rounded-md focus:ring-2 focus:ring-ring focus:border-ring min-h-[100px] bg-background text-foreground'
																						placeholder='Enter observations...'
																						disabled={!selectedUrl}
																						rows='4'
																					/>
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					• Check for: • PDF accessibility (tags, reading order, alt
																					text) • Broken or empty links • Third-party widget
																					behavior • Mobile-specific issues • Cross-browser
																					compatibility • Custom component accessibility •
																					Authentication flow accessibility • Error handling and
																					messaging • Any other relevant aspects not covered by
																					previous tests
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					Manual testing, PDF accessibility tools, Mobile devices,
																					Multiple browsers, Screen readers
																				</td>
																				<td className='border p-2 align-top text-sm text-muted-foreground'>
																					• PDF documents • External links • Third-party content •
																					Mobile views • Different browsers • Custom components •
																					Login/signup flows • Error states • Other unique features
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
										</CardContent>
									</Card>
								</div>
								{/* Executive summary section */}
								<div className='py-6'>
									<Card>
										<CardHeader>
											<CardTitle>
												<h3 className='text-xl font-semibold leading-none tracking-tight py-4'>
													Step 3: Add a summary of findings
												</h3>
											</CardTitle>

											<p className='text-sm text-muted-foreground'>
												Enter a summary based on the observations you have entered in the table
												below. This summary will appear in the PDF report and should highlight key
												findings, major issues, and general recommendations. (The placeholder text
												in the field below is just an example).
											</p>
											<p className='text-sm text-muted-foreground'>
												Tip: Paste in all your observations into chatgpt and ask it to summarize it
												for you, and then paste the summary in the Executive Summary field. (This
												feature will likely be AI-powered in the future).
											</p>
										</CardHeader>
										<CardContent>
											<Textarea
												value={executiveSummary}
												onChange={(e) => setExecutiveSummary(e.target.value)}
												className='min-h-[150px] text-sm text-muted-foreground'
												placeholder={`Enter your summary here. Example:

Overall Evaluation:
• The site demonstrates good accessibility practices in [areas]...
• Several critical issues were identified...
`}
											/>
										</CardContent>
									</Card>
								</div>
								<Card>
									<CardHeader>
										<CardTitle>
											<h3 className='text-xl font-semibold leading-none tracking-tight py-4'>
												Step 4: Preview and export audit
											</h3>
										</CardTitle>
										<p className='text-sm text-muted-foreground'>
											When done, click <span className='font-bold'>Export Audit</span> to preview
											the report and export it as a PDF, HTML or JSON.
										</p>
									</CardHeader>
									<CardContent className='space-y-6'>
										{/* Client info and buttons section */}
										<Button className='cursor-pointer' onClick={handleExport}>
											Export Audit
										</Button>
									</CardContent>
								</Card>
								{showPreview && (
									<ReportPreview auditData={previewData} onClose={() => setShowPreview(false)} />
								)}
							</div>
						</Card>
					</div>
				</div>

				{/* 
				{showPreview && (
					<ReportPreview auditData={previewData} onClose={() => setShowPreview(false)} />
				)} */}
			</div>
		</main>
	)
}
