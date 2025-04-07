'use client';

import {createContext, useState} from 'react';

type Theme = 'dark' | 'light';

type ThemeContextType = {
	theme: Theme;
	toggleTheme: () => void;
};

const defaultContext: ThemeContextType = {
	theme: 'dark',
	toggleTheme: () => {},
};

export const ThemeContext = createContext<ThemeContextType>(defaultContext);

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
	const [theme, setTheme] = useState<Theme>('dark');

	const toggleTheme = () => {
		setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
	};

	return (
		<ThemeContext.Provider value={{theme, toggleTheme}}>
			{children}
		</ThemeContext.Provider>
	);
};
