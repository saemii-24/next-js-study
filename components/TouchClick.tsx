'use client';
import React, {useState} from 'react';

const TouchClick = () => {
	const [log, setLog] = useState([]);

	return (
		<div>
			<button
				// onTouchStart={touchStart}
				// onTouchMove={touchMove}
				// onTouchEnd={touchEnd}
				// onTouchCancel={touchCancel}
				// onClick={click}
				// onMouseDown={mouseDown}
				// onMouseUp={mouseUp}
				className='bg-red-50'>
				버튼을 눌러보세요
			</button>

			<button
			// onClick={clearLog}
			>
				로그 초기화
			</button>
		</div>
	);
};

export default TouchClick;
