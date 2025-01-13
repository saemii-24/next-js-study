import TouchClick from '@/components/TouchClick';

export const metadata = {
	title: 'Touch vs Click',
};

export default function Page() {
	return (
		<h1 className='bg-red-50 text-red-800'>
			버튼
			<TouchClick />
		</h1>
	);
}
