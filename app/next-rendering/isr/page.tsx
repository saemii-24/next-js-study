import React from 'react';

type Product = {
	id: string;
	title: string;
};

export default async function ISR() {
	const res = await fetch('https://dummyjson.com/products', {
		next: {
			revalidate: 30,
		},
	});
	const data = await res.json();

	return (
		<>
			<h3>ISR 페이지</h3>
			<ul>
				{data.products.map((product: Product) => (
					<li key={product.id}>
						{product.id}: {product.title}
					</li>
				))}
			</ul>
		</>
	);
}
