import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Navigation } from '../../components/Navigation';
import { Header } from '../../components/Header';
import { ModalProvider } from '../../context/ModalContext';
import { ModalContainer } from '../../components/modals/ModalContainer';

export default function RootLayout() {
  return (
    <Box display="flex" minHeight="100vh">
      <Navigation />

      <Box width="100%">
        <Header />

        <Box padding={2}>
          <ModalProvider>
            <Outlet />

            <ModalContainer />
          </ModalProvider>
        </Box>
      </Box>
    </Box>
  );
}
