import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import * as sessionActions from './store/session';
import Navigation from './Components/Navigation/Navigation';
import LandingPage from './Components/LandingPage/LandingPage';
import CreateSpotForm from './Components/CreateSpotPage/CreateSpotForm';
import ManageSpots from './Components/ManageSpots/ManageSpots';
import SpotDetails from './Components/SpotsDetails/SpotsDetails';
import UpdateASpot from './Components/UpdateASpot/UpdateASpot';
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
      <Navigation isLoaded={isLoaded} />
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
        element: <LandingPage />
      },
      {
        path: '/new-spot',
        element: <CreateSpotForm />
      },
      {
        path: '/current',
        element: <ManageSpots />
      },
      {
        path: '/spots/:spotId',
        element: <SpotDetails />
      },
      {
        path: '/spots/:spotId/update',
        element: <UpdateASpot />
      },
      {
        path: '/*',
        element: <h1>Not Found Page </h1>
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;