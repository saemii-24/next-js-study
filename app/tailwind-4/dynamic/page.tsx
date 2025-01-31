import Container from '@/components/Container';

export default function Dynamic() {
	return (
		<Container>
			<Container.Title>Dynamic Utility</Container.Title>
			<div className='grid grid-cols-15 gap-2 **:size-4 **:text-xs **:text-white **:bg-blue-500'>
				{Array.from({length: 30}).map((_, index) => (
					<div key={index}>{index + 1}</div>
				))}
			</div>
			<div className='mt-11 grid grid-cols-17 gap-2 **:size-4 **:text-xs **:text-white **:bg-red-500'>
				{Array.from({length: 30}).map((_, index) => (
					<div key={index}>{index + 1}</div>
				))}
			</div>
			<div className='mt-13 grid grid-cols-11 gap-2 **:size-4 **:text-xs **:text-white **:bg-green-500'>
				{Array.from({length: 30}).map((_, index) => (
					<div key={index}>{index + 1}</div>
				))}
			</div>
		</Container>
	);
}
