import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  VStack,
  notificationService
} from '@hope-ui/solid';

import PurposeLogo from '../../components/PurposeLogo';
import apiUrl from '../../apiUrl';
import axios from 'axios';
import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import useState from '../../hooks/state';

let LoginPage = ({ toggleLogin = () => {} }) => {
  let [user, updateUser] = useState('userState');
  let [authenticationGuard, updateAuthenticationGuard] = useState(
    'authenticationGuard'
  );

  let [message, setMessage] = createStore({});

  let [email, setEmail] = createSignal('');
  let [password, setPassword] = createSignal('');

  let authenticate = () => {
    axios
      .post(
        apiUrl + '/auth/login',
        {
          email: email(),
          password: password(),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        if (response.data.error)
          return notificationService.show({
            status: 'danger',
            title: 'Purpose',
            description: 'Unable to log in - ' + response.data.message,
          });
        else {
          updateUser({
            ...response.data.data,
            authenticationToken: undefined,
          });
          updateAuthenticationGuard({
            authenticationToken: response.data.data.authenticationToken,
          });

          notificationService.show({
            status: 'success',
            title: 'Purpose',
            description: response.data.message,
          });
        }
      });
  };

  return (
    <Box class="relative w-full h-full">
      <Box position="absolute" top="$5" right="$5">
        {message.type && (
          <Alert status={message.type} variant="left-accent">
            <AlertIcon />
            {message.value}
          </Alert>
        )}
      </Box>

      <Center bg="white" class="w-full h-full">
        <VStack spacing="$10">
          <VStack spacing="$5">
            <Box w="100%" h="auto" p="$10">
              <PurposeLogo />
            </Box>

            <Box color="#a3a3a3">
              Do not have an account yet?{' '}
              <Box
                as="span"
                color="$lime400"
                cursor="pointer"
                onClick={() => toggleLogin()}
              >
                Create account
              </Box>
            </Box>
          </VStack>

          <form>
            <VStack
              bg="white"
              shadow="$2xl"
              borderRadius="$2xl"
              borderWidth="1px"
              borderColor="#e5e5e5"
              p="$5"
              rounded="$2xl"
              spacing="$8"
              w={{ '@initial': '300px', '@sm': '300px', '@md': '400px' }}
            >
              <VStack spacing="$5" w="100%">
                <FormControl required>
                  <FormLabel for="email" color="black">
                    Email
                  </FormLabel>
                  <Input
                    variant="unstyled"
                    bg="#e5e5e5"
                    p="$3"
                    placeholder="Your email"
                    size="md"
                    color="black"
                    id="email"
                    type="email"
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                  <FormHelperText>We'll never share your email.</FormHelperText>
                </FormControl>

                <VStack w="100%">
                  <FormControl required>
                    <FormLabel for="email" color="black">
                      Password
                    </FormLabel>
                    <Input
                      variant="unstyled"
                      bg="#e5e5e5"
                      p="$3"
                      placeholder="Your email"
                      size="md"
                      color="black"
                      id="password"
                      type="password"
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                    />
                    {/* <FormHelperText>Atleast 8 characters.</FormHelperText> */}
                  </FormControl>
                </VStack>
              </VStack>

              <Box w="100%">
                <Button
                  color="black"
                  rounded="$md"
                  bg="$lime400"
                  w="100%"
                  variant="solid"
                  shadow="$2xl"
                  colorScheme="$lime400"
                  onClick={() => authenticate()}
                >
                  Login
                </Button>
              </Box>
            </VStack>
          </form>
        </VStack>
      </Center>
    </Box>
  );
};

export default LoginPage;
