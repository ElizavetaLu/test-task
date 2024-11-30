import { useContext, useState } from 'react';
import { Box, CircularProgress, TextField, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IRenameNodeParams } from '../../types/api';
import { renameTreeNode } from '../../services';
import { Button } from '../Button';
import { ModalContext } from '../../context';

export const RenameTreeNode = () => {
  const { modal_props, handleModal } = useContext(ModalContext);
  const [error, setError] = useState('');

  const [name, setName] = useState(modal_props?.nodeName || '');

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: renameTreeNode,
    onError: (error: any) => {
      const err_msg = error?.response?.data?.data?.message;

      setError(err_msg || 'Something went wrong');
    },
    onSuccess: () => {
      handleModal(null);
      queryClient.invalidateQueries({ queryKey: ['tree'] });
    },
  });

  const handleRenameNode = async (params: IRenameNodeParams) => {
    if (!name.trim() || !params.nodeId) return;
    mutate(params);
  };

  return (
    <Box>
      <Typography component="h3" textAlign="center" fontSize={20}>
        Rename
      </Typography>

      {error && (
        <Typography color="error.main" textAlign="center">
          {error}
        </Typography>
      )}

      <Box marginY={5}>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="New node name"
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
            handleRenameNode({
              nodeId: modal_props?.nodeId || 0,
              newNodeName: name,
            })
          }
          sx={{ bgcolor: '#3f51b5', color: '#fff' }}
          disabled={!name.trim() || isPending}
        >
          rename
          {isPending && <CircularProgress size={18} color="inherit" />}
        </Button>
      </Box>
    </Box>
  );
};
