// type Product = {
//   id: number;
//   title: string;
// };

// export default async function Page() {
//   const res = await fetch('https://dummyjson.com/products',{
//     cache: 'no-store'
//   });
//   if (!res.ok) throw new Error('Fetch 실패');
//   const data = await res.json();

//   return (
//     <ul>
//       {data.products.map((product: Product) => (
//         <li key={product.id}>
//           {product.id}: {product.title}
//         </li>
//       ))}
//     </ul>
//   );
// }

type Product = {
  id: number;
  title: string;
};

async function getProducts(): Promise<Product[]> {
  const res = await fetch('https://dummyjson.com/products', {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Fetch 실패');
  const data = await res.json();
  return data.products;
}

export default async function Page() {
  const products = await getProducts();

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
