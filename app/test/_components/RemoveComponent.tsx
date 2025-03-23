'use client';
import React, {useState} from 'react';

interface RemoveComponentProps {
	isRemoved: boolean;
	removeThis: () => void;
}

const RemoveComponent = ({isRemoved, removeThis}: RemoveComponentProps) => {
	return (
		<div>
			{!isRemoved && (
				<h1 className='bg-gray-50 rounded-md text-center text-xl py-1'>
					신짱구
				</h1>
			)}
			<button
				onClick={removeThis}
				role='button'
				className='bg-blue-500 text-white mt-2 hover:bg-blue-500/70 w-full rounded-md text-center text-xl py-1'>
				짱구 삭제하기!
			</button>
		</div>
	);
};

export default RemoveComponent;
