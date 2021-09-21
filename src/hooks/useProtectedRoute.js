import { useEffect } from 'react';
import fire from "../fire";
import { useHistory } from 'react-router-dom';

export default function useProtectedRoute() {
  const history = useHistory();

  useEffect(() => {
    fire.auth().onAuthStateChanged(function(user) {
        if (!user) {
            console.log('You need to be logged in to see that page.');

            history.push('/login')
        }
    });
  }, [history]);
}
