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

const wcagCriteria = [
	{
		criterion: '1.3.4 Orientation',
		category: 'Perceivable',
		level: 'AA',
		description:
			'Web content should work well whether the device is in portrait or landscape mode, unless specific mode is necessary for proper function (like a piano app needing landscape mode)',
		howToCheck:
			"Use the browser's developer tools to simulate a mobile device view and switch between portrait and landscape modes and ensure that content is correctly displayed and functional",
		toolMethod: 'Devtools Device Mode or resizing window',
		whereToCheck: 'Full screen',
	},
	{
		criterion: '3.2.3 Consistent Navigation',
		category: 'Understandable',
		level: 'AA',
		description:
			'Navigation (e.g. a menu), components with the same function, and help options, should remain consistent across pages',
		howToCheck: 'Browse different pages and compare the placement and order of navigation elements',
		toolMethod: 'Visually Inspect',
		whereToCheck: 'Across the whole website/app (or multiple screens)',
	},
	{
		criterion: '3.2.6 Consistent Help',
		category: 'Understandable',
		level: 'A',
		description:
			'If a website/app provides help (like live chat or FAQ links), those help options should always be easy to find in the same place on every page',
		howToCheck:
			'1. Identify where help options (e.g., help links, support chat) are placed across the site\n2. Compare different pages to confirm the help options are consistently located in the same place',
		toolMethod: 'Visually Inspect',
		whereToCheck: 'Look for help services such as:\n- Live chat\n- FAQ links',
	},
	{
		criterion: '2.4.5 Multiple Ways',
		category: 'Operable',
		level: 'AA',
		description:
			'Users should have more than one way to find any given page on your site, like using a search bar, navigation menus, or a site map',
		howToCheck:
			"1. Ensure the website has at least two ways to find pages (e.g., navigation menus, a search bar, a site map)\n2. Try using different methods to locate the same page (e.g., using the site's search function or navigation menu)",
		toolMethod: 'Manual inspection',
		whereToCheck:
			'Applies to whole target website/app and look for search functionality and navigation menu',
	},
	{
		criterion: '2.4.2 Page Titled',
		category: 'Operable',
		level: 'A',
		description:
			'Every webpage should have a unique, clear, and descriptive title that helps users understand what the page is about',
		howToCheck:
			"1. View the title of the page (usually in the browser's title bar or tab) and confirm it's descriptive and relevant to the content\n2. Check if titles accurately reflect the content of the page",
		toolMethod: 'Manual inspection (read)',
		whereToCheck: 'Check the title in the browser tab',
	},
	{
		criterion: '3.1.1 Language of Page',
		category: 'Understandable',
		level: 'A',
		description:
			'The main language of the webpage must be defined in the code, so assistive tools can present the content correctly.',
		howToCheck:
			"Inspect the page's HTML for the lang attribute in the <html> tag and verify that it correctly identifies the main language of the page (e.g., lang='en' for English)",
		toolMethod: '- Screen reader\n- Browser dev. tool (inspect element)',
		whereToCheck: 'Check the page HTML. The [lang] attribute is often on the top of the page',
	},
	{
		criterion: '3.1.2 Language of Parts',
		category: 'Understandable',
		level: 'AA',
		description:
			"If a section of the page uses a different language from the main language (e.g., a quote in Spanish on an English page), it must be marked in the code so it's announced with correct pronunciation.",
		howToCheck:
			"1. Review the page for sections of content in different languages.\n2. Inspect the HTML of the language-specific content to ensure the correct lang attribute is applied (e.g., lang='es' for Spanish).",
		toolMethod: '- Screen reader\n- Browser dev. tool (inspect element)',
		whereToCheck:
			'Check full screen for words or sections that are in a different language than the main language (e.g. an English quote on a page where the rest of the copy is in Dutch)',
	},
	{
		criterion: '1.4.10 Reflow',
		category: 'Perceivable',
		level: 'AA',
		description:
			'Users should be able to zoom in (up to 400%) on content without needing to scroll sideways (horizontally) or losing content/functionality.',
		howToCheck:
			'Zoom in to 400% on a standard desktop browser and ensure content adapts to the new screen width (no horizontal scrolling or hidden content)',
		toolMethod: 'Browser: Zoom to 400%',
		whereToCheck: 'Full screen',
	},
	{
		criterion: '2.2.1 Timing Adjustable',
		category: 'Operable',
		level: 'A',
		description:
			'If a task has a time limit (like filling out a form or payment flow or automatic log out due to inactivity), users should be able to extend the time or receive a warning before it expires.',
		howToCheck:
			'1. Identify any functionality with time limits (e.g., forms, quizzes).\n2. Verify that users can extend the time, turn it off, or receive a warning',
		toolMethod: 'Manual inspection (doing)',
		whereToCheck:
			'Check whole target website / app to see if any screen applies a time limit mechanism.',
	},
	{
		criterion: '2.2.2 Pause, Stop, Hide',
		category: 'Operable',
		level: 'A',
		description:
			'Information that moves, blinks, scrolls or auto-updates can be paused, stopped or hidden if there is other content, too.',
		howToCheck:
			'1. Identify any moving or auto-updating content:\n2. Verify that there are controls to pause, stop, or hide the moving content',
		toolMethod: 'Interactive elements such as,\n- carousels,\n- animations,\n- auto-updating feeds',
		whereToCheck: 'Content such as,\n- Videos\n- Animations',
	},
	{
		criterion: '2.3.1 Three Flashes or Below Threshold',
		category: 'Operable',
		level: 'A',
		description:
			"There are no flashes happening more often than three times per second, or that the flashing is below a certain threshold that won't trigger seizures",
		howToCheck:
			'Ensure that flashing occurs fewer than three times per second, or that the flashing is minimal in contrast and brightness.',
		toolMethod: 'Manual inspection (Visually Inspect)',
		whereToCheck: 'Content such as,\n- Videos\n- Animations',
	},
	{
		criterion: '1.2.1 Audio-only and Video-only (Prerecorded)',
		category: 'Perceivable',
		level: 'A',
		description:
			'Provide text transcripts for audio-only content and either transcripts or descriptions for video-only content.',
		howToCheck:
			'A. Transcripts are available for audio-only content.\nB. Transcripts or descriptions are available for video-only content.',
		toolMethod: 'Manual inspection',
		whereToCheck: '- Audio only (e.g. podcast)\n- Video only (e.g. instructional animation)',
	},
	{
		criterion: '1.2.2 Captions (Prerecorded)',
		category: 'Perceivable',
		level: 'A',
		description: 'Provide captions for any prerecorded video content that includes audio',
		howToCheck:
			'1. Check if all prerecorded videos with audio have captions.\n2. Check if captions accurately reflect spoken content and audio cues.',
		toolMethod: 'Manual inspection',
		whereToCheck: 'Pre-recorded video (if owned by business)',
	},
	{
		criterion: '1.2.3 Audio Description or Media Alternative (Prerecorded)',
		category: 'Perceivable',
		level: 'A',
		description:
			'Provide an audio description or a text alternative for video content to describe visual information for users who cannot see the video (e.g. people are walking)',
		howToCheck:
			'1. Verify that audio descriptions or text alternatives are available for prerecorded video content.\n2. Ensure that the video player supports audio descriptions if they are provided.',
		toolMethod: 'Manual inspection\n- Doing\n- Listening',
		whereToCheck: 'Pre-recorded video (if owned by business)',
	},
	{
		criterion: '1.2.4 Captions (Live)',
		category: 'Perceivable',
		level: 'AA',
		description: 'Provide real-time captions for any live video content that includes audio.',
		howToCheck: 'Check the availability and quality of real-time captions in the video player.',
		toolMethod: 'Manual inspection',
		whereToCheck: 'Live stream (if owned by business)',
	},
	{
		criterion: '1.2.5 Audio Description (Prerecorded)',
		category: 'Perceivable',
		level: 'AA',
		description:
			'Provide audio descriptions for prerecorded video content to describe important visual details for users who cannot see the video.',
		howToCheck:
			"1. Play the video and listen without looking at the screen to see if you can fully understand what's happening.\n2. Ensure that an audio description track is available (either as a secondary audio track or as a part of the main video).\n3. Confirm that the audio description clearly explains important visual elements, like actions or changes in the setting.",
		toolMethod: 'Manual inspection\n- Doing\n- Listening',
		whereToCheck: 'Pre-recorded video (if owned by business)',
	},
	{
		criterion: '1.4.2 Audio Control',
		category: 'Perceivable',
		level: 'A',
		description:
			'Users should be able to stop or control any audio that plays automatically for more than three seconds.',
		howToCheck:
			'- Auto-playing Audio: Identify any audio content that plays automatically.\n- Control Mechanisms:Ensure there are controls to pause, stop, or adjust the volume of the audio. This could be a media player with these controls readily accessible.',
		toolMethod:
			'Manual Testing: Play the webpage and identify any auto-playing audio. Verify the presence and functionality of audio controls.',
		whereToCheck: 'Anything with audio',
	},
	{
		criterion: '1.4.11 Non-text Contrast',
		category: 'Perceivable',
		level: 'AA',
		description:
			'Interactive elements like buttons and form fields must have enough contrast (3:1) against their background to be easily distinguishable.',
		howToCheck:
			"1. Identify Non-text Elements: Find interactive components such as buttons, form controls, and icons.\n2. Check Contrast Ratios:\nMeasure the contrast ratio between the element (or its borders) and the background ensuring it's at least 3:1.",
		toolMethod: 'Contrast Ratio Checker:',
		whereToCheck: 'Find interactive components such as\n- Buttons\n- Form controls\n- Icons',
	},
	{
		criterion: '1.4.3 Contrast (Minimum)',
		category: 'Perceivable',
		level: 'AA',
		description:
			'Text should have enough contrast with its background to be easily readable. Normal text needs a higher contrast ratio than large text.',
		howToCheck:
			'- Normal text contrast ratio is at least 4.5:1.\n- Large text contrast ratio is at least 3:1.\n- All text is readable against its background',
		toolMethod: 'Contrast Ratio Checker:',
		whereToCheck: 'Text',
	},
	{
		criterion: '2.5.1 Pointer Gestures',
		category: 'Operable',
		level: 'A',
		description:
			'If a function requires complex gestures (e.g., two-finger swipe), users should be able to perform the same action with simple, single-point actions (e.g., a click).',
		howToCheck:
			'1. Identify any gestures that require more than one point of contact or path-based gestures. Verify that a simpler alternative is available.\n2. Try performing the gesture-based actions with a single mouse click or tap to ensure functionality is preserved.',
		toolMethod:
			'Manual inspection\n- Device with touchscreen (phone / tablet)\n- Hands\n- Mouse (pointer device)',
		whereToCheck: 'Applies to whole target website/app',
	},
	{
		criterion: '2.5.2 Pointer Cancellation',
		category: 'Operable',
		level: 'A',
		description:
			'If a user accidentally touches or clicks something, they should be able to cancel the action before it completes (e.g., by dragging away before releasing a click).',
		howToCheck:
			'1. Ensure that actions do not trigger until the user has released the pointer (e.g., mouse button or finger tap). If the user drags away before releasing, the action should cancel.\n2. Test actions with both a mouse and touchscreen to verify pointer cancellation.',
		toolMethod:
			'Manual inspection:\n- Device with touchscreen (phone / tablet)\n- Hands\n- Mouse (pointer device)',
		whereToCheck:
			'Find every interactive component that has a down state such as:\n- Buttons\n- Links\n- Form Fields\n- Dropdown menus\n- Checkboxes',
	},
	{
		criterion: '1.4.13 Content on Hover or Focus',
		category: 'Perceivable',
		level: 'AA',
		description:
			'If content (like a tooltip or dropdown) appears when you hover over or focus on an element, it should be easy to close, stay visible long enough to be read, and not disappear unless intentionally dismissed.',
		howToCheck:
			'1. Trigger Hover or Focus Content:\nInteract with elements that display additional content on hover or focus, like tooltips, popups, or dropdown menus.\n2. Check for Dismissibility:\nVerify that users can dismiss the content without moving the pointer or keyboard focus.\n3. Ensure Content Visibility:\nConfirm that the additional content remains visible as long as the user hovers over or focuses on the trigger element or the content itself.\n4. No Unexpected Disappearance:\nEnsure the content does not disappear unexpectedly when the pointer or focus is over it.',
		toolMethod: 'Manual Testing:\n- Mouse\n- Keyboard',
		whereToCheck: 'Find interactive components such as\n- Tooltips\n- Popups\n- Dropdown menus',
	},
	{
		criterion: '2.5.7 Dragging Movements',
		category: 'Operable',
		level: 'AA',
		description:
			'If users need to drag something (like a slider), there must be an alternative method like tapping or clicking to complete the action.',
		howToCheck:
			'1. Identify any functions requiring dragging (like sliders or drag-and-drop interfaces).\n2. If so, ensure users can complete the same function using simple click or tap actions.',
		toolMethod: 'Manual Inspection:\n- Mouse\n- Device with touchscreen (phone / tablet)',
		whereToCheck:
			'Interactive elements that apply drag interactions such as:\n- Sliders\n- Carousels\n- Change list order',
	},
	{
		criterion: '2.5.8 Target Size (Minimum)',
		category: 'Operable',
		level: 'AA',
		description: 'The target size of an interactive component is at least 24 by 24px',
		howToCheck:
			'1. Verify that buttons, links, and other interactive elements are at least 24x24 CSS pixels or larger.\n2. Test buttons and links on touch devices to ensure they are easy to tap without accidentally activating adjacent elements.',
		toolMethod:
			'Manual Inspection:\n- Mouse\n- Device with touchscreen (phone / tablet)\n- Browser dev. tool (inspect element)',
		whereToCheck:
			'Interactive elements that can be pressed/clicked such as:\n- Buttons\n- Icon buttons\n- Links\n- Tabs\n- List items\n- Checkboxes\n- Radioboxes',
	},
	{
		criterion: '2.4.1 Bypass Blocks',
		category: 'Operable',
		level: 'A',
		description:
			'There should be a way for users to skip over things like navigation menus and go directly to the main content, especially useful for screen reader and keyboard users.',
		howToCheck:
			'1. Look for a "Skip to main content" link at the top of the page. Test whether it appears when using the Tab key.\n2. Press tab to see if the skip link is visible and functional. It should move focus to the main content when selected.',
		toolMethod: 'Manual inspection (doing)',
		whereToCheck: 'Check if there is a skip link at the top the page',
	},
	{
		criterion: '2.4.3 Focus Order',
		category: 'Operable',
		level: 'A',
		description:
			'When using the keyboard [Tab key] to navigate, the focus should move through elements in a logical order, such as left to right and top to bottom, making it easy to use and understand.',
		howToCheck:
			'1. Use the Tab key to move through the page and confirm that the focus moves in a logical order, following the visual layout of the page\n2. Ensure that as focus moves, the currently focused element is visibly highlighted.',
		toolMethod: 'Keyboard',
		whereToCheck: 'Every interactive element on the screen',
	},
	{
		criterion: '2.4.7 Focus Visible',
		category: 'Operable',
		level: 'AA',
		description:
			"While using a keyboard, it's clear where the focus is. And when a component has focus, it can still be (partially) seen, so it's not hidden by a different interface element",
		howToCheck:
			'1. Use the Tab key to navigate the site\ncheck that a visible outline or indicator shows where the focus is.\n2. Ensure that links, buttons, and form fields all display a visible focus indicator when selected via keyboard.',
		toolMethod: 'Manual inspection\n- Keyboard\n- Visually Inspect',
		whereToCheck: 'Find interactive components such as\n- Links\n- Buttons\n- Form fields',
	},
	{
		criterion: '2.4.11 Focus Not Obscured (Minimum)',
		category: 'Operable',
		level: 'AA',
		description:
			'When navigating with the keyboard, the focused element should always be fully visible and not blocked by other elements.',
		howToCheck:
			'1. Use the Tab key to navigate through all focusable elements.\nEnsure that none of the focused elements are partially or fully hidden.\n2. Make sure sticky elements like headers or footers do not block the view of the focused item.',
		toolMethod: '- Keyboard\n- Visually Inspect',
		whereToCheck:
			'- All elements that have a focus state\n- Sticky elements (e.g. headers, footers)',
	},
	{
		criterion: '2.1.1 Keyboard',
		category: 'Operable',
		level: 'A',
		description:
			'Users can use the interface with a keyboard, unless it depends on a specific path of the user input. This should not require specific timing between keystrokes and cannot trap the keyboard focus.',
		howToCheck:
			'1. Check if your able to connect a keyboard device\n2. Use the Tab key to navigate through the webpage and ensure all interactive elements (links, buttons, form fields, etc.) can be accessed and operated with a keyboard.',
		toolMethod: 'Manual Testing:\n- Keyboard',
		whereToCheck: 'Applies to whole target website/app',
	},
	{
		criterion: '2.1.2 No Keyboard Trap',
		category: 'Operable',
		level: 'A',
		description:
			'Keyboard users must be able to freely navigate without getting stuck on any element.',
		howToCheck:
			'1. Test Keyboard Navigation:\nUse the Tab key to navigate through all interactive elements (links, buttons, forms, etc.). Verify that focus moves smoothly between elements.\n2. Escape Mechanism:\nIf there are components like modals, popups, or dropdowns, make sure you can close or exit them using the keyboard (e.g., pressing Esc or Tab).',
		toolMethod: 'Manual Testing:\n- Keyboard',
		whereToCheck: 'Applies to whole target website/app',
	},
	{
		criterion: '2.1.4 Character Key Shortcuts',
		category: 'Operable',
		level: 'A',
		description:
			'Single-key shortcuts can cause problems for some users, so there should be a way to disable, remap or modify (like Ctrl or Alt) them to prevent accidental activation.',
		howToCheck:
			'Identify any single-key keyboard shortcuts and check if they can be turned off or require a modifier.',
		toolMethod: 'Manual inspection (doing)',
		whereToCheck: 'Check whole target website / app to see if any single key shortcuts are offered',
	},
	{
		criterion: '3.2.1 On Focus',
		category: 'Understandable',
		level: 'A',
		description:
			'When focussing on an interactive element (like a form field), it should not automatically trigger an action or change the page.',
		howToCheck:
			'Use the Tab key to navigate through the interactive elements (e.g., links, buttons, form fields). Confirm that focusing on these elements does not cause unexpected changes in content or behavior.',
		toolMethod: '- Keyboard (Tab key)',
		whereToCheck: 'Interactive elements such as:\n- Checkbox\n- Dropdown menu',
	},
	{
		criterion: '3.2.2 On Input',
		category: 'Understandable',
		level: 'A',
		description:
			'When interacting with an interactive element (e.g., selecting a dropdown option) should not automatically trigger changes (like submitting the form) without warning.',
		howToCheck:
			'1. Interact with form fields and check that changes to inputs (e.g., typing or selecting an option) do not cause unexpected actions.\n2. Ensure that if a change in input does trigger an action, users are warned about it beforehand.',
		toolMethod: 'Manual inspection:\n- Keyboard\n- Mouse',
		whereToCheck: 'Interactive elements such as:\n- Checkboxes\n- Radiobuttons\n- Form fields',
	},
	{
		criterion: '2.5.4 Motion Actuation',
		category: 'Operable',
		level: 'A',
		description:
			'Anything which can be achieved by moving the device, can be:\na. turned off and\nb. also be achieved through the interface. (example of playstation controller that has motion trackers or shake phone undo action)',
		howToCheck:
			'1. Identify any features triggered by motion (like shaking a device).\n2. If so, ensure that a button or other input is available to perform the same function without moving the device.',
		toolMethod: 'Manual inspection\n- Mobile or tablet devices',
		whereToCheck: 'Applies to whole target website/app',
	},
	{
		criterion: '1.3.1 Info and Relationships',
		category: 'Perceivable',
		level: 'A',
		description:
			'Use HTML elements properly (like headings, lists, tables) to ensure that content structure is understandable by assistive technologies.',
		howToCheck:
			'1. Semantic HTML: Verify that HTML elements are used correctly (e.g., headings are marked with <h1> to <h6>, lists with <ul>, <ol>, and <li>, tables with <table>, <tr>, <th>, and <td>).\n2. ARIA Landmarks: Check for ARIA landmarks to define page regions (e.g., role="main", role="banner").\n3. Form Labels: Ensure form controls have associated labels (<label> elements or aria-label attributes).',
		toolMethod: 'Browser dev. tool',
		whereToCheck: '- Heading\n- Textfield\n- Group\n- Checkbox\n- Button\n- List\n- Link',
	},
	{
		criterion: '1.1.1 Non-text Content',
		category: 'Perceivable',
		level: 'A',
		description:
			'Any image, video, audio, or other non-text elements on a webpage must have a text description that conveys the same information. This text can be read by screen readers, helping users who cannot see or hear the content understand what it is.',
		howToCheck:
			'A. Images: Check for Alt Text: Right-click on the image and select "Inspect" (or use the browser\'s developer tools). Look for the alt attribute within the img tag.\nAlt Text Quality: Ensure the alt text is descriptive and conveys the purpose of the image. For example, <img src="logo.png" alt="Company Logo">.\n\nB. Decorative Images: No Alt Text: Decorative images should have an empty alt attribute (alt=""). This indicates to screen readers that the image can be ignored.\n\nC. Complex Images (charts, infographics): Detailed Descriptions: Provide a more detailed description either in the alt attribute or in adjacent text. If using the alt attribute, it should be concise and a more thorough description should be available elsewhere on the page.\n\nD. Audio and Video: Transcripts: Ensure audio content has a text transcript available. For video content, provide captions and/or a transcript.\nDescriptive Labels: For video players, make sure buttons and controls have descriptive labels.\n\nE. Icons and Buttons: Text Labels: Icons used as buttons should have aria-labels or other text equivalents to describe their function. For example, a search icon button should have aria-label="Search".',
		toolMethod: '- Chrome plugin\n- Browser dev. tool\n- Screen reader (optional)',
		whereToCheck:
			'- Images\n- Decorative images\n- Complex images\n- Audio and video\n- Icons and buttons',
	},
	{
		criterion: '2.5.3 Label in Name',
		category: 'Operable',
		level: 'A',
		description:
			'The text a user sees on a button or link should match what assistive technologies (like screen readers) announce.',
		howToCheck:
			'1. Look at buttons, links, and form fields. Ensure that their visible labels match their underlying programmatic names.\n2. Use a screen reader to verify that the text announced matches the visible label.',
		toolMethod: 'Manual inspection (read)\n- Screen reader',
		whereToCheck:
			'Interactive elements that include a label such as:\n- Links\n- Buttons\n- Form fields\n- Checkboxes\n- Radiobuttons',
	},
	{
		criterion: '3.3.2 Labels or Instructions',
		category: 'Understandable',
		level: 'A',
		description: 'When an interface requires input, labels or instructions are shown (in text).',
		howToCheck:
			'1. Ensure all form fields have visible and clear labels explaining what input is required.\n2. Check for Placeholder Text or Instructions:\n3. Verify that instructions are provided if more detail is needed to complete a form field.',
		toolMethod: 'Manual inspection (doing)',
		whereToCheck:
			'Find interactive components that require user input such as:\n- Text fields\n- Date fields\n- Field for postalcode\n- Field for phone number\n- Search field',
	},
	{
		criterion: '4.1.2 Name, Role, Value',
		category: 'Robust',
		level: 'A',
		description:
			'All buttons, forms, and other controls should be correctly coded so that assistive technologies can recognize them and announce their purpose to users.',
		howToCheck:
			'Inspect buttons, form fields, and other interactive elements to ensure they have correct labels, roles, and values defined in the HTML.',
		toolMethod:
			'Manual inspection\n- Plugin Chrome\n- Browser dev. tool (check name, role, value)\n- Screen reader',
		whereToCheck:
			'Test every interactive components such as:\n- Buttons\n- Links\n- Lists\n- Groups\n- Radiobuttons\n- Checkboxes\n- Formfields\n- Images\n- Custom components I',
	},
	{
		criterion: '1.3.2 Meaningful Sequence',
		category: 'Perceivable',
		level: 'A',
		description:
			'The order in which content is presented on the screen should match the order in which it is read by screen readers. This helps users who rely on assistive technologies to understand the content in the intended sequence.',
		howToCheck:
			'1. Linear Navigation: Navigate through the webpage using the keyboard (e.g., Tab key) to ensure the focus moves in a logical order.\n2. Screen Readers: Use a screen reader to read through the page and verify that the reading order matches the visual order.\n3. Code Inspection: Check the HTML source code to ensure elements are arranged in a logical sequence that matches their visual presentation.',
		toolMethod:
			'Automated:\n- Use this plugin\n\nManual inspection:\n- Keyboard (e.g. tab key)\n- Screen reader\n- Browser dev. tool',
		whereToCheck: 'Full screen',
	},
	{
		criterion: '1.4.1 Use of Color',
		category: 'Perceivable',
		level: 'A',
		description:
			'Do not rely on color alone to convey important information. There should be other indicators like text labels or patterns.',
		howToCheck:
			"- Color-dependent Elements:\nReview the webpage to ensure that color is not the sole method used to convey information. For example, links should be underlined in addition to being a different color.\n- Textual or Icon Indicators: Check that information conveyed with color is also available through text or icons. For example, errors in a form should be indicated with text like 'Error' or an icon, not just a red border",
		toolMethod: 'Manual Inspection: Visually Inspect the webpage for color-dependent elements.',
		whereToCheck: '- Links\n- Errors\n- Others\n- Text\n- Icons',
	},
	{
		criterion: '1.3.3 Sensory Characteristics',
		category: 'Perceivable',
		level: 'A',
		description:
			"Instructions for using a webpage should not depend only on visual or auditory cues. For example, do not say 'click the red button' without additional context.",
		howToCheck:
			"- Instruction Text:\nReview instructions to ensure they do not rely solely on sensory information. For example, instead of 'Click the red button,' use 'Click the red button labelled Submit.'\n\n- Alternative Descriptions:\nEnsure alternative text or instructions are provided for any elements that rely on sensory characteristics.",
		toolMethod: 'Manual Inspection',
		whereToCheck: 'Full screen',
	},
	{
		criterion: '1.3.5 Identify Input Purpose',
		category: 'Perceivable',
		level: 'AA',
		description:
			'Input fields (like name, email, address) should have clear labels and purpose identifiers so that browsers and assistive technologies can understand and autofill them correctly.',
		howToCheck:
			'- Input Field Labels: Ensure each input field has a clear and descriptive label.\n- Auto complete: Check if autocomplete suggestion is provided',
		toolMethod: 'Manual inspection (doing)',
		whereToCheck: 'Forms and input fields',
	},
	{
		criterion: '3.3.7 Redundant Entry',
		category: 'Understandable',
		level: 'A',
		description:
			'Users should not have to enter the same information multiple times on a website unless needed.',
		howToCheck:
			'Check forms and other input areas to ensure that users are not required to re-enter information they have already provided.',
		toolMethod: 'Manual Inspection (doing)',
		whereToCheck:
			'Look for situations such as:\n- Entering a billing and a delivery address\n- Show previously search term in search',
	},
	{
		criterion: '3.3.8 Accessible Authentication (Minimum)',
		category: 'Understandable',
		level: 'AA',
		description:
			'Authentication does not require cognitive function, such as remembering a password (the user needs the option to autofill/paste it from a password manager).',
		howToCheck:
			'1. Check if authentication methods do not rely solely on memory or cognitive skills.\n2. Check if alternative authentication options (e.g., password managers) are available.',
		toolMethod: 'Manual Inspection (doing)',
		whereToCheck: 'Login & authentication',
	},
	{
		criterion: '3.3.3 Error Suggestion',
		category: 'Understandable',
		level: 'AA',
		description:
			"If users make a mistake (like entering an invalid email), the error message should suggest how to fix it (e.g., 'Please enter a valid email address').",
		howToCheck:
			'Intentionally make an error in a form and check if the error message suggests how to fix it.',
		toolMethod: 'Manual Inspection (doing)',
		whereToCheck:
			'Find interactive components that require user input such as:\n- Text fields\n- Date fields\n- Field for postalcode\n- Field for phone number\n- Search field',
	},
	{
		criterion: '3.3.1 Error Identification',
		category: 'Understandable',
		level: 'A',
		description:
			'If there is an error (e.g. when filling out a form), users should be told exactly what went wrong and how to fix it.',
		howToCheck:
			'1. Intentionally make an error in a form (e.g., leave a required field empty) and check whether the error is clearly indicated.\n2. Ensure that error messages explain both the problem and how to correct it.',
		toolMethod: 'Manual Inspection (doing)',
		whereToCheck:
			'Look for situations where an error can happen such as:\n- Fill in and submit a form\n- Empty state\n- Situations (e.g. no internet connection)',
	},
	{
		criterion: '3.3.4 Error Prevention (Legal, Financial, Data)',
		category: 'Understandable',
		level: 'AA',
		description:
			'For critical actions (like signing contracts or making purchases), users should have the chance to review their input and confirm it before the action is completed.',
		howToCheck:
			'Verify that users are given a chance to review and confirm their inputs before submitting important information (e.g., legal, financial, or personal data).',
		toolMethod: 'Manual Inspection (doing)',
		whereToCheck:
			'Look for features that involve critical actions such as:\n- Payment flows\n- Look for situations such as:\n- When entering a form field incorrectly\n- When showning search results\n- When showing a status message (e.g. processing)\n- When showing a confirmation',
	},
	{
		criterion: '4.1.3 Status Messages',
		category: 'Robust',
		level: 'AA',
		description:
			'Users should be notified of important status messages (like a form submission confirmation) in a way that is easy to understand and accessible.',
		howToCheck:
			'Trigger status messages (e.g., submit a form or trigger an error) and verify that they are clearly visible and announced by assistive technologies.',
		toolMethod: 'Manual inspection (doing)\n- Screen reader',
		whereToCheck:
			'Look for situations such as:\n- When entering a form field incorrectly\n- When showing search results\n- When showing a status message (e.g. processing)\n- When showing a confirmation',
	},
	{
		criterion: '2.4.4 Link Purpose (In Context)',
		category: 'Operable',
		level: 'A',
		description:
			"Each link's purpose should be clear from either the link text or the context around it, so users know what will happen when they click.",
		howToCheck:
			"1. Review the link text to ensure it's descriptive enough (e.g., 'Learn more about our services' instead of just 'Learn more')\n2. If the link text is ambiguous, check if the surrounding content makes its purpose clear",
		toolMethod: '- Manually (read)\n- Screen reader',
		whereToCheck: 'Every interactive element on the screen',
	},
	{
		criterion: '2.4.6 Headings and Labels',
		category: 'Operable',
		level: 'AA',
		description:
			'Headings should describe the sections of content, and labels should clearly explain form fields or interactive elements.',
		howToCheck:
			'1. Check for Descriptive Headings:\nReview headings throughout the page to ensure they accurately describe the content that follows.\n\n2. Check Form Labels:\nInspect form fields and interactive elements to confirm they have descriptive labels that explain their purpose.',
		toolMethod: 'Manual inspection (read)',
		whereToCheck: '- Headings\n- Form labels',
	},
	{
		criterion: '3.2.4 Consistent Identification',
		category: 'Understandable',
		level: 'AA',
		description:
			'Similar buttons or functions should look and behave the same on all pages of the site.',
		howToCheck:
			'Compare similar functions (e.g., submit buttons or links) across different pages to ensure they have consistent labels and behaviors.',
		toolMethod: 'Visually Inspect',
		whereToCheck:
			'Across the whole website/app (or multiple screens). Look for interactive elements such as:\n- Buttons\n- Links\n- Icons\n- Custom components',
	},
	{
		criterion: '1.4.5 Images of Text',
		category: 'Perceivable',
		level: 'AA',
		description:
			'Avoid using images to display text. Use actual text instead, unless the image of text is essential for presentation.',
		howToCheck:
			'Review the webpage for images of text and assess if they can be replaced with actual text.',
		toolMethod: 'Manual Inspection (Visually Inspect)',
		whereToCheck: 'Images of text',
	},
	{
		criterion: '1.4.4 Resize Text',
		category: 'Perceivable',
		level: 'AA',
		description:
			'Users should be able to enlarge text up to twice its original size without issues in readability or functionality.',
		howToCheck:
			'Use browser zoom to increase text size up to 200% and verify that the content remains readable and functional.\nNo overlapping or cut-off content at 200% zoom.',
		toolMethod: 'Browser: Increase the fontsize of the browser',
		whereToCheck: 'Full screen',
	},
	{
		criterion: '1.4.12 Text Spacing',
		category: 'Perceivable',
		level: 'AA',
		description:
			'Text should remain legible and functional even when spacing between characters, lines, words, or paragraphs is increased.',
		howToCheck:
			'1. Apply these settings:\n- Line height to at least 1.5 times the font size.\n- Paragraph spacing to at least 2 times the font size.\n- Letter spacing to at least 0.12 times the font size.\n- Word spacing to at least 0.16 times the font size.\n2. Ensure text does not overlap or get cut off and remains readable and functional with the new spacing.',
		toolMethod: 'Use this plugin',
		whereToCheck: 'All text on the screen',
	},
].sort(compareCriteria)

