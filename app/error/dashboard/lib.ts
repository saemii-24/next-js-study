export default function renderWait(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
