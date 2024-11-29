import { Box, Typography } from '@mui/material';
import { Button } from '../Button';
import { useContext } from 'react';
import { ModalContext } from '../../context/ModalContext';

export const DeleteTreeNode = () => {
  const { modal_props, handleModal } = useContext(ModalContext);

  return (
    <Box>
      <Typography component="h3" textAlign="center" fontSize={20}>
        Delete
      </Typography>

      <Box marginY={5}>
        <Typography>
          Do you want to delete{' '}
          <Typography component="span" fontWeight={700}>
            {modal_props as string}
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
          sx={{
            borderColor: 'error.main',
            bgcolor: 'error.main',
            color: '#fff',
          }}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};
