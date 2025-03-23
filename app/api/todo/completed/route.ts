import {NextResponse} from 'next/server';
import {promises as fs} from 'fs';
import path from 'path';
import {TodoType} from 'app/next-form/_query/todoQuery';

interface TodoData {
	[date: string]: TodoType[];
}

const filePath = path.join(process.cwd(), 'data', 'todo.json');

// 📌 JSON 파일 읽기
async function getTodo(): Promise<TodoData> {
	const fileContents = await fs.readFile(filePath, 'utf8');
	return JSON.parse(fileContents) as TodoData;
}

// 📌 JSON 파일 쓰기
async function saveTodo(todos: TodoData): Promise<void> {
	await fs.writeFile(filePath, JSON.stringify(todos, null, 2), 'utf8');
}

// 📌PUT: 특정 날짜와 ID의 TODO 수정 (completed 상태 변경)
export async function PUT(request: Request) {
	const url = new URL(request.url);
	const date = url.searchParams.get('date');
	const {id, completed} = await request.json();

	if (!date || id === undefined || completed === undefined) {
		return NextResponse.json(
			{message: '날짜, ID, completed 상태가 필요합니다.'},
			{status: 400},
		);
	}

	try {
		const todos = await getTodo();
		if (!todos[date]) {
			return NextResponse.json(
				{message: '해당 날짜 데이터가 존재하지 않습니다.'},
				{status: 404},
			);
		}

		const index = todos[date].findIndex((todo) => todo.id === id);
		if (index === -1) {
			return NextResponse.json(
				{message: '선택하신 TODO를 찾을 수 없습니다.'},
				{status: 404},
			);
		}

		todos[date][index].completed = completed;

		await saveTodo(todos);

		return NextResponse.json(todos[date][index]);
	} catch (error) {
		return NextResponse.json(
			{message: '서버에서 오류가 발생했습니다.'},
			{status: 500},
		);
	}
}
