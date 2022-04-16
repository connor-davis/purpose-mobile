import { Route, Routes } from 'solid-app-router';

import AuthenticationGuard from './guards/authenticationGuard';
import DashboardPage from './pages/dashboard/dashboardPage';
import NoType from './components/NoType';
import RootPage from './pages/root/rootPage';
import SetupProfilePage from './pages/setup/setupProfilePage';
import useState from './hooks/state';
import ProductsPage from './pages/products/productsPage';
import ProfilePage from './pages/profile/profilePage';
import axios from 'axios';
import apiUrl from './apiUrl';
import { notificationService } from '@hope-ui/solid';

let PurposeApp = () => {
  let [userState, setUserState] = useState('userState');
  let [authState, setAuthState] = useState('authenticationGuard');

  let loadProfile = () => {
    setTimeout(() => {
      document.title = document.title + ' | Loading Profile';

      notificationService.show({
        id: 'loading-user-profile',
        persistent: true,
        closable: false,
        loading: true,
        title: 'Purpose',
        description: 'Loading your profile.',
      });

      setTimeout(() => {
        axios
          .get(apiUrl + '/users', {
            headers: {
              Authorization: 'Bearer ' + authState.authenticationToken,
            },
          })
          .then((response) => {
            if (response.data.error)
              return notificationService.hide('loading-user-profile');
            else {
              let data = response.data.data;

              notificationService.update({
                id: 'loading-user-profile',
                status: 'success',
                title: 'Purpose',
                description: 'Your profile has been loaded.',
                duration: 2000,
                closable: true,
              });

              switch (data.type) {
                case 'admin':
                  document.title = document.title + ' | Admin';
                  break;

                default:
                  if (data.displayName) {
                    document.title = `Purpose | ${data.displayName}`;
                    break;
                  }

                  document.title = 'Purpose | Welcome';
                  break;
              }
            }
          });
      }, 3000);
    }, 100);
  };

  let showSetupProfileRequest = () => {
    let requiredFields = [
      'firstName',
      'lastName',
      'idNumber',
      'age',
      'gender',
      'ethnicity',
      'streetAddress',
      'suburb',
      'city',
      'areaCode',
      'province',
      'country',
      'type',
      'displayName',
      'accountNumber',
      'bankName',
      'bankBranch',
      // 'photo',
    ];

    let weight = requiredFields
      .map((field) => {
        if (userState[field] === undefined) return field;
      })
      .filter((field) => field);

    if (weight.length > 1) return true;
    else return false;
  };

  return (
    <AuthenticationGuard onAuthenticated={() => loadProfile()}>
      {showSetupProfileRequest() && (
        <Routes>
          <Route path="/" exact element={<NoType />} />

          <Route path="/setupProfile" element={<SetupProfilePage />} />
        </Routes>
      )}

      {!showSetupProfileRequest() && (
        <>
          {userState.type !== 'admin' && (
            <Routes>
              <Route path="/" element={<RootPage />}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Routes>
          )}
        </>
      )}
    </AuthenticationGuard>
  );
};

export default PurposeApp;
