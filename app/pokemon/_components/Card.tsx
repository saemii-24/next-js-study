'use client';

import * as React from 'react';
import Link from 'next/link';

export interface CardBadge {
	label: string;
	color?: string;
}

interface CardProps {
	href?: string;
	title: React.ReactNode;
	description?: React.ReactNode;
	topBadges?: CardBadge[];
	categories?: string[];
	className?: string;
}

const gradientForColor = (color?: string): [string, string] => {
	switch (color) {
		case 'blue':
			return ['#60A5FA', '#BFDBFE'];
		case 'green':
			return ['#10B981', '#D1FAE5'];
		case 'yellow':
			return ['#F59E0B', '#FEF3C7'];
		case 'red':
			return ['#F87171', '#966969'];
		case 'orange':
			return ['#FB923C', '#FED7AA'];
		case 'gray':
			return ['#D1D5DB', '#F3F4F6'];
		default:
			return ['#6366F1', '#F0EBFF'];
	}
};

const Card: React.FC<CardProps> = ({
	href = '#',
	title,
	description,
	topBadges = [],
	categories = [],
	className = '',
}) => {
	const primaryBadgeColor =
		topBadges && topBadges.length > 0 ? topBadges[0].color : undefined;
	const [fromHex, toHex] = gradientForColor(primaryBadgeColor);

	return (
		<article
			className={`relative center-flex overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm ${className}`}>
			<div
				aria-hidden
				className='pointer-events-none absolute -left-6 -top-6 h-36 w-48 -rotate-6 rounded-2xl opacity-5 blur-xl'
				style={{
					backgroundImage: `linear-gradient(135deg, ${fromHex}, ${toHex})`,
				}}
			/>

			<div className='flex flex-col items-start justify-between gap-4'>
				<div className='flex-1'>
					{topBadges.length > 0 && (
						<div className='flex flex-wrap gap-2 items-center justify-center'>
							{topBadges.map((b, i) => (
								<span
									key={`${b.label}-${i}`}
									className='inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium text-white'
									style={{
										backgroundImage: `linear-gradient(90deg, ${gradientForColor(b.color)[0]}, ${gradientForColor(b.color)[1]})`,
									}}>
									{b.label}
								</span>
							))}
						</div>
					)}

					<h3 className='mt-3 text-lg font-semibold leading-tight text-center text-gray-900'>
						{title}
					</h3>

					{description && (
						<p className='mt-2 text-sm text-gray-500'>{description}</p>
					)}

					{categories.length > 0 && (
						<div className='mt-4 flex flex-wrap gap-2 items-center justify-center'>
							{categories.map((c, i) => (
								<span
									key={`${c}-${i}`}
									className='inline-flex items-center gap-2 rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700'>
									{c}
								</span>
							))}
						</div>
					)}
				</div>

				<div className='hidden w-full md:block'>
					<Link
						href={href}
						className='inline-flex w-full items-center justify-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white'>
						상세 보기
					</Link>
				</div>
			</div>

			<div className='mt-5 flex items-center justify-between gap-4 md:hidden'>
				<div className='w-full md:hidden'>
					<Link
						href={href}
						className='inline-flex w-full items-center justify-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white'>
						상세 보기
					</Link>
				</div>
			</div>
		</article>
	);
};

Card.displayName = 'Card';

export default Card;
