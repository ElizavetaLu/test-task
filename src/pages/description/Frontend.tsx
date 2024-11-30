import { Box, Typography } from '@mui/material';

export default function Frontend() {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography>Use swagger to learn server API.</Typography>

      <Typography>
        Use unique tree name for your own tree, for example, GUID.
      </Typography>

      <Typography>
        Create your own version of editable tree similar to the provided demo.
      </Typography>

      <Typography>Upload your code to Git Hub.</Typography>
    </Box>
  );
}
