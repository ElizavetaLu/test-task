// TREE
export interface ITreeNode {
  id: number;
  name: string;
  children: ITreeNode[];
}

export interface ICreateNodeParams {
  parentNodeId: number;
  nodeName: string;
}

export interface IRenameNodeParams {
  nodeId: number;
  newNodeName: string;
}

export enum ETags {
  TREE = 'TREE',
}
