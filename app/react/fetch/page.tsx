import { Suspense } from "react";

type Product = {
  id: number;
  title: string;
};


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


// async function getProducts(): Promise<Product[]> {
//   const res = await fetch('https://dummyjson.com/products', {
//     cache: 'no-store',
//   });
//   if (!res.ok) throw new Error('Fetch 실패');
//   const data = await res.json();
//   return data.products;
// }

// export default async function Page() {
//   const products = await getProducts();

//   return (
//     <ul>
//       {products.map((product) => (
//         <li key={product.id}>
//           {product.id}: {product.title}
//         </li>
//       ))}
//     </ul>
//   );
// }


export async function getProduct(id: number, delay = 0) {
  await new Promise((res) => setTimeout(res, delay));
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) throw new Error(`상품 ${id} 로딩 실패`);
  return res.json();
}

export async function ProductItemAwait({ id, delay }: { id: number; delay?: number }) {
  console.log(`🕒 ProductItemAwait ${id} 시작`);
  const product = await getProduct(id, delay);
  console.log(`✅ ProductItemAwait ${id} 완료`);
  return <li>{product.id}: {product.title}</li>;
}


export default function Page() {
  return (
    <ul>
      <Suspense fallback={<li>⌛ 첫 번째 로딩 중...</li>}>
        <ProductItemAwait id={1} delay={2000} />
      </Suspense>

      <Suspense fallback={<li>⌛ 두 번째 로딩 중...</li>}>
        <ProductItemAwait id={2} delay={1000} /> 
      </Suspense>

      <Suspense fallback={<li>⌛ 세 번째 로딩 중...</li>}>
        <ProductItemAwait id={3} delay={2000}/>
      </Suspense>
    </ul>
  );
}