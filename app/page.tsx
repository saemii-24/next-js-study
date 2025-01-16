import TouchClick from '@/components/TouchClick';

export const metadata = {
	title: 'Touch vs Click',
};

export default function Page() {
	return (
		<div>
			<h1 className='text-2xl font-semibold'>이벤트 비교</h1>
			<TouchClick />
		</div>
	);
}
