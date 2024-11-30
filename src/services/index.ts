import axios from 'axios';
import {
  ICreateNodeParams,
  IJournalData,
  IJournalParams,
  IRenameNodeParams,
  ISingleJournal,
  ITreeNode,
} from '../types/api';

const treeName = 'Lizaveta_Kanapatskaya-W0p3outE4aQS1wyP';
const baseURL = 'https://test.vmarmysh.com';

export const api = axios.create({ baseURL });

// TREE
export const getTree = async () => {
  const { data } = await api.post<ITreeNode>('api.user.tree.get', null, {
    params: { treeName },
  });
  return data;
};

export const createTreeNode = async (params: ICreateNodeParams) => {
  const { data } = await api.post('api.user.tree.node.create', null, {
    params: { treeName, ...params },
  });
  return data;
};

export const deleteTreeNode = async (nodeId: number) => {
  const { data } = await api.post('api.user.tree.node.delete', null, {
    params: { treeName, nodeId },
  });
  return data;
};

export const renameTreeNode = async (params: IRenameNodeParams) => {
  const { data } = await api.post('api.user.tree.node.rename', null, {
    params: { treeName, ...params },
  });
  return data;
};

// JOURNAL
export const getJournal = async ({
  skip = 0,
  take = 10,
  filter,
}: IJournalParams) => {
  const { data } = await api.post<IJournalData>(
    'api.user.journal.getRange',
    JSON.stringify(filter),
    { params: { skip, take } },
  );

  return data;
};

export const getSingleJournal = async (id: string) => {
  const { data } = await api.post<ISingleJournal>(
    `api.user.journal.getSingle?id=${id}`,
  );
  return data;
};
