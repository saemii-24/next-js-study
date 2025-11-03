import Image from 'next/image';

export default async function Categories() {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

	await new Promise((resolve) => setTimeout(resolve, 2000));

	const data = await fetch(`${baseUrl}/api/category`, {cache: 'force-cache'});
	const categories = await data.json();

	return (
		<section className='bg-black text-white min-w-2/3'>
			<div className='max-w-6xl mx-auto'>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
					{categories.map((category: any) => (
						<div
							key={category.id}
							className='bg-neutral-900 rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform'>
							<div className='aspect-[4/3] relative'>
								<Image
									src={category.image}
									alt={category.name}
									fill
									className='object-cover'
								/>
							</div>
							<div className='p-4'>
								<h3 className='text-lg font-semibold mb-2'>{category.name}</h3>
								<a
									href='#'
									className='inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors'>
									Read more
									<span className='text-lg'>→</span>
								</a>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
