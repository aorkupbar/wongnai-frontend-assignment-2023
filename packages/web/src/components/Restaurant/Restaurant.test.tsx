import { render } from '@testing-library/react';
import Restaurant from './Restaurant';

test('renders Restaurant component', () => {
  render(<Restaurant restaurant={{
		name: '',
		id: 0,
		coverImage: '',
		menus: [],
		activeTimePeriod: {
			open: '',
			close: ''
		}
	}} />);
});
