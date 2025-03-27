import Link from 'next/link'
import { Button } from '@/components/ui/button'
import NavigationTabs from './NavigationTabs'
export default function Hero({ title, description }) {
	return (
		<section className='border-b'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex flex-col items-start gap-2 py-8 md:py-10 lg:py-12'>
				<h1 className='text-2xl font-bold leading-tight tracking-tighter sm:text-3xl md:text-4xl lg:leading-[1.1]'>
					{title}
				</h1>
				<p className='max-w-2xl text-base font-light text-muted-foreground sm:text-lg'>
					{description}
				</p>
				<Button asChild className='mb-4 hover:cursor-pointer'>
					<Link href='/'>← Back to Home</Link>
				</Button>
			</div>
			<NavigationTabs />
		</section>
	)
}
