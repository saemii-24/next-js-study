import { use } from 'react';
import { Suspense } from 'react';

type Product = {
  id: number;
  title: string;
};

export async function getProduct(id: number, delay = 0) {
    await new Promise((res) => setTimeout(res, delay));
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    if (!res.ok) throw new Error(`상품 ${id} 로딩 실패`);
    return res.json();
  }



export function ProductItemUse({ id, delay }: { id: number; delay?: number }) {
    console.log(`🕒 ProductItemUse ${id} 시작`);
    const product = use(getProduct(id, delay));
     console.log(`✅ ProductItemUse ${id} 렌더링됨`);
  return <li>{product.id}: {product.title}</li>;
}


// app/use-page.tsx
export default function Page() {
    return (
      <ul>
        <Suspense fallback={<li>⌛ 첫 번째 로딩 중...</li>}>
          <ProductItemUse id={1} delay={2000} />
        </Suspense>
        <Suspense fallback={<li>⌛ 두 번째 로딩 중...</li>}>
          <ProductItemUse id={2} delay={1000} />
        </Suspense>
        <Suspense fallback={<li>⌛ 세 번째 로딩 중...</li>}>
          <ProductItemUse id={3} delay={3000} />
        </Suspense>
      </ul>
    );
  }
  

// async function getProducts() {
//   const res = await fetch('https://dummyjson.com/products');
//   if (!res.ok) throw new Error('Fetch 실패');
//   return res.json();
// }

// //TODO
// // 작은 element 여러개 만들어서 병렬로딩 시도 하여 loading.tsx랑 error.tsx 배제하고
// // susepsne랑 errorboundary 써서 실험

// export default function Page() {
//   const { products }: { products: Product[] } = use(getProducts());

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


