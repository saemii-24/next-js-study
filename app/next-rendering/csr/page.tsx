'use client';

import {useEffect, useState} from 'react';

type Product = {
	id: string;
	title: string;
};

export default function CSR() {
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch('https://dummyjson.com/products');
			const data = await res.json();
			setProducts(data.products);
		};

		fetchData();
	}, []);

	return (
		<>
			<h3>CSR 페이지</h3>
			<ul>
				{products.map((product) => (
					<li key={product.id}>
						{product.id}: {product.title}
					</li>
				))}
			</ul>
		</>
	);
}
