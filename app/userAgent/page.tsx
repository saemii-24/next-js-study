import {NextRequest, userAgent} from 'next/server';

export default function UserAgent(request: NextRequest) {
	const {device} = userAgent(request);
	const viewport = device.type === 'mobile' ? 'mobile' : 'desktop';
	console.log(viewport);
	return <div>userAgent</div>;
}
