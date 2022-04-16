import AuthenticationPage from '../pages/authentication';
import apiUrl from '../apiUrl';
import axios from 'axios';
import { onMount } from 'solid-js';
import useState from '../hooks/state';
import { Box } from '@hope-ui/solid';

let AuthenticationGuard = ({ children, onAuthenticated = () => {} }) => {
  let [state, update] = useState('authenticationGuard');

  onMount(() => {
    setTimeout(() => {
      axios
        .get(apiUrl + '/authentication/check', {
          headers: {
            authorization: 'Bearer ' + state.authenticationToken,
          },
        })
        .then((response) => {
          if (response.data === 'Authorized') return onAuthenticated();
        })
        .catch((error) => {
          console.log(error);
          update({ authenticationToken: undefined });
        });
    }, 300);
  });

  return (
    <Box w="$screenW" h="$screenH">
      {state.authenticationToken ? children : <AuthenticationPage />}
    </Box>
  );
};

export default AuthenticationGuard;
