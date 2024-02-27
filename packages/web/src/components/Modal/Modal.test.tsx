import { render } from '@testing-library/react';
import Modal from './Modal';

test('renders Modal component', () => {
  render(<Modal open={false} onClose={function (): void {
		throw new Error('Function not implemented.');
	} } />);
});
