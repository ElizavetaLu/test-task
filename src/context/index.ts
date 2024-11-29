import React from 'react';
import { EModal } from '../types';

// DEMO PAGE CONTEXT
type TDemoContext = {
  nodeId: number | null;
  setNodeId: (id: number) => void;
};

const demo_context = {
  nodeId: null,
  setNodeId: () => {},
};

export const DemoContext = React.createContext<TDemoContext>(demo_context);

// MODAL DATA CONTEXT
export type TModal = EModal | null;

export type TModalProps = {
  nodeName?: string;
  nodeId?: number;
  parentNodeId?: number;
};

type TModalContext = {
  modal: TModal;
  handleModal: (value: TModal, props?: unknown) => void;
  modal_props: TModalProps | null;
};

const modal_context = {
  modal: null,
  handleModal: () => {},
  modal_props: null,
};

export const ModalContext = React.createContext<TModalContext>(modal_context);
