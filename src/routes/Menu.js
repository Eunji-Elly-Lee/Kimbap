import { useState, useEffect } from 'react';
import { dbService, authService } from 'fbase';
import PropTypes from 'prop-types';
import UploadGimbap from 'components/UploadGimbap';
import UploadLocation from 'components/UploadLocation';
import ManageGimbap from 'components/ManageGimbap';
import ManageLocation from 'components/ManageLocation';
import 'routes/Menu.css';

function Menu({ user }) {
  const [gimbaps, setGimbaps] = useState([]);
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    const unsubscribeGimbap = dbService.collection("gimbaps")
      .orderBy("price")
      .onSnapshot(snapshot => {
        const gimbapArray = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
      }));
      setGimbaps(gimbapArray);
    });
    const unsubscribeLocation = dbService.collection("locations")
      .onSnapshot(snapshot => {
        const locationArray = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
      }));
      setLocations(locationArray);
    });
    authService.onAuthStateChanged((user) => {
      if (user == null) {
        unsubscribeGimbap();
        unsubscribeLocation();
      }
    });
  }, []);

  return (
    <div className="menu mx-auto mt-4">
      {(user && user.email === "lizyduck@gmail.com") ? (
        <>
        <UploadGimbap />
        <UploadLocation />
        <div className="mt-4">
          <h4>Gimbaps</h4>
          {gimbaps.map(gimbap => (
            <ManageGimbap key={gimbap.id} gimbap={gimbap} />
          ))}
          <h4>Locations</h4>
          {locations.map(location => (
            <ManageLocation key={location.id} location={location} />
          ))}
        </div>
        </>
      ) : (
        (user ? (
          <></>
        ) : (
          <></>
        ))
      )}
    </div>
  );
}

Menu.propTypes = {
  user: PropTypes.object
};

export default Menu;
