import { Plugins } from '@capacitor/core';
import {
  Box, createDisclosure, Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  HStack, notificationService, Radio,
  RadioGroup,
  RadioLabel,
  Tooltip,
  VStack
} from '@hope-ui/solid';
import axios from 'axios';
import { Route, Routes, useLocation, useNavigate } from 'solid-app-router';
import { createMemo, onMount } from 'solid-js';
import apiUrl from './apiUrl';
import PurposeLogoSmall from './components/PurposeLogoSmall';
import AuthenticationGuard from './guards/AuthenticationGuard';
import useState from './hooks/state';
import IconCash from './icons/IconCash';
import IconCube from './icons/IconCube';
import IconDocumentsIn from './icons/IconDocumentsIn';
import IconHome from './icons/IconHome';
import IconLogout from './icons/IconLogout';
import IconProfile from './icons/IconProfile';
import DashboardPage from './pages/dashboard/dashboardPage';
import ProductsPage from './pages/products/productsPage';
import ProfilePage from './pages/profile/profilePage';


let { Network } = Plugins;

function App() {
  let [user, setUser, clearUser] = useState('userState');
  let [auth, setAuth, clearAuth] = useState('authenticationGuard');

  let { isOpen, onOpen, onClose } = createDisclosure();
  let navigate = useNavigate();

  let location = useLocation();

  let path = createMemo(() =>
    location.pathname.split('/')[1] !== ''
      ? '/' + location.pathname.split('/')[1]
      : '/'
  );

  onMount(() => {
    (async () => {
      let status = await Network.getStatus();

      alert(status);
    })();
  });

  let loadProfile = () => {
    notificationService.show({
      id: 'user-data-fetch-notification',
      title: 'Purpose',
      description: 'We are loading your profile, please wait.',
      persistent: true,
      closable: false,
      loading: true,
    });

    axios
      .get(apiUrl + '/users', {
        headers: { Authorization: 'Bearer ' + auth.authenticationToken },
      })
      .then((response) => {
        if (response.data.error)
          return notificationService.update({
            id: 'user-data-fetch-notification',
            status: 'danger',
            title: 'Purpose',
            description: 'We were unable to retrieve your profile.',
            duration: 2000,
          });
        else {
          setUser(response.data.data);

          return notificationService.update({
            id: 'user-data-fetch-notification',
            status: 'success',
            title: 'Purpose',
            description: 'Welcome back, ' + user.displayName,
            duration: 2000,
          });
        }
      });
  };

  return (
    <AuthenticationGuard onAuthenticated={() => loadProfile()}>
      <Drawer opened={isOpen()} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="$gray900">
          <DrawerCloseButton color="white" />
          <HStack justifyContent="center" alignItems="center" p="$3">
            <Box w="$10" h="$10">
              <PurposeLogoSmall />
            </Box>
          </HStack>

          <DrawerBody color="white">
            <RadioGroup w="100%">
              <VStack spacing="$2">
                <Tooltip
                  label="Dashboard"
                  placement="right"
                  color="white"
                  bg="$blackAlpha11"
                >
                  <Radio
                    name="dashboard"
                    rounded="$md"
                    shadow="$2xl"
                    bg={path() === '/' ? '$lime400' : '$gray800'}
                    color={path() === '/' ? 'white' : '$lime400'}
                    borderColor="none"
                    px="$4"
                    py="$3"
                    w="$full"
                    outline="none"
                    onClick={() => {
                      navigate('/');
                      onClose();
                    }}
                  >
                    <RadioLabel>
                      <HStack h="$10" spacing="$5">
                        <IconHome w="$8" h="$8" />
                        <Box as="div" class="select-none">
                          Dashboard
                        </Box>
                      </HStack>
                    </RadioLabel>
                  </Radio>
                </Tooltip>
                <Tooltip
                  label="Products"
                  placement="right"
                  color="white"
                  bg="$blackAlpha11"
                >
                  <Box
                    cursor="pointer"
                    rounded="$md"
                    shadow="$2xl"
                    bg={path() === '/products' ? '$lime400' : '$gray800'}
                    color={path() === '/products' ? 'white' : '$lime400'}
                    borderColor="none"
                    px="$4"
                    py="$3"
                    w="$full"
                    outline="none"
                    onClick={() => {
                      navigate('/products');
                      onClose();
                    }}
                  >
                    <HStack h="$10" spacing="$5">
                      <IconCube w="$8" h="$8" />
                      <Box as="div" class="select-none">
                        Products
                      </Box>
                    </HStack>
                  </Box>
                </Tooltip>
                <Tooltip
                  label="Sales"
                  placement="right"
                  color="white"
                  bg="$blackAlpha11"
                >
                  <Box
                    cursor="pointer"
                    rounded="$md"
                    shadow="$2xl"
                    bg={path() === '/' ? '$lime400' : '$gray800'}
                    color={path() === '/' ? 'white' : '$lime400'}
                    borderColor="none"
                    px="$4"
                    py="$3"
                    w="$full"
                    outline="none"
                    onClick={() => {
                      navigate('/');
                      onClose();
                    }}
                  >
                    <HStack h="$10" spacing="$5">
                      <IconCash w="$8" h="$8" />
                      <Box as="div" class="select-none">
                        Sales
                      </Box>
                    </HStack>
                  </Box>
                </Tooltip>
                <Tooltip
                  label="Expenses"
                  placement="right"
                  color="white"
                  bg="$blackAlpha11"
                >
                  <Box
                    cursor="pointer"
                    rounded="$md"
                    shadow="$2xl"
                    bg={path() === '/' ? '$lime400' : '$gray800'}
                    color={path() === '/' ? 'white' : '$lime400'}
                    borderColor="none"
                    px="$4"
                    py="$3"
                    w="$full"
                    outline="none"
                    onClick={() => {
                      navigate('/');
                      onClose();
                    }}
                  >
                    <HStack h="$10" spacing="$5">
                      <IconDocumentsIn />
                      <Box as="div" class="select-none">
                        Expenses
                      </Box>
                    </HStack>
                  </Box>
                </Tooltip>
              </VStack>
            </RadioGroup>
          </DrawerBody>

          <DrawerFooter>
            <VStack w="100%" spacing="$10">
              <RadioGroup w="100%">
                <VStack w="100%" spacing="$2">
                  <Tooltip
                    label="Profile"
                    placement="right"
                    color="white"
                    bg="$blackAlpha11"
                    w="100%"
                  >
                    <Radio
                      name="profile"
                      rounded="$md"
                      shadow="$2xl"
                      bg={path() === '/profile' ? '$lime400' : '$gray800'}
                      color={path() === '/profile' ? 'white' : '$lime400'}
                      borderColor="none"
                      px="$4"
                      py="$3"
                      w="100%"
                      outline="none"
                      onClick={() => {
                        navigate('/profile');
                        onClose();
                      }}
                    >
                      <RadioLabel>
                        <HStack h="$10" spacing="$5">
                          <IconProfile w="$8" h="$8" />
                          <Box as="div" class="select-none">
                            Profile
                          </Box>
                        </HStack>
                      </RadioLabel>
                    </Radio>
                  </Tooltip>
                  <Tooltip
                    label="Logout"
                    placement="right"
                    color="white"
                    bg="$blackAlpha11"
                  >
                    <Box
                      cursor="pointer"
                      rounded="$md"
                      shadow="$2xl"
                      bg="$gray800"
                      color="white"
                      borderColor="none"
                      px="$4"
                      py="$3"
                      w="$full"
                      outline="none"
                      _hover={{ bg: '$red600', color: 'white' }}
                      onClick={() => {
                        clearUser();
                        clearAuth();

                        window.location.reload();

                        onClose();
                      }}
                    >
                      <HStack h="$10" spacing="$5">
                        <IconLogout />
                        <Box as="div" class="select-none">
                          Logout
                        </Box>
                      </HStack>
                    </Box>
                  </Tooltip>
                </VStack>
              </RadioGroup>
            </VStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <VStack
        w="$full"
        h="$full"
        spacing="$5"
        bg="$gray900"
        color="white"
        overflow="hidden"
      >
        <HStack
          w="$screenW"
          p="$5"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box w="$8" bg="transparent" color="white" onClick={onOpen}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </Box>

          <Box>Welcome, {user.displayName}</Box>
        </HStack>
        <Box
          w="$full"
          h="$full"
          borderTopRadius="$2xl"
          color="$gray900"
          bg="white"
          p="$5"
        >
          <Routes>
            <Route path="/" component={<DashboardPage />} />
            <Route path="/profile" component={<ProfilePage />} />
            <Route path="/products" component={<ProductsPage />} />
          </Routes>
        </Box>
      </VStack>
    </AuthenticationGuard>
  );
}

export default App;
