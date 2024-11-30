import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import { Box, Button, Typography } from '@mui/material';

const user = 'Guest';

export const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const params = useParams();

  const [header_title, setHeaderTitle] = useState('');

  useEffect(() => {
    if (pathname.endsWith('/frontend'))
      return setHeaderTitle('Frontend Test Task');

    if (pathname.endsWith('/backend'))
      return setHeaderTitle('Backend Test Task');

    if (pathname.endsWith('/journal')) return setHeaderTitle('Journal');

    if (pathname.includes('/journal') && params?.id)
      return setHeaderTitle(`Record ID ${params?.id}`);
  }, [pathname, params?.id]);

  return (
    <Box
      component="header"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      paddingInline={2}
      height={60}
      borderBottom={1}
    >
      <Box display="flex" alignItems="center" gap={3}>
        <Button
          onClick={() => navigate(-1)}
          disabled={pathname === '/user/demo'}
          sx={{
            p: 0,
            textTransform: 'initial',
            border: 1,
            padding: '5px 10px',
          }}
        >
          <ReplyRoundedIcon />
          Back
        </Button>
        <Typography component="h1" fontSize={{ xs: 20, sm: 24 }}>
          {header_title}
        </Typography>
      </Box>

      <Box display="flex" alignItems="center" gap={1}>
        <Typography
          component="h2"
          fontSize={20}
          display={{ xs: 'none', sm: 'block' }}
        >
          {user}
        </Typography>
        <Box
          width={45}
          height={45}
          borderRadius={45}
          display="flex"
          alignItems="center"
          justifyContent="center"
          bgcolor="primary.main"
          color="#fff"
          fontSize={26}
        >
          {user[0]}
        </Box>
      </Box>
    </Box>
  );
};
