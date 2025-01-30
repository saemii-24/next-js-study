import React from 'react';

const Gradient = () => {
	return (
		<div className=' w-full p-6'>
			<h1 className='text-2xl font-semibold'>그라디언트</h1>
			<h2 className='text-xl font-semibold mt-5'>각도</h2>
			<div className='**:w-20 **:h-20 **:rounded-sm **:text-white **:via-purple-500 **:to-pink-500 **:from-indigo-500 space-y-2'>
				<div className='bg-linear-45'>45</div>
				<div className='bg-linear-90'>90</div>
				<div className='bg-linear-180'>180</div>
				<div className='bg-linear-[190deg]'>222</div>
				<div className='bg-linear-270'>270</div>
			</div>
			<h2 className='text-xl font-semibold mt-5'>색상</h2>
			<div className='**:size-20 **:rounded-sm **via-purple-500 **:to-pink-500 **:from-indigo-500 space-y-2  **:text-white'>
				<div className='bg-linear-to-r/srgb'>srgb</div>
				<div className='bg-linear-to-r/oklch'>oklch</div>
			</div>
			<h2 className='text-xl font-semibold mt-5'>원뿔형</h2>
			<div className='size-20 rounded-sm bg-conic/[in_hsl_longer_hue] from-red-600 to-red-600'>
				원뿔
			</div>
			<h2 className='text-xl font-semibold mt-5'>방사형</h2>
			<div className='size-20 rounded-full bg-radial-[at_25%_25%] from-white to-zinc-900 to-75%'>
				방사
			</div>
		</div>
	);
};

export default Gradient;
