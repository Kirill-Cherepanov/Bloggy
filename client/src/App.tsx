import { AppProvider } from 'providers/AppProvider';
import { AppRoutes } from 'routes';

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}
