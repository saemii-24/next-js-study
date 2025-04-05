'use client';

import { useEffect, useState } from 'react';

type Product = {
  id: string;
  title: string;
};

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => {
        if (!res.ok) throw new Error('Fetch error');
        return res.json();
      })
      .then((data) => setProducts(data.products))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {error}</p>;

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
