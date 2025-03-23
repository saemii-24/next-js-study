import {
	render,
	screen,
	waitFor,
	waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Test from 'app/test/page';

it('삭제하기 버튼을 누르면 text가 DOM에서 제거된다.', async () => {
	render(<Test />);

	// "삭제하기" 버튼을 클릭
	userEvent.click(screen.getByRole('button', {name: /짱구 삭제하기!/i}));

	// "신짱구" 텍스트가 DOM에서 제거될 때까지 기다림
	await waitForElementToBeRemoved(() => screen.queryByText('신짱구'));

	// await waitFor(() => {
	// 	// 텍스트가 제거되었는지 확인
	// 	expect(screen.queryByText('신짱구')).toBeNull();
	// 	expect;
	// });

	// 텍스트가 제거되었는지 확인
	expect(screen.queryByText('신짱구')).toBeNull();
});
