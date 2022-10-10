import { AppProvider } from 'providers/AppProvider';
import { AppRoutes } from 'routes';

import { useOnClickRerender } from 'hooks';

export default function App() {
  // I use this to test if there are any unnecessary component re-renders
  useOnClickRerender();

  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}
