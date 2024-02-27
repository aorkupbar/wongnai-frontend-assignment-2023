import { render } from '@testing-library/react';
import MenuFull from './MenuFull';

test('renders MenuFull component', () => {
  render(<MenuFull menu={{
		name: '',
		id: '',
		thumbnailImage: '',
		fullPrice: 0,
		discountedPercent: 0,
		discountedTimePeriod: undefined,
		sold: 0,
		totalInStock: 0,
		largeImage: undefined,
		options: []
	}} />);
});
