export async function getUploadUrl() {
	const res = await fetch('/api/upload/url');
	if (!res.ok) throw new Error('upload-url failed');
	return res.json();
}

export async function uploadFileApi(uploadUrl: string, fileName: string) {
	const res = await fetch('/api/upload/file', {
		method: 'POST',
		body: JSON.stringify({uploadUrl, fileName}),
	});
	if (!res.ok) throw new Error('upload-file failed');
	return res.json();
}

export async function notifyApi(fileUrl: string) {
	const res = await fetch('/api/upload/notify', {
		method: 'POST',
		body: JSON.stringify({fileUrl}),
	});
	if (!res.ok) throw new Error('notify failed');
}
