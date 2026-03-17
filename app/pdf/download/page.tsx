'use client';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {useRef} from 'react';
import InvoicePdf from '../_component/InvoicePdf';

export default function PageA() {
	const pdfRef = useRef<HTMLDivElement>(null);

	const handleDownload = async () => {
		if (!pdfRef.current) return;

		const canvas = await html2canvas(pdfRef.current, {
			scale: 2,
			useCORS: true,
		});

		const imgData = canvas.toDataURL('image/png');

		const pdf = new jsPDF('p', 'mm', 'a4');

		const pageWidth = 210;
		const pageHeight = 297;

		const imgWidth = pageWidth;
		const imgHeight = (canvas.height * imgWidth) / canvas.width;

		pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
		pdf.save('invoice.pdf');
	};

	return (
		<div className='flex-center'>
			<button
				className='bg-yellow-500 p-6 hover:bg-yellow-600 cursor-pointer rounded-xl font-semibold'
				onClick={() => {
					window.open('/api/pdf', '_blank');
				}}>
				PDF 다운로드
			</button>

			{/* 화면에는 안 보이지만 DOM에는 존재 */}
			<div className='absolute top-0 left-[-9999px]'>
				<div
					ref={pdfRef}
					className='bg-white text-gray-800 border border-gray-200 w-[794px] p-10'>
					<InvoicePdf name='Kim' date='2026-03-17' />
				</div>
			</div>
		</div>
	);
}
