import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { faBell, faLayerGroup, faPlusCircle, faStream } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition, library } from '@fortawesome/fontawesome-svg-core';
import { NetworkViewController, Home, Notifications, Login, NotFound } from '@Pages';
import { Theme } from '@Themes';
import PrivateRoute from './privateRoute';
import './app.scss';

library.add(
  faBell as IconDefinition,
  faLayerGroup as IconDefinition,
  faPlusCircle as IconDefinition,
  faStream as IconDefinition,
);

const App = () => {
  const buildPrivateRoute = (page: JSX.Element) => <PrivateRoute>{page}</PrivateRoute>;

  return (
    <BrowserRouter>
      <Theme>
        <Routes>
          <Route path="network" element={buildPrivateRoute(<NetworkViewController />)} />
          <Route path="notifications" element={buildPrivateRoute(<Notifications />)} />
          <Route path="login" element={<Login />} />
          <Route path="/" element={buildPrivateRoute(<Home />)} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Theme>
    </BrowserRouter>
  );
};

export default App;
