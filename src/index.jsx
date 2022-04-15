import './index.css';

import { HopeProvider, NotificationsProvider } from '@hope-ui/solid';

import App from './App';
import { Router } from 'solid-app-router';
import config from './config';
import { render } from 'solid-js/web';

let Routed = () => {
  return (
    <Router>
      <HopeProvider config={config}>
        <NotificationsProvider>
          <App />
        </NotificationsProvider>
      </HopeProvider>
    </Router>
  );
};

render(() => <Routed />, document.getElementById('root'));
