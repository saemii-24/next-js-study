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
async function saveTodo(data: TodoData): Promise<void> {
	//JSON.stringify(value, replacer, space)
	//JSON 변환할 객체/배열, 특정 속성만 포함할지 여부, 저장되는 데이터의 들여쓰기 정도
	await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

// 📌GET: 전체 데이터 가져오기
export async function GET(request: Request) {
	const url = new URL(request.url); //url을 객체 형태로 변환한다.
	const date = url.searchParams.get('date'); //변환한 값의 ?date=2025-03-11 의 형태로 저장된 '2025-03-11'을 가져온다.

	if (!date) {
		return NextResponse.json({message: '날짜를 입력하세요.'}, {status: 400});
	}

	try {
		const todos = await getTodo();
		return NextResponse.json(todos[date] || []);
	} catch (error) {
		return NextResponse.json(
			{message: '서버에서 오류가 발생했습니다.'},
			{status: 500},
		);
	}
}

// 📌POST: 특정 날짜 TODO 추가
export async function POST(request: Request) {
	const {date, title} = await request.json();

	if (!date || !title) {
		return NextResponse.json(
			{message: '날짜와 제목을 입력하세요.'},
			{status: 400},
		);
	}

	try {
		const todos = await getTodo();
		const newTodo: TodoType = {
			id: Date.now(),
			title,
			completed: false,
		};

		//해당 날짜 TODO 없을 경우 배열 새로 생성
		if (!todos[date]) {
			todos[date] = [];
		}

		todos[date].push(newTodo);
		await saveTodo(todos);

		return NextResponse.json(newTodo, {status: 201});
	} catch (error) {
		return NextResponse.json(
			{message: '서버에서 오류가 발생했습니다.'},
			{status: 500},
		);
	}
}

// 📌PUT: 특정 날짜 TODO 수정
export async function PUT(request: Request) {
	const url = new URL(request.url); //url을 객체 형태로 변환한다.
	const date = url.searchParams.get('date');
	const {id, title, completed} = await request.json();

	if (!date || id === undefined) {
		return NextResponse.json(
			{message: '날짜와 ID가 필요합니다.'},
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

		todos[date][index] = {id, title, completed};
		await saveTodo(todos);

		return NextResponse.json(todos[date][index]);
	} catch (error) {
		return NextResponse.json(
			{message: '서버에서 오류가 발생했습니다.'},
			{status: 500},
		);
	}
}

// 📌DELETE: 특정 날짜 TODO 삭제
export async function DELETE(request: Request) {
	const url = new URL(request.url);
	const date = url.searchParams.get('date');
	const id = Number(url.searchParams.get('id'));

	if (!date || isNaN(id)) {
		return NextResponse.json(
			{message: '유효한 날짜와 ID가 필요합니다.'},
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

		const updatedTodos = todos[date].filter((todo) => todo.id !== id);
		if (updatedTodos.length === todos[date].length) {
			return NextResponse.json(
				{message: '선택하신 TODO를 찾을 수 없습니다.'},
				{status: 404},
			);
		}

		todos[date] = updatedTodos;
		await saveTodo(todos);

		return NextResponse.json(
			{message: '삭제가 완료되었습니다.'},
			{status: 200},
		);
	} catch (error) {
		return NextResponse.json(
			{message: '서버에서 오류가 발생했습니다.'},
			{status: 500},
		);
	}
}
