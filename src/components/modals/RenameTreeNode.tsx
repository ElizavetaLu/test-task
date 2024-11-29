import { Box, TextField, Typography } from '@mui/material';
import { useContext } from 'react';
import { Button } from '../Button';
import { ModalContext } from '../../context/ModalContext';

export const RenameTreeNode = () => {
  const { handleModal } = useContext(ModalContext);

  return (
    <Box>
      <Typography component="h3" textAlign="center" fontSize={20}>
        Rename
      </Typography>

      <Box marginY={5}>
        <TextField label="New node name" variant="outlined" fullWidth />
      </Box>

      <Box display="flex" justifySelf="end" gap={1}>
        <Button
          onClick={() => handleModal(null)}
          sx={{ borderColor: 'error.main', color: 'error.main' }}
        >
          cancel
        </Button>
        <Button sx={{ bgcolor: '#3f51b5', color: '#fff' }}>rename</Button>
      </Box>
    </Box>
  );
};
