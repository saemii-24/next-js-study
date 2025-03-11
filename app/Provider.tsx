'use client';

import {ReactNode, useEffect, useState} from 'react';
import './globals.css';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

interface ProviderProps {
	children: ReactNode;
}
const queryClient = new QueryClient();
export default function Provider({children}: ProviderProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<MSWComponent>{children}</MSWComponent>
		</QueryClientProvider>
	);
}

export const MSWComponent = ({children}: {children: React.ReactNode}) => {
	const [mswReady, setMswReady] = useState(false);

	useEffect(() => {
		const init = async () => {
			const {initMsw} = await import('__mocks__');
			await initMsw();
			setMswReady(true);
		};

		if (!mswReady) {
			init();
		}
	}, [mswReady]);

	if (!mswReady) return null;

	return <>{children}</>;
};
