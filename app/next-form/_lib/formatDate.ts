const today = new Date();
export const formatDate = today
	.toLocaleDateString('ko-KR', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	})
	.replace(/\. /g, '-')
	.replace('.', '');
