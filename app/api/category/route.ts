import {NextResponse} from 'next/server';

export async function GET() {
	const categories = [
		{id: 1, name: 'Game', image: '/image/game.jpg'},
		{id: 2, name: 'Clothes', image: '/image/cloth.jpg'},
		{id: 3, name: 'Drink', image: '/image/drink.jpg'},
	];
	return NextResponse.json(categories);
}
