import Container from '@/components/Container';
import Image from 'next/image';

const hutaba = [
	{
		name: '짱구',
		birth: '5월 5일',
		src: 'https://i.namu.wiki/i/Qr8iS3L1fV9Guwm_3ZRDIX9tRzky5xaVB6IUYIsvxW4PlraMdtDUkwS_yaSpRUQXVcvV4WyZMVe_BdjLYFUQiGznXa3W0cNC8h09W3QJQen8A3X3-uBxXXnu9dQJSSK_5t6VRsnfB-MaOS_U4zp0Mg.webp',
	},
	{
		name: '유리',
		birth: '6월 5일',
		src: 'https://i.namu.wiki/i/uN7rR35ADyzooF0T5yX2wu18AzhOOMdlTmL4hcg13jefxuIG9AGraRJJquwxSymOmgRXJLwbd1kBElf1JC_E-64gcI35ACJY2VY5bkOnj3X6wj7eLq2tSdEDmVzuCIHxJji8RchcaXO0qwwqBIaZYg.webp',
	},
	{
		name: '훈이',
		birth: '2월 4일',
		src: 'https://i.namu.wiki/i/7mL_wZVw_9iutzV2Vr12Ht8mS8XlF0zTrIANwMAjMlFqLsMdjQt-wT34kUJ8z-IRR3sRM8ZH08FzXEpV5Iqt-PJ6jdc6JgAKLZNb_CJDYu2jY_yL-Xt3MDS3YAHkGx1qaTNoLeuU7KYJltFwF7f7Rg.webp',
	},
	{
		name: '철수',
		birth: '7월 19일',
		src: 'https://i.namu.wiki/i/ot0CtqIq2F9M9_apD8NoNPEsRGffimhjtb0qhJU-QzZBYuRMFasOF5AxEhrx_b57Tb5e9KCko6HUBvbe6nFEN3swqPNBLYwJsXP4C0DiSAecu1YRt2CvdOh7SyI3touTO51AAJWCQnWoXvYfbVJc2g.webp',
	},
	{
		name: '맹구',
		birth: '9월 10일',
		src: 'https://i.namu.wiki/i/HqHoIIFP-3ouk6ypCStTcFeWE0NCfKlqKvBdLBPBb5YoJebLCxvMAyNGTmUHUCS17GiafKDt73fN1jkx9pnsnvdE89PfxSXRlKneA1idTO6f-56APQDubTbKqLf5GsJ5GJyCOamvMDO9ILcQyT5HXg.webp',
	},
];

export default function Children() {
	return (
		<Container>
			<Container.Title>자식요소</Container.Title>
			<Container.SubTitle>직계</Container.SubTitle>
			<div className='mt-3'>
				<ul className='flex gap-2 *:rounded-full *:border *:border-sky-100 *:bg-sky-50 *:px-2 *:py-0.5 *:text-sky-500'>
					{hutaba.map((item, index) => {
						return <li key={item.name}>{item.name}</li>;
					})}
				</ul>
			</div>
			<Container.SubTitle>모든 자손</Container.SubTitle>
			<ul className='**:data-avatar:size-12 **:data-avatar:rounded-full **:data-birth:text-gray-500 **:data-birth:text-xs **:text-sky-500 space-y-2 mt-3'>
				{hutaba.map((item, index) => {
					return (
						<li key={item.name} className='flex items-center gap-4'>
							<div data-avatar className='border overflow-hidden'>
								<Image
									src={item.src}
									alt={item.name}
									width={100}
									height={100}
								/>
							</div>
							<div>
								<p>{item.name}</p>
								<p data-birth className=''>
									{item.birth}
								</p>
							</div>
						</li>
					);
				})}
			</ul>
		</Container>
	);
}
