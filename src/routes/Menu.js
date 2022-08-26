import { useState, useEffect } from 'react';
import { dbService } from 'fbase';
import PropTypes from 'prop-types';
import UploadGimbap from 'components/UploadGimbap';
import UploadLocation from 'components/UploadLocation';
import ManageGimbap from 'components/ManageGimbap';
import ManageLocation from 'components/ManageLocation';
import OrderGimbap from 'components/OrderGimbap';
import Gimbap from 'components/Gimbap';
import 'routes/Menu.css';

function Menu({ user }) {
  const [gimbaps, setGimbaps] = useState([]);
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    dbService.collection("gimbaps").orderBy("price")
      .onSnapshot(snapshot => {
        const gimbapArray = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
      }));
      setGimbaps(gimbapArray);
    });
    dbService.collection("locations").orderBy("location")
    .onSnapshot(snapshot => {
      const locationArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
      setLocations(locationArray);
    });
  }, []);

  return (
    <div className="menu mx-auto mt-4">
      {(user && user.email === "ellylee2020@gmail.com") ? (
        <>
        <UploadGimbap gimbaps={gimbaps} />
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
          <OrderGimbap gimbaps={gimbaps} locations={locations} />
        ) : (
          <>
          <div className="mb-3 text-center">
            <h4>Sign in to place an order for pick up</h4>
          </div>
          {gimbaps.map(gimbap => (
            <Gimbap key={gimbap.id} gimbap={gimbap} />
          ))}
          </>
        ))
      )}
    </div>
  );
}

Menu.propTypes = {
  user: PropTypes.object
};

export default Menu;
