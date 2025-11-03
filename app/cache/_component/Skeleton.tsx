export default function CategoriesSkeleton() {
	return (
		<section className='bg-black text-white min-w-2/3'>
			<div className='max-w-6xl mx-auto'>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
					{Array.from({length: 3}).map((_, i) => (
						<div
							key={i}
							className='bg-neutral-900 rounded-2xl overflow-hidden animate-pulse'>
							<div className='aspect-[4/3] bg-neutral-800' />
							<div className='p-4 space-y-3'>
								<div className='h-5 w-3/4 rounded bg-neutral-800' />
								<div className='h-4 w-1/2 rounded bg-neutral-800' />
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
