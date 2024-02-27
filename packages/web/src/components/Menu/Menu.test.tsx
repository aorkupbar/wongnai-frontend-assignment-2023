import { render } from '@testing-library/react';
import Menu from './Menu';

test('renders Menu component', () => {
  render(<Menu menu={{
		name: '',
		id: '',
		thumbnailImage: '',
		fullPrice: 0,
		discountedPercent: 0,
		sold: 0,
		totalInStock: 0
	}} onClick={function (): void {
		throw new Error('Function not implemented.');
	} } />);
});
