// DEMO PAGE
export interface ITreeNode {
  id: number;
  name: string;
  children: ITreeNode[];
}

export interface ICustomTreeProps {
  data: ITreeNode[];
  nodeId: number;
  setNodeId: (id: number) => void;
}

export interface ITreeNodeProps {
  node: ITreeNode;
  nodeId: number;
  setNodeId: (id: number) => void;
}

// MADAL

export enum EModal {
  CREATE_NODE = 'CREATE_NODE',
  DELETE_NODE = 'DELETE_NODE',
  REMANE_NODE = 'REMANE_NODE',
}
