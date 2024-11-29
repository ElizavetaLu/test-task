import React, { PropsWithChildren, useState } from 'react';
import { EModal } from '../types';

type TModal = EModal | null;

type TModalContext = {
  modal: TModal;
  handleModal: (value: TModal, props?: unknown) => void;
  modal_props: unknown;
};

const default_context = {
  modal: null,
  handleModal: () => {},
  modal_props: null,
};

export const ModalContext = React.createContext<TModalContext>(default_context);

export function ModalProvider({ children }: PropsWithChildren) {
  const [modal, setModal] = useState<TModal>(null);
  const [modal_props, setModalProps] = useState<unknown>(null);

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
