import AuthenticationPage from '../pages/authentication';
import { Box } from '@hope-ui/solid';
import apiUrl from '../apiUrl';
import axios from 'axios';
import { onMount } from 'solid-js';
import useState from '../hooks/state';

let AuthenticationGuard = ({ children, onAuthenticated = () => {} }) => {
  let [state, setState] = useState('authenticationGuard');

  onMount(() => {
    setTimeout(() => {
      axios
        .get(apiUrl + '/authentication/check', {
          headers: {
            authorization: 'Bearer ' + state.authenticationToken,
          },
        })
        .then(() => onAuthenticated())
        .catch((error) => {
          console.log(error);
          setState({ authenticationToken: undefined });
        });
    }, 300);
  });

  return (
    <Box w="$screenW" h="$screenH" overflow="hidden">
      {state.authenticationToken ? children : <AuthenticationPage />}
    </Box>
  );
};

export default AuthenticationGuard;
