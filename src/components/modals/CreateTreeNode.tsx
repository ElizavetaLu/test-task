import { Box, TextField, Typography } from '@mui/material';
import { Button } from '../Button';
import { useContext } from 'react';
import { ModalContext } from '../../context/ModalContext';

export const CreateTreeNode = () => {
  const { handleModal } = useContext(ModalContext);

  return (
    <Box>
      <Typography component="h3" textAlign="center" fontSize={20}>
        Add
      </Typography>

      <Box marginY={5}>
        <TextField label="Node name" variant="outlined"  fullWidth/>
      </Box>

      <Box display="flex" justifySelf="end" gap={1}>
        <Button
          onClick={() => handleModal(null)}
          sx={{ borderColor: 'error.main', color: 'error.main' }}
        >
          cancel
        </Button>
        <Button sx={{ bgcolor: '#3f51b5', color: '#fff' }}>add</Button>
      </Box>
    </Box>
  );
};
