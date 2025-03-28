'use client'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useRouter, usePathname } from 'next/navigation'

export default function NavigationTabs() {
	const router = useRouter()
	const pathname = usePathname()

	// Function to determine the active tab based on the current path
	const getActiveTab = (path) => {
		switch (path) {
			case '/':
				return 'instructions'
			case '/basic-tests':
				return 'basic'
			case '/in-depth-tests':
				return 'in-depth'
			case '/test-tools':
				return 'tools'
			case '/useful-info':
				return 'useful-info'
			default:
				return 'instructions'
		}
	}

	return (
		<main>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-4'>
				<Tabs value={getActiveTab(pathname)} className='w-full'>
					<TabsList className='flex h-9 items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground w-fit'>
						<TabsTrigger
							value='instructions'
							className='rounded-md px-3 hover:cursor-pointer'
							onClick={() => router.push('/')}>
							Instructions
						</TabsTrigger>
						<TabsTrigger
							value='basic'
							className='rounded-md px-3 hover:cursor-pointer'
							onClick={() => router.push('/basic-tests')}>
							Basic Tests
						</TabsTrigger>
						<TabsTrigger
							value='in-depth'
							className='rounded-md px-3 hover:cursor-pointer'
							onClick={() => router.push('/in-depth-tests')}>
							In-Depth Tests
						</TabsTrigger>
						<TabsTrigger
							value='tools'
							className='rounded-md px-3 hover:cursor-pointer'
							onClick={() => router.push('/test-tools')}>
							Testing Tools
						</TabsTrigger>
						<TabsTrigger
							value='useful-info'
							className='rounded-md px-3 hover:cursor-pointer'
							onClick={() => router.push('/useful-info')}>
							Useful Info
						</TabsTrigger>
					</TabsList>
				</Tabs>
			</div>
		</main>
	)
}
