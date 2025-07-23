import {promises as fs} from 'fs';
import {NextRequest, NextResponse} from 'next/server';
import path from 'path';

export async function GET(request: NextRequest) {
	const {searchParams} = new URL(request.url);
	console.log(searchParams); // URLSearchParams { 'fruit' => 'apple' }
	const fruit = searchParams.get('fruit');
	console.log(fruit); // 'apple'

	if (!fruit) {
		return NextResponse.json({error: 'No fruit provided'}, {status: 400});
	}

	// 프로젝트 루트 경로 기준으로 fruit 폴더 경로 설정
	const fruitFolderPath = path.join(process.cwd(), 'fruit');
	const filePath = path.join(fruitFolderPath, `${fruit}.txt`);

	console.log('Folder path:', fruitFolderPath);
	console.log('File path:', filePath);

	try {
		// fruit 폴더가 없으면 생성
		// 내가 이 위치에 넣을 건데, 만약 이 위치들이 없으면 니가 다 만들어서 위치시켜줘란 의미
		await fs.mkdir(fruitFolderPath, {recursive: true});

		// 파일에 fruit 값 쓰기 (기존 파일 덮어씀)
		await fs.writeFile(filePath, fruit, 'utf-8');

		// 기존 파일에 추가
		await fs.appendFile(
			filePath,
			`\n${fruit} - ${new Date().toISOString()}`,
			'utf-8',
		);

		return NextResponse.json({
			message: 'Saved successfully',
			fruit,
			folderPath: fruitFolderPath,
			filePath: filePath,
		});
	} catch (error) {
		console.error('Error creating folder or writing file:', error);
		return NextResponse.json(
			{error: 'Failed to create folder or write file'},
			{status: 500},
		);
	}
}
