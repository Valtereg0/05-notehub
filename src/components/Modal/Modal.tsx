import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';


export interface ModalProps {
isOpen: boolean;
onClose: () => void;
children: ReactNode;
}


const modalRoot = document.getElementById('modal-root')!;


export default function Modal({ isOpen, onClose, children }: ModalProps) {
useEffect(() => {
if (!isOpen) return;
const onKey = (e: KeyboardEvent) => {
if (e.key === 'Escape') onClose();
};
window.addEventListener('keydown', onKey);
return () => window.removeEventListener('keydown', onKey);
}, [isOpen, onClose]);


if (!isOpen) return null;


const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
if (e.target === e.currentTarget) onClose();
};


return createPortal(
<div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleBackdrop}>
<div className={css.modal}>{children}</div>
</div>,
modalRoot,
);
}