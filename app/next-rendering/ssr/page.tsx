import {use} from 'react';

async function fetchProducts() {
	const res = await fetch('https://dummyjson.com/products', {
		cache: 'no-store', // 매 요청마다 새로운 데이터 가져옴
	});
	return res.json();
}

export default function SSR() {
	const data = use(fetchProducts());

	return (
		<>
			<h3>SSR 페이지</h3>
			<ul>
				{data.products.map((product: {id: string; title: string}) => (
					<li key={product.id}>
						{product.id}: {product.title}
					</li>
				))}
			</ul>
		</>
	);
}
