import AuthProvider from './context/UserProvider';
import { AppRouter } from './routes/AppRouter';

export const App = () => {
  return (
    <>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </>
  )
}
