import { render, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Restaurant from './Restaurant';

test('renders Restaurant component', async () => {
	await act(async () => {
		render(
			<MemoryRouter>
				<Restaurant />
			</MemoryRouter>
		);
	});
});
