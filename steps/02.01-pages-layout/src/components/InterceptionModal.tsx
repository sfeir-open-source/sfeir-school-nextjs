'use client';

import { useRouter } from 'next/navigation';
import Modal, { ModalProps } from './Modal';

type InterceptionModalProps = ModalProps & {
  children: React.ReactNode;
};

const InterceptionModal: React.FC<InterceptionModalProps> = ({ children, ...restProps }) => {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal {...restProps} onClose={handleClose}>
      {children}
    </Modal>
  );
};

export default InterceptionModal;
