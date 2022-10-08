import { AppProvider } from 'providers/AppProvider';
import { AppRoutes } from 'routes';

import { useOnClickRerender } from 'hooks';

export default function App() {
  useOnClickRerender();
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}
