import { useContext, useState } from 'react';
import { Box, CircularProgress, TextField, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTreeNode } from '../../services/index';
import { ICreateNodeParams } from '../../types/api';
import { ModalContext } from '../../context';
import { Button } from '../Button';

export const CreateTreeNode = () => {
  const { modal_props, handleModal } = useContext(ModalContext);

  const [name, setName] = useState('');

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createTreeNode,
    onSuccess: () => {
      handleModal(null);
      queryClient.invalidateQueries({ queryKey: ['tree'] });
    },
  });

  const handleCreateNode = (params: ICreateNodeParams) => {
    if (!name.trim() || modal_props?.parentNodeId) return;
    mutate(params);
  };

  return (
    <Box>
      <Typography component="h3" textAlign="center" fontSize={20}>
        Add
      </Typography>

      <Box marginY={5}>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Node name"
          variant="outlined"
          fullWidth
        />
      </Box>

      <Box display="flex" justifySelf="end" gap={1}>
        <Button
          onClick={() => handleModal(null)}
          sx={{ borderColor: 'error.main', color: 'error.main' }}
        >
          cancel
        </Button>
        <Button
          onClick={() =>
            handleCreateNode({
              parentNodeId: modal_props?.parentNodeId || 0,
              nodeName: name,
            })
          }
          sx={{ bgcolor: '#3f51b5', color: '#fff' }}
          disabled={!name.trim() || isPending}
        >
          add
          {isPending && <CircularProgress size={18} color="inherit" />}
        </Button>
      </Box>
    </Box>
  );
};
