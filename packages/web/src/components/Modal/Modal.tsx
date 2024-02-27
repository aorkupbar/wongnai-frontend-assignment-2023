import React from 'react';

interface ModalProps {
	open: Boolean;
	onClose: () => void;
	children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
	return (
		<div onClick={onClose} className={`
			fixed inset-0 flex justify-center
			transition-colors py-4
			overflow-x-hidden outline-none
			${open ? "visible bg-black/20" : "invisible"}
		`}>
			<div
				onClick={(e) => e.stopPropagation()}
				className={
				`modal-container bg-white rounded-xl shadow transition-all overflow-y-auto
				${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
			`}>
				<button
					onClick={onClose}
					className="absolute btn-close-modal top-2 right-2 p-1">
					X
				</button>

				{children}
			</div>
		</div>
	);
}

export default Modal;


