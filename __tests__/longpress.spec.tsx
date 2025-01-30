import {render, screen, act} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LongPress from 'app/long-press/page';

describe('long-press 기능을 테스트한다', () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.runOnlyPendingTimers();
		jest.useRealTimers();
	});

	it('500ms 이상 아이템을 누르면 삭제 버튼이 나타난다', async () => {
		const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});

		render(<LongPress />);

		// 첫 번째 아이템 가져오기
		const item = screen.getByTestId(1);

		// touchstart 이벤트 시뮬레이션 (수정)
		await user.pointer({target: item, keys: '[Touch]'});

		// 500ms 경과 시뮬레이션
		jest.advanceTimersByTime(1000);

		// // 삭제 버튼이 나타나는지 확인
		// const deleteButton = screen.getByText('X');
		// expect(deleteButton).toBeInTheDocument();

		screen.debug();

		// touchend 이벤트로 누르기 종료 (수정)
		await user.pointer({target: item, keys: '[/Touch]'});
	});
});
