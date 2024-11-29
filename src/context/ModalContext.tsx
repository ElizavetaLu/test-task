import { PropsWithChildren, useState } from 'react';
import { ModalContext, TModal, TModalProps } from '.';

export function ModalProvider({ children }: PropsWithChildren) {
  const [modal, setModal] = useState<TModal>(null);
  const [modal_props, setModalProps] = useState<TModalProps | null>(null);

  const handleModal = (value: TModal, props?: unknown) => {
    setModal(value);
    if (props) setModalProps(props);
  };

  return (
    <ModalContext.Provider
      value={{
        modal,
        handleModal,
        modal_props,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
