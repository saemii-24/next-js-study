// import Child from './_components/Child';
// import Child2 from './_components/Child2';
// import Parent from './_components/Parent';

// export default function Clone() {
// 	return (
// 		<Parent>
// 			<Child />
// 			<Child2 num={3} />
// 		</Parent>
// 	);
// }
'use client';

export default function Clone({propTest}: {propTest?: string}) {
	return (
		<div>
			<div>layout.tsx에서 받은 값:{propTest}</div>
		</div>
	);
}
