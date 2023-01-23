import { ReactNode } from 'react';
import { Container, CssBaseline } from '@mui/material';

function App({ children }: { children: ReactNode }) {
  return (
    <Container sx={{ height: '100%', width: '100%' }} maxWidth="xl">
      <CssBaseline />
      {children}
    </Container>
  );
}

export default App;
