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

// JOURNAL
interface IJournalFilters {
  from?: string;
  to?: string;
  search?: string;
}

export interface IJournalParams {
  skip: number;
  take: number;
  filter: IJournalFilters;
}

export interface IJournalData {
  skip: number;
  count: number;
  items: IJournalField[];
}
export interface IJournalField {
  id: number;
  eventId: number;
  createdAt: string;
}

export interface ISingleJournal extends IJournalField {
  text: string;
}
