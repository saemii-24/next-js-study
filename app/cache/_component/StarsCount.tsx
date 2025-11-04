'use cache';
import React from 'react';
import {cacheLife} from 'next/cache';

type StarResponse = number | {count: number} | null;

export default async function StarsCount() {
	cacheLife('hours');
	await new Promise((resolve) => setTimeout(resolve, 1200));

	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
	let stars: number | null = null;

	try {
		const res = await fetch(`${baseUrl}/api/category/star`);
		if (!res.ok)
			throw new Error(`Failed to fetch stars (status ${res.status})`);
		const json: StarResponse = await res.json();
		stars =
			typeof json === 'number'
				? json
				: json && typeof json === 'object'
					? json.count
					: null;
	} catch (e) {
		stars = null;
	}

	return (
		<span className='text-muted-foreground w-12 text-xs tabular-nums retro mt-0.5'>
			{stars == null
				? '--'
				: stars >= 1000
					? `${(stars / 1000).toFixed(1)}K`
					: stars.toLocaleString()}
		</span>
	);
}
