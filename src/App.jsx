import { HopeProvider, NotificationsProvider } from '@hope-ui/solid';
import PurposeApp from './PurposeApp';
import config from '../../purpose-app/src/config';
import { onMount } from 'solid-js';

function App() {
  onMount(() => {});

  return (
    <HopeProvider config={config}>
      <NotificationsProvider placement={'top-end'}>
        <PurposeApp />
      </NotificationsProvider>
    </HopeProvider>
  );
}

export default App;
