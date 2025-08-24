import {NextResponse} from 'next/server';
import {promises as fs} from 'fs';
import path from 'path';

interface songData {
	[date: string]: string[];
}

const filePath = path.join(process.cwd(), 'data', 'song.json');

// 📌 JSON 파일 읽기
async function getSong(): Promise<songData> {
	const fileContents = await fs.readFile(filePath, 'utf8');
	return JSON.parse(fileContents) as songData;
}

// 📌GET: 전체 데이터 가져오기
export async function GET(request: Request) {}
export async function READ(request: Request) {}
export async function UPDATE(request: Request) {}
export async function DELETE(request: Request) {}
