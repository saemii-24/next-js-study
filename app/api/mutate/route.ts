import {NextResponse} from 'next/server';
import {promises as fs} from 'fs';
import path from 'path';

interface Member {
	id: number;
	name: string;
	birth: number;
	height: number;
}

// process.cwd() = 프로젝트의 루트 디렉토리
const filePath = path.join(process.cwd(), 'data', 'members.json');

async function getMembers(): Promise<Member[]> {
	const fileContents = await fs.readFile(filePath, 'utf8');
	return JSON.parse(fileContents) as Member[];
}

async function writeMembers(members: Member[]): Promise<void> {
	await fs.writeFile(filePath, JSON.stringify(members, null, 2));
}

export async function GET() {
	const members = await getMembers();
	return NextResponse.json(members);
}

export async function POST(request: Request) {
	const newMember = {id: Date.now(), ...(await request.json())} as Member;
	const members = await getMembers();
	members.push(newMember);
	await writeMembers(members);
	return NextResponse.json(newMember, {status: 201});
}

export async function PUT(request: Request) {
	const updatedMember = (await request.json()) as Member;
	const members = await getMembers();
	const index = members.findIndex((member) => member.id === updatedMember.id);
	if (index > -1) {
		members[index] = updatedMember;
		await writeMembers(members);
		return NextResponse.json(updatedMember);
	} else {
		return NextResponse.json({message: 'Member not found'}, {status: 404});
	}
}

export async function DELETE(request: Request) {
	try {
		const url = new URL(request.url);
		const id = Number(url.searchParams.get('memberId'));

		if (isNaN(id)) {
			return NextResponse.json(
				{message: 'Valid member ID is required'},
				{status: 400},
			);
		}

		const members = await getMembers();
		const updatedMembers = members.filter((member) => member.id !== id);

		await writeMembers(updatedMembers);

		return NextResponse.json({message: 'Deleted successfully'}, {status: 200});
	} catch (error) {
		console.error('Error deleting member:', error);
		return NextResponse.json({message: 'Internal Server Error'}, {status: 500});
	}
}
