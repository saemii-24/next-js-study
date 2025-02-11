export async function createPost(prevState: any, formData: FormData) {
	const title = formData.get('title');
	const content = formData.get('content');

	const res = await fetch('/api/error', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({title, content}),
	});
	const json = await res.json();

	if (!res.ok) {
		return {message: 'Failed to create post'};
	}

	return json;
}