export default function WCAGCriteriaPage() {
	const [clientName, setClientName] = useState('')
	const [clientId, setClientId] = useState('')
	const [observations, setObservations] = useState({})
	const [dateCreated, setDateCreated] = useState(new Date().toISOString())
	const [showPreview, setShowPreview] = useState(false)
	const [previewData, setPreviewData] = useState(null)
	const [executiveSummary, setExecutiveSummary] = useState('')
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

	// Load saved data from localStorage on component mount
	useEffect(() => {
		const savedData = localStorage.getItem('inDepthTestsAuditData')
		if (savedData) {
			const { clientName, clientId, observations, dateCreated, executiveSummary, completedItems } =
				JSON.parse(savedData)
			setObservations(observations || {})
			setDateCreated(dateCreated || new Date().toISOString())
			setExecutiveSummary(executiveSummary || '')
			setClientName(clientName || '')
			setClientId(clientId || '')
			setCompletedItems(completedItems || {})
		}
	}, [])

	// Save data to localStorage whenever it changes
	useEffect(() => {
		const auditData = {
			clientName,
			clientId,
			observations,
			dateCreated,
			executiveSummary,
			completedItems,
		}
		localStorage.setItem('inDepthTestsAuditData', JSON.stringify(auditData))
	}, [observations, dateCreated, executiveSummary, clientName, clientId, completedItems])

	const handleObservationChange = (criterion, value) => {
		setObservations((prev) => ({
			...prev,
			[criterion]: value,
		}))
	}

	const handleExport = () => {
		// Filter out empty observations and create the observations array
		const observationsWithDetails = Object.entries(observations)
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
			localStorage.removeItem('inDepthTestsAuditData')
			setObservations({})
			setDateCreated(new Date().toISOString())
			setExecutiveSummary('')
			setClientName('')
			setClientId('')
			setCompletedItems({})
		}
	}

	const toggleSection = (section) => {
		setExpandedSections((prev) => ({
			...prev,
			[section]: !prev[section],
		}))
	}

	const toggleCompleted = (checkId) => {
		setCompletedItems((prev) => ({
			...prev,
			[checkId]: !prev[checkId],
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

	return (
		<main className='flex flex-1 flex-col'>
			<Hero
				title='In-Depth Accessibility Tests'
				description='A comprehensive guide for conducting thorough accessibility testing'
			/>
			<div className='container mx-auto p-4'>
				<Instructions />
			</div>
			<div className='container mx-auto p-4'>
				<div className='mb-6 flex flex-col gap-4 '>
					<div className='py-6'>
						<Card>
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
															onClick={() => toggleSection('testResults')}
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
																	<p className='text-sm font-bold py-2 text-purple-500'>
																		Click to expand the audit table
																	</p>
																	<span
																		className={`transform transition-transform text-purple-500 cursor-pointer ${
																			expandedSections.testResults ? 'rotate-90' : ''
																		}`}>
																		▶
																	</span>
																</div>
															</div>
														</button>
														{expandedSections.testResults && (
															<div className='mt-4'>
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
																						completedItems[criterion.criterion] ? 'bg-gray-100' : ''
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
																										completedItems[criterion.criterion] || false
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
																							value={observations[criterion.criterion] || ''}
																							onChange={(e) =>
																								handleObservationChange(
																									criterion.criterion,
																									e.target.value
																								)
																							}
																							className='w-full p-2 border rounded-md focus:ring-2 focus:ring-ring focus:border-ring min-h-[100px] bg-background text-foreground'
																							placeholder='Enter observations...'
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
												feature will be AI-powered in the future)
											</p>
										</CardHeader>
										<CardContent>
											<Textarea
												value={executiveSummary}
												onChange={(e) => setExecutiveSummary(e.target.value)}
												className='min-h-[150px]'
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
			</div>
		</main>
	)
}
