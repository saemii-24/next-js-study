'use client';

import { useEffect, useState } from 'react';

type Product = {
  id: string;
  title: string;
};

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetch('https://dummyjson.com/products/invalide-url')
      .then((res) => {
        if (!res.ok) throw new Error('Fetch error');
        return res.json();
      })
      .then((data) => setProducts(data.products))
  }, []);

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
