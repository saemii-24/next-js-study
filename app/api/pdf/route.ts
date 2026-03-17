import puppeteer from 'puppeteer';

export async function GET() {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	await page.goto('http://localhost:3000/pdf/invoice', {
		waitUntil: 'networkidle0',
	});

	const pdf = await page.pdf({
		format: 'A4',
		printBackground: true,
		margin: {
			top: '20mm',
			bottom: '20mm',
			left: '15mm',
			right: '15mm',
		},
	});

	await browser.close();

	return new Response(Buffer.from(pdf), {
		headers: {
			'Content-Type': 'application/pdf',
			'Content-Disposition': 'inline; filename=invoice.pdf',
		},
	});
}
