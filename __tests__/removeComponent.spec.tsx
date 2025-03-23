import {
	render,
	screen,
	fireEvent,
	waitFor,
	waitForElementToBeRemoved,
} from '@testing-library/react';
import RemoveComponent from 'app/test/_components/RemoveComponent';

it('삭제하기 버튼을 누르면 text가 DOM에서 제거된다.', async () => {
	const setIsRemoved = jest.fn();
	render(<RemoveComponent isRemoved={false} setIsRemoved={setIsRemoved} />);

	expect(screen.getByText('신짱구')).toBeInTheDocument();

	const button = screen.getByRole('button', {name: /짱구 삭제하기!/i});
	fireEvent.click(button);

	expect(setIsRemoved).toHaveBeenCalledWith(true);

	await waitFor(() => screen.queryByText('신짱구') === null);
});
