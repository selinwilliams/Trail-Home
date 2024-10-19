import Header from './components/Header/Header'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import * as sessionActions from './store/session';
import CreateASpot from './screens/CreateASpot/CreateASpot';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import SpotDetails from './screens/SpotDetails/components/SpotDetails'
import ManageSpots from './screens/ManageSpots/ManageSpots';
import UpdateASpot from './screens/UpdateASpot/UpdateASpot';
import LandingPage from './screens/LandingPage/Components/LandingPage';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Header isLoaded={isLoaded}/>
      {isLoaded && <Outlet />}
    </>
  );
}
  
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage/>
      },
      {
        path: '/spots/:id',
        element: <SpotDetails />
      },
      {
        path: '/spots',
        element: <CreateASpot />
      },
      {
        path: '/spots/manage',
        element: <ManageSpots />
      },
      {
        path: '/spots/:id/update',
        element: <UpdateASpot />
      },
      {
        path: '/*',
        element: <NotFoundPage />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;