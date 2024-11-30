import { useContext } from 'react';
import { Box, Modal } from '@mui/material'; 
import { EModal } from '../../types/index';
import { CreateTreeNode } from './CreateTreeNode';
import { RenameTreeNode } from './RenameTreeNode';
import { DeleteTreeNode } from './DeleteTreeNode';
import { ModalContext } from '../../context';

export const ModalContainer = () => {
  const { modal, handleModal } = useContext(ModalContext);

  return (
    <Modal open={!!modal} onClose={() => handleModal(null, null)}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '1px solid lightgray',
          borderRadius: 2,
          p: 2,
        }}
      >
        {modal === EModal.CREATE_NODE && <CreateTreeNode />}
        {modal === EModal.REMANE_NODE && <RenameTreeNode />}
        {modal === EModal.DELETE_NODE && <DeleteTreeNode />}
      </Box>
    </Modal>
  );
};
