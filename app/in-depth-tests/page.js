'use client'
import React, { useState, useEffect } from 'react'
import ReportPreview from '../components/ReportPreview'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Instructions from '../components/Instructions'
import Hero from '../components/Hero'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import AuditSteps from '../components/AuditSteps'
import ExecutiveSummaryStep from '../components/ExecutiveSummaryStep'
import { wcagCriteria } from '../data/wcagCriteria'
// Add this sorting function before the wcagCriteria array
function compareCriteria(a, b) {
	// Extract numbers from criterion strings (e.g., "1.2.3" from "1.2.3 Audio Description")
	const getNumbers = (criterion) => {
		const match = criterion.match(/^(\d+)\.(\d+)\.(\d+)/)
		if (!match) return [0, 0, 0]
		return [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10)]
	}

	const [aMajor, aMinor, aPatch] = getNumbers(a.criterion)
	const [bMajor, bMinor, bPatch] = getNumbers(b.criterion)

	// Compare major version
	if (aMajor !== bMajor) return aMajor - bMajor
	// If major versions are equal, compare minor version
	if (aMinor !== bMinor) return aMinor - bMinor
	// If minor versions are equal, compare patch version
	return aPatch - bPatch
}

export default function InDepthTestsPage() {
	const [clientName, setClientName] = useState('')
	const [clientId, setClientId] = useState('')
	const [urls, setUrls] = useState([])
	const [selectedUrl, setSelectedUrl] = useState('')
	const [observations, setObservations] = useState({})
	const [dateCreated, setDateCreated] = useState(new Date().toISOString())
	const [showPreview, setShowPreview] = useState(false)
	const [previewData, setPreviewData] = useState(null)
	const [executiveSummary, setExecutiveSummary] = useState('')
	const [otherFindings, setOtherFindings] = useState('')
	const [expandedSections, setExpandedSections] = useState({
		testResults: false,
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
	const [completedItems, setCompletedItems] = useState({})
	const [expandedCells, setExpandedCells] = useState({})
	const [newUrl, setNewUrl] = useState('')

	// Load saved data from localStorage on component mount
	useEffect(() => {
		console.log('=== Loading data from localStorage ===')
		const savedData = localStorage.getItem('inDepthTestsAuditData')
		console.log('Saved data:', savedData)
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
					otherFindings,
				} = JSON.parse(savedData)
				console.log('Parsed data:', {
					clientName,
					clientId,
					observations,
					dateCreated,
					executiveSummary,
					completedItems,
					urls,
					selectedUrl,
					otherFindings,
				})
				// Only set state if we have actual data
				if (Object.keys(observations || {}).length > 0 || (urls && urls.length > 0)) {
					setObservations(observations || {})
					setDateCreated(dateCreated || new Date().toISOString())
					setExecutiveSummary(executiveSummary || '')
					setClientName(clientName || '')
					setClientId(clientId || '')
					setCompletedItems(completedItems || {})
					setUrls(urls || [])
					setSelectedUrl(selectedUrl || '')
					setOtherFindings(otherFindings || '')
				}
			} catch (error) {
				console.error('Error parsing saved data:', error)
			}
		}
	}, [])

	// Save data to localStorage whenever it changes
	useEffect(() => {
		console.log('=== Saving data to localStorage ===')
		const auditData = {
			clientName,
			clientId,
			observations,
			dateCreated,
			executiveSummary,
			completedItems,
			urls,
			selectedUrl,
			otherFindings,
		}
		console.log('Data to save:', auditData)
		// Only save if we have actual data
		if (Object.keys(observations).length > 0 || urls.length > 0) {
			localStorage.setItem('inDepthTestsAuditData', JSON.stringify(auditData))
		}
	}, [
		observations,
		dateCreated,
		executiveSummary,
		clientName,
		clientId,
		completedItems,
		urls,
		selectedUrl,
		otherFindings,
	])

	const handleAddUrl = () => {
		if (newUrl && !urls.includes(newUrl)) {
			console.log('=== Adding new URL ===', newUrl)
			setUrls([...urls, newUrl])
			setSelectedUrl(newUrl)
			setNewUrl('')
		}
	}

	const handleUrlChange = (url) => {
		console.log('=== Changing URL ===', url)
		setSelectedUrl(url)
	}

	const handleObservationChange = (criterion, value) => {
		if (!selectedUrl) return
		console.log('=== Updating observation ===', {
			url: selectedUrl,
			criterion,
			value,
		})
		setObservations((prev) => {
			const newObservations = {
				...prev,
				[selectedUrl]: {
					...prev[selectedUrl],
					[criterion]: value,
				},
			}
			console.log('New observations state:', newObservations)
			return newObservations
		})
	}

	const handleExport = () => {
		// Create observations array for all URLs
		const observationsWithDetails = Object.entries(observations).map(([url, urlObservations]) => {
			// Filter and map observations for this URL
			const urlObservationsList = Object.entries(urlObservations)
				.filter(([_, observation]) => observation && observation.trim() !== '') // Only include non-empty observations
				.map(([criterion, observation]) => {
					const criterionDetails = wcagCriteria.find((c) => c.criterion === criterion)
					return {
						criterion,
						observation,
						category: criterionDetails?.category || '',
						level: criterionDetails?.level || '',
						description: criterionDetails?.description || '',
					}
				})

			// Return URL section with its observations
			return {
				url,
				observations: urlObservationsList,
			}
		})

		const auditData = {
			clientName,
			clientId,
			observations: observationsWithDetails,
			dateCreated,
			executiveSummary,
			otherFindings,
		}

		setPreviewData(auditData)
		setShowPreview(true)
	}

	const handleClearData = () => {
		if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
			console.log('=== Clearing data ===')
			localStorage.removeItem('inDepthTestsAuditData')
			setObservations({})
			setDateCreated(new Date().toISOString())
			setExecutiveSummary('')
			setClientName('')
			setClientId('')
			setCompletedItems({})
			setUrls([])
			setSelectedUrl('')
			setNewUrl('')
			setOtherFindings('')
		}
	}

	const toggleSection = (section) => {
		setExpandedSections((prev) => ({
			...prev,
			[section]: !prev[section],
		}))
	}

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

	const toggleCellExpansion = (cellId) => {
		setExpandedCells((prev) => ({
			...prev,
			[cellId]: !prev[cellId],
		}))
	}

	const truncateText = (text, maxLength = 200) => {
		if (!text) return ''
		if (text.length <= maxLength) return text
		return text.slice(0, maxLength) + '...'
	}

	// Find the Non-text Content criterion and update its howToCheck field
	const updatedWcagCriteria = wcagCriteria.map((criterion) => {
		const howToCheck = criterion.howToCheck
		if (howToCheck.length > 200) {
			return {
				...criterion,
				howToCheck: {
					full: howToCheck,
					preview: truncateText(howToCheck),
				},
			}
		}
		return criterion
	})

	// Add this function after the other state declarations
	const collectObservationsForAI = () => {
		const allObservations = []

		// Iterate through each URL
		Object.entries(observations).forEach(([url, urlObservations]) => {
			// Iterate through each criterion for this URL
			Object.entries(urlObservations).forEach(([criterion, observation]) => {
				if (observation && observation.trim() !== '') {
					allObservations.push({
						url,
						checkType: criterion,
						observation,
					})
				}
			})
		})

		console.log('Collected observations for AI:', allObservations)
		return allObservations
	}

	// Add this function to handle AI generation
	const handleGenerateAISummary = () => {
		const observations = collectObservationsForAI()

		if (observations.length === 0) {
			alert('No observations found. Please add some observations before generating a summary.')
			return
		}

		// For now, just show the collected data in console
		console.log('Generating AI summary with observations:', observations)
		alert('AI summary generation would happen here. Check console for collected observations.')

		// TODO: Implement actual AI generation here
	}

	return (
		<main className='flex flex-1 flex-col'>
			<Hero
				title='In-Depth Accessibility Tests'
				description='A comprehensive guide for conducting thorough accessibility testing'
			/>

			<div className='container mx-auto p-4'>
				<div className='mb-6 flex flex-col gap-4 '>
					<div className='py-6'>
						<Card className='bg-muted/50'>
							<CardHeader>
								<CardTitle>
									<h2 className='text-2xl font-semibold leading-none tracking-tight py-4'>Audit</h2>
								</CardTitle>

								<AuditSteps />
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
														Step 1: Enter Client Info
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
															onClick={() => toggleSection('testResults')}
															className='flex justify-between items-start w-full text-left group'>
															<div className='max-w-[80%]'>
																<CardTitle>
																	<h3 className='text-xl font-semibold leading-none tracking-tight py-4'>
																		Step 2: Enter Observations
																	</h3>
																</CardTitle>
																<p className='text-sm text-muted-foreground py-2'>
																	Go through each criterion in the{' '}
																	<span className='font-bold'>Check Type</span> column and document
																	your findings in the{' '}
																	<span className='font-bold'>Observations</span> column. Write the
																	issues and comments in a short and consistent way. Fill in only
																	where relevant; empty cells are allowed. If relevant, add page
																	URL/page name in your observations.
																</p>
																<p className='text-sm text-muted-foreground py-2'>
																	The data you enter will remain in the table until you clear the
																	data with the <span className='font-bold'>Clear Data</span>{' '}
																	button.
																</p>{' '}
																<p className='text-sm text-muted-foreground py-2'>
																	If needed, refer to the following guidelines (in Swedish):{' '}
																	<Link
																		className='text-blue-500 hover:text-blue-700 hover:underline'
																		href='https://www.digg.se/webbriktlinjer/alla-webbriktlinjer'
																		target='_blank'
																		rel='noopener noreferrer'>
																		webbriktlinjer
																	</Link>{' '}
																	from Digg (myndigheten för digital förvaltning). You can search by
																	Check Type number, i.e. search for 1.1.1 for info about Non-text
																	Content.
																</p>
																<div className='flex items-center gap-4'>
																	<p className='text-sm font-bold py-2 text-blue-500 cursor-pointer'>
																		Click to expand the audit table
																	</p>
																	<span
																		className={`transform transition-transform text-blue-500 cursor-pointer ${
																			expandedSections.testResults ? 'rotate-90' : ''
																		}`}>
																		▶
																	</span>
																</div>
															</div>
														</button>
														{expandedSections.testResults && (
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
																			<Label htmlFor='urlSelect' className='my-4'>
																				Select URL to test
																			</Label>
																			<select
																				id='urlSelect'
																				value={selectedUrl}
																				onChange={(e) => handleUrlChange(e.target.value)}
																				className='w-full p-2 border rounded-md focus:ring-2 focus:ring-ring focus:border-ring bg-background text-sm text-muted-foreground'>
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
																			<span className='text-black font-bold'>{selectedUrl}</span>
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
																				<th className='border p-2 text-sm font-medium text-left align-top bg-muted/50'>
																					Category
																				</th>
																				<th className='border p-2 text-sm font-medium text-left align-top bg-muted/50'>
																					Level
																				</th>
																				<th className='border p-2 text-sm font-medium text-left align-top bg-muted/50'>
																					Description
																				</th>
																				<th className='border p-2 text-sm font-medium text-left align-top bg-muted/50'>
																					Observations
																				</th>
																				<th className='border p-2 text-sm font-medium text-left align-top bg-muted/50'>
																					How to Check
																				</th>
																				<th className='border p-2 text-sm font-medium text-left align-top bg-muted/50'>
																					Tool/Method
																				</th>
																				<th className='border p-2 text-sm font-medium text-left align-top bg-muted/50'>
																					Where to Check
																				</th>
																			</tr>
																		</thead>
																		<tbody className='text-sm'>
																			{updatedWcagCriteria.map((criterion, index) => (
																				<tr
																					key={criterion.criterion}
																					className={`border-b ${
																						completedItems[selectedUrl]?.[criterion.criterion]
																							? 'bg-gray-100'
																							: ''
																					}`}>
																					<td className='border p-2 align-top text-foreground'>
																						<div className='flex flex-col items-center gap-2'>
																							<span className='text-xs text-muted-foreground'>
																								#{index + 1}
																							</span>
																							<div className='flex flex-col items-center gap-1'>
																								<span className='text-xs text-muted-foreground'>
																									Done?
																								</span>
																								<Checkbox
																									checked={
																										completedItems[selectedUrl]?.[
																											criterion.criterion
																										] || false
																									}
																									onCheckedChange={() =>
																										toggleCompleted(criterion.criterion)
																									}
																									className='data-[state=checked]:bg-gray-600 data-[state=checked]:border-gray-600'
																								/>
																							</div>
																						</div>
																					</td>
																					<td className='border p-2 w-[10%] text-left align-top font-medium'>
																						{criterion.criterion}
																					</td>
																					<td className='border p-2 w-[8%] text-left align-top text-sm text-muted-foreground'>
																						{criterion.category}
																					</td>
																					<td className='border p-2 w-[5%] text-left align-top text-sm text-muted-foreground'>
																						{criterion.level}
																					</td>
																					<td className='border p-2 w-[15%] text-left align-top text-sm text-muted-foreground'>
																						{criterion.description}
																					</td>
																					<td className='border p-2 w-[25%] text-left align-top text-sm text-muted-foreground'>
																						<textarea
																							value={
																								observations[selectedUrl]?.[criterion.criterion] ||
																								''
																							}
																							onChange={(e) =>
																								handleObservationChange(
																									criterion.criterion,
																									e.target.value
																								)
																							}
																							className='w-full p-2 border rounded-md focus:ring-2 focus:ring-ring focus:border-ring min-h-[100px] bg-background text-foreground'
																							placeholder='Enter observations...'
																							disabled={!selectedUrl}
																						/>
																					</td>
																					<td className='border p-2 w-[15%] text-left align-top text-sm text-muted-foreground'>
																						{typeof criterion.howToCheck === 'object' ? (
																							<div className='relative'>
																								{expandedCells[
																									`howToCheck-${criterion.criterion}`
																								] ? (
																									<div>
																										{criterion.howToCheck.full}
																										<button
																											onClick={() =>
																												toggleCellExpansion(
																													`howToCheck-${criterion.criterion}`
																												)
																											}
																											className='ml-2 text-xs text-blue-500 hover:text-blue-700 hover:underline'>
																											Show less
																										</button>
																									</div>
																								) : (
																									<div>
																										{criterion.howToCheck.preview}
																										<button
																											onClick={() =>
																												toggleCellExpansion(
																													`howToCheck-${criterion.criterion}`
																												)
																											}
																											className='ml-2 text-xs text-blue-500 hover:text-blue-700 hover:underline'>
																											Show more
																										</button>
																									</div>
																								)}
																							</div>
																						) : (
																							criterion.howToCheck
																						)}
																					</td>
																					<td className='border p-2 w-[10%] text-left align-top text-sm text-muted-foreground'>
																						{criterion.toolMethod}
																					</td>
																					<td className='border p-2 w-[12%] text-left align-top whitespace-pre-line text-sm text-muted-foreground'>
																						{criterion.whereToCheck}
																					</td>
																				</tr>
																			))}
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
								{/* Other Findings section */}
								<div className='py-6'>
									<Card>
										<CardHeader>
											<CardTitle>
												<h3 className='text-xl font-semibold leading-none tracking-tight py-4'>
													Other Findings
												</h3>
											</CardTitle>
											<p className='text-sm text-muted-foreground'>
												Add any additional findings or comments about the accessibility audit that
												don't fit into the specific criteria above.
											</p>
										</CardHeader>
										<CardContent>
											<Textarea
												value={otherFindings}
												onChange={(e) => setOtherFindings(e.target.value)}
												className='min-h-[150px]'
												placeholder='Enter any additional findings or comments here...'
											/>
										</CardContent>
									</Card>
								</div>
								{/* Executive summary section */}
								<div className='py-6'>
									<Card>
										<ExecutiveSummaryStep />
										<CardContent>
											<div className='flex flex-col gap-4'>
												<div className='flex justify-between items-center'>
													<Label htmlFor='executiveSummary'>Executive Summary</Label>
													<Button
														variant='outline'
														onClick={handleGenerateAISummary}
														className='ml-2'>
														Generate with AI
													</Button>
												</div>
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
											</div>
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
			</div>
		</main>
	)
}
