import {promises as fs} from 'fs';
import {NextRequest, NextResponse} from 'next/server';
import path from 'path';

export async function POST(request: NextRequest) {
	try {
		// URL에서 query parameter 추출
		const {searchParams} = new URL(request.url);
		const folderName = searchParams.get('folderName');

		// folderName이 없으면 기본값 사용
		if (!folderName) {
			return NextResponse.json(
				{
					success: false,
					exists: false,
					message: 'folderName query parameter is required',
					error: 'Missing folderName parameter',
				},
				{status: 400},
			);
		}

		// 보안을 위해 상대 경로 접근 방지
		const sanitizedFolderName = path.basename(folderName);

		// 프로젝트 루트에서 폴더 경로 생성
		const folderPath = path.join(process.cwd(), sanitizedFolderName);

		try {
			// 폴더가 존재하는지 확인
			const stats = await fs.stat(folderPath);

			// 실제로 디렉토리인지 확인
			if (stats.isDirectory()) {
				return NextResponse.json({
					success: true,
					exists: true,
					message: `"${sanitizedFolderName}" 폴더가 존재합니다! 😊`,
					folderPath: folderPath,
					folderName: sanitizedFolderName,
				});
			} else {
				return NextResponse.json({
					success: true,
					exists: false,
					message: `"${sanitizedFolderName}"는 폴더가 아닙니다. 📄`,
					folderPath: folderPath,
					folderName: sanitizedFolderName,
				});
			}
		} catch (error: any) {
			// ENOENT 에러 = 폴더가 없음
			if (error.code === 'ENOENT') {
				return NextResponse.json({
					success: true,
					exists: false,
					message: `"${sanitizedFolderName}" 폴더가 존재하지 않습니다 😢`,
					folderPath: folderPath,
					folderName: sanitizedFolderName,
				});
			} else {
				throw error;
			}
		}
	} catch (error: any) {
		console.error('폴더 확인 중 에러:', error);

		return NextResponse.json(
			{
				success: false,
				exists: false,
				message: '폴더 확인 중 에러가 발생했습니다',
				error: error.message,
			},
			{status: 500},
		);
	}
}
