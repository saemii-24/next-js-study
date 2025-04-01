'use client';
import React from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import {faker} from '@faker-js/faker';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
);

const options = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top' as const,
		},
		title: {
			display: true,
			text: '가짜 데이터의 월별 차트',
		},
	},
};

const labels = ['1월', '2월', '3월', '4월', '5월', '6월', '7월'];

const data = {
	labels,
	datasets: [
		{
			label: '데이터 1',
			data: labels.map(() => faker.number.int({min: 0, max: 1000})),
			backgroundColor: 'rgba(255, 99, 132, 0.5)',
		},
		{
			label: '데이터 2',
			data: labels.map(() => faker.number.int({min: 0, max: 1000})),
			backgroundColor: 'rgba(53, 162, 235, 0.5)',
		},
		{
			label: '데이터 3',
			data: labels.map(() => faker.number.int({min: 0, max: 1000})),
			backgroundColor: 'rgba(100, 255, 235, 0.5)',
		},
	],
};

export default function ChartComponent() {
	return <Bar options={options} data={data} />;
}
