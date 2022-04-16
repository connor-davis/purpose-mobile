import LoginPage from './loginPage';
import RegisterPage from './registerPage';
import { createSignal } from 'solid-js';
import { Box } from '@hope-ui/solid';

let AuthenticationPage = () => {
  let [login, toggleLogin] = createSignal(false);
  return (
    <Box w="$full" h="$full">
      {login() ? (
        <LoginPage toggleLogin={() => toggleLogin(!login())} />
      ) : (
        <RegisterPage toggleLogin={() => toggleLogin(!login())} />
      )}
    </Box>
  );
};

export default AuthenticationPage;
