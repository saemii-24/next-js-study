import {NextResponse} from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'post.json');

export async function POST(request: Request) {
	const {title, content} = await request.json();

	//에러 테스트
	return NextResponse.json(
		{message: 'Title and content are required.'},
		{status: 400},
	);

	// if (!title || !content) {
	// 	return NextResponse.json(
	// 		{message: 'Title and content are required.'},
	// 		{status: 400},
	// 	);
	// }

	// // 기존 포스트 읽기
	// const existingPosts = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

	// // 새로운 포스트 추가
	// const newPost = {title, content, id: existingPosts.length + 1};
	// existingPosts.push(newPost);

	// // 파일에 저장
	// fs.writeFileSync(filePath, JSON.stringify(existingPosts, null, 2), 'utf-8');

	// return NextResponse.json(newPost, {status: 201});
}
