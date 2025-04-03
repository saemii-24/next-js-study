import React from 'react';

type Product = {
	id: string;
	title: string;
};

export default async function SSG() {
	const res = await fetch('https://dummyjson.com/products', {
		cache: 'force-cache',
	});
	const data = await res.json();

	return (
		<>
			<h3>SSG 페이지</h3>
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
