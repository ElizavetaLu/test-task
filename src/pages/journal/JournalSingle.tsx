import { Box, CircularProgress, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getSingleJournal } from '../../services';

export default function JournalSingle() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ['single-journal', id],
    queryFn: () => getSingleJournal(id || ''),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <Box justifySelf="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography>
        <Typography component="span" fontWeight={600}>
          Created At
        </Typography>{' '}
        {data?.createdAt}
      </Typography>
      <Typography
        sx={{
          whiteSpace: 'pre-wrap',
          lineHeight: 2,
          wordBreak: 'break-all',
        }}
      >
        {data?.text}
      </Typography>
    </Box>
  );
}
