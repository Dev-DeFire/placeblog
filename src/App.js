import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';

//import Users from './user/pages/Users';
//import NewPlace from './places/pages/NewPlace';
//import UserPlaces from './places/pages/UserPlaces';
//import UpdatePlace from './places/pages/UpdatePlace';
//import Auth from './user/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';

const Users = React.lazy(() => import('./user/pages/Users'));
const NewPlace = React.lazy(() => import('./places/pages/UserPlaces'));
const UserPlaces = React.lazy(() => import('./places/pages/UserPlaces'));
const UpdatePlace = React.lazy(() => import('./places/pages/UpdatePlace'));
const Auth = React.lazy(() => import('./user/pages/Auth'));
const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Routes>
      <Route path='/' exact element={<Users />} />
      <Route path='/:userId/places' exact element={<UserPlaces />} />
      <Route path='/places/new' exact element={<NewPlace />} />
      <Route path='/places/:placeId' exact element={<UpdatePlace />}></Route>
      <Route path='*' element={<Users />} />
    </Routes>
    );
  } else {
    routes = (
      <Routes>
      <Route path='/' exact element={<Users />} />
      <Route path='/:userId/places' exact element={<UserPlaces />} />
      <Route path='/auth' exact element={<Auth />}></Route>
      {/* <Route path='*' element={<Navigate to='/' replace={false} />} />  User redirect to user page for undefined path */}
      <Route path='*' element={<Auth />} />
    </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}>
      <Router>
        <MainNavigation />
        <main>
          <Suspense
            fallback={
              <div className='center'>
                <LoadingSpinner />
              </div>
            }>
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
