type Props = {
	name: string;
	date: string;
};

export default function InvoicePdf({name, date}: Props) {
	return (
		<div
			id='pdf-content'
			className='mx-auto w-[794px] min-h-[1123px] bg-white px-12 py-12 text-gray-900 box-border'>
			{/* Header */}
			<div className='mb-8 flex items-start justify-between border-b-2 border-gray-900 pb-5'>
				<div>
					<h1 className='text-3xl font-bold tracking-wide'>INVOICE</h1>
					<p className='mt-2 text-sm text-gray-500'>Simple billing document</p>
				</div>

				<div className='text-right text-sm leading-7 text-gray-700'>
					<div>
						<span className='font-semibold text-gray-900'>Invoice No.</span>{' '}
						INV-2026-0317
					</div>
					<div>
						<span className='font-semibold text-gray-900'>Date</span> {date}
					</div>
				</div>
			</div>

			{/* Info */}
			<div className='mb-8 grid grid-cols-2 gap-4'>
				<div className='rounded-2xl border border-gray-200 bg-gray-50 p-5'>
					<div className='mb-2 text-xs font-bold tracking-[0.16em] text-gray-500'>
						BILLED TO
					</div>
					<div className='mb-2 text-lg font-bold'>{name}</div>
					<div className='text-sm leading-7 text-gray-600'>
						123 Lorem Street
						<br />
						Ipsum City, AB 12345
						<br />
						hello@example.com
					</div>
				</div>

				<div className='rounded-2xl border border-gray-200 bg-gray-50 p-5'>
					<div className='mb-2 text-xs font-bold tracking-[0.16em] text-gray-500'>
						FROM
					</div>
					<div className='mb-2 text-lg font-bold'>Lorem Studio</div>
					<div className='text-sm leading-7 text-gray-600'>
						456 Dolor Avenue
						<br />
						Sit Town, CD 67890
						<br />
						contact@loremstudio.com
					</div>
				</div>
			</div>

			{/* Table */}
			<div className='mb-7 overflow-hidden rounded-2xl border border-gray-200'>
				<table className='w-full border-collapse text-sm'>
					<thead>
						<tr className='bg-gray-100'>
							<th className='border-b border-gray-200 px-4 py-4 text-left font-bold text-gray-900'>
								Item
							</th>
							<th className='border-b border-gray-200 px-4 py-4 text-left font-bold text-gray-900'>
								Description
							</th>
							<th className='w-[90px] border-b border-gray-200 px-4 py-4 text-center font-bold text-gray-900'>
								Qty
							</th>
							<th className='w-[120px] border-b border-gray-200 px-4 py-4 text-right font-bold text-gray-900'>
								Price
							</th>
							<th className='w-[120px] border-b border-gray-200 px-4 py-4 text-right font-bold text-gray-900'>
								Amount
							</th>
						</tr>
					</thead>

					<tbody>
						<tr>
							<td className='align-top border-b border-gray-200 px-4 py-4 leading-6 text-gray-700'>
								Website Design
							</td>
							<td className='align-top border-b border-gray-200 px-4 py-4 leading-6 text-gray-700'>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							</td>
							<td className='align-top border-b border-gray-200 px-4 py-4 text-center leading-6 text-gray-700'>
								1
							</td>
							<td className='align-top border-b border-gray-200 px-4 py-4 text-right leading-6 text-gray-700 whitespace-nowrap'>
								$800.00
							</td>
							<td className='align-top border-b border-gray-200 px-4 py-4 text-right leading-6 text-gray-700 whitespace-nowrap'>
								$800.00
							</td>
						</tr>

						<tr>
							<td className='align-top border-b border-gray-200 px-4 py-4 leading-6 text-gray-700'>
								Brand Guidelines
							</td>
							<td className='align-top border-b border-gray-200 px-4 py-4 leading-6 text-gray-700'>
								Sed do eiusmod tempor incididunt ut labore et dolore magna
								aliqua.
							</td>
							<td className='align-top border-b border-gray-200 px-4 py-4 text-center leading-6 text-gray-700'>
								1
							</td>
							<td className='align-top border-b border-gray-200 px-4 py-4 text-right leading-6 text-gray-700 whitespace-nowrap'>
								$350.00
							</td>
							<td className='align-top border-b border-gray-200 px-4 py-4 text-right leading-6 text-gray-700 whitespace-nowrap'>
								$350.00
							</td>
						</tr>

						<tr>
							<td className='align-top border-b border-gray-200 px-4 py-4 leading-6 text-gray-700'>
								UI Components
							</td>
							<td className='align-top border-b border-gray-200 px-4 py-4 leading-6 text-gray-700'>
								Ut enim ad minim veniam, quis nostrud exercitation ullamco
								laboris.
							</td>
							<td className='align-top border-b border-gray-200 px-4 py-4 text-center leading-6 text-gray-700'>
								6
							</td>
							<td className='align-top border-b border-gray-200 px-4 py-4 text-right leading-6 text-gray-700 whitespace-nowrap'>
								$45.00
							</td>
							<td className='align-top border-b border-gray-200 px-4 py-4 text-right leading-6 text-gray-700 whitespace-nowrap'>
								$270.00
							</td>
						</tr>

						<tr>
							<td className='align-top px-4 py-4 leading-6 text-gray-700'>
								Content Editing
							</td>
							<td className='align-top px-4 py-4 leading-6 text-gray-700'>
								Duis aute irure dolor in reprehenderit in voluptate velit esse.
							</td>
							<td className='align-top px-4 py-4 text-center leading-6 text-gray-700'>
								3
							</td>
							<td className='align-top px-4 py-4 text-right leading-6 text-gray-700 whitespace-nowrap'>
								$60.00
							</td>
							<td className='align-top px-4 py-4 text-right leading-6 text-gray-700 whitespace-nowrap'>
								$180.00
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			{/* Notes + Summary */}
			<div className='mb-8 flex items-start justify-between gap-6'>
				<div className='flex-1 rounded-2xl border border-gray-200 bg-gray-50 p-5'>
					<div className='mb-2 text-xs font-bold tracking-[0.16em] text-gray-500'>
						NOTES
					</div>
					<p className='text-sm leading-7 text-gray-600'>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
						commodo, sapien sed luctus consequat, neque sem fermentum justo, sed
						ullamcorper tortor nisi vitae arcu.
					</p>
				</div>

				<div className='w-[260px] rounded-2xl border border-gray-200 p-5'>
					<div className='mb-3 flex items-center justify-between text-sm text-gray-700'>
						<span>Subtotal</span>
						<span>$1,600.00</span>
					</div>
					<div className='mb-3 flex items-center justify-between text-sm text-gray-700'>
						<span>Tax (10%)</span>
						<span>$160.00</span>
					</div>
					<div className='mb-3 flex items-center justify-between text-sm text-gray-700'>
						<span>Discount</span>
						<span>$0.00</span>
					</div>
					<div className='mt-4 flex items-center justify-between border-t border-gray-200 pt-4 text-lg font-bold text-gray-900'>
						<span>Total</span>
						<span>$1,760.00</span>
					</div>
				</div>
			</div>

			{/* Footer */}
			<div className='mt-10 flex items-center justify-between border-t border-gray-200 pt-4 text-xs text-gray-500'>
				<span>Thank you for your business.</span>
				<span>Lorem Studio · www.loremstudio.com</span>
			</div>
		</div>
	);
}
