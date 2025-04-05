import { use } from 'react';

type Product = {
  id: number;
  title: string;
};


async function getProducts() {
  const res = await fetch('https://dummyjson.com/products');
  if (!res.ok) throw new Error('Fetch 실패');
  return res.json();
}

//TODO
// 작은 element 여러개 만들어서 병렬로딩 시도 하여 loading.tsx랑 error.tsx 배제하고
// susepsne랑 errorboundary 써서 실험

export default function Page() {
  const { products }: { products: Product[] } = use(getProducts());

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {product.id}: {product.title}
        </li>
      ))}
    </ul>
  );
}
