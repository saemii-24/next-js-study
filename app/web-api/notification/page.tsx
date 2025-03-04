'use client';
import Container from '@/components/Container';
import React from 'react';

export default function NotificationPage() {
	const sendNotification = () => {
		// 브라우저가 Notification API를 지원하는지 확인
		if (!('Notification' in window)) {
			alert('해당 브라우저는 알림을 지원하지 않습니다!!');
			return;
		}

		// 알림 권한이 이미 허용된 경우
		if (window.Notification.permission === 'granted') {
			//title
			new window.Notification('반가워요 사용자님!', {
				body: '알림 권한이 허용되어, 새로운 메시지가 도착했습니다.', //message
			});
		}
		// 알림 권한이 아직 요청되지 않은 경우
		else if (window.Notification.permission !== 'denied') {
			//먼저 권한을 요청한다.
			window.Notification.requestPermission().then((permission) => {
				//title
				if (permission === 'granted') {
					new window.Notification('반가워요 사용자님!', {
						body: '알림 권한이 허용되어, 새로운 메시지가 도착했습니다.', //message
					});
				}
			});
		}
	};

	return (
		<Container>
			<Container.Title>Notification</Container.Title>
			<p className='mb-4'>알림은 PC에서만 작동합니다!</p>
			<p>
				버튼을 눌러 사용자에게
				<br />
				알림을 보내보세요!
			</p>
			<button
				className='bg-blue-500 text-white px-4 py-1 rounded-md mt-4 cursor-pointer transition hover:bg-blue-500/60'
				onClick={sendNotification}>
				알림
			</button>
		</Container>
	);
}
