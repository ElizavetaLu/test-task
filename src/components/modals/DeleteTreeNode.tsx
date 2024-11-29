import { useContext } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTreeNode } from '../../services';
import { ModalContext } from '../../context';
import { Button } from '../Button';

export const DeleteTreeNode = () => {
  const { modal_props, handleModal } = useContext(ModalContext);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteTreeNode,
    onSuccess: () => {
      handleModal(null);
      queryClient.invalidateQueries({ queryKey: ['tree'] });
    },
  });

  return (
    <Box>
      <Typography component="h3" textAlign="center" fontSize={20}>
        Delete
      </Typography>

      <Box marginY={5}>
        <Typography>
          Do you want to delete{' '}
          <Typography component="span" fontWeight={700}>
            {modal_props?.nodeName}
          </Typography>
          ?
        </Typography>
      </Box>

      <Box display="flex" justifySelf="end" gap={1}>
        <Button
          onClick={() => handleModal(null)}
          sx={{ borderColor: 'error.main', color: 'error.main' }}
        >
          cancel
        </Button>

        <Button
          onClick={() => modal_props?.nodeId && mutate(modal_props?.nodeId)}
          sx={{
            borderColor: 'error.main',
            bgcolor: 'error.main',
            color: '#fff',
          }}
          disabled={isPending || !modal_props}
        >
          Delete
          {isPending && <CircularProgress size={18} color="inherit" />}
        </Button>
      </Box>
    </Box>
  );
};
