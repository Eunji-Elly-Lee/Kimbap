import { useState, useEffect } from 'react';
import { dbService } from 'fbase';
import PropTypes from 'prop-types';
import Loading from 'components/Loading';
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
  const [gimbapsReady, setGimbapsReady] = useState(false);
  const [locationsReady, setLocationsReady] = useState(false);
  const [imagesReady, setImagesReady] = useState(false);
  const loading = !(gimbapsReady && locationsReady && imagesReady);

  useEffect(() => {
    if (gimbapsReady && locationsReady) {
      let loadedCount = 0;
      const total = gimbaps.length;
      if (total === 0) {
        setImagesReady(true);
        return;
      }

      gimbaps.forEach((g) => {
        const img = new Image();
        img.src = g.imageUrl;
        img.onload = img.onerror = () => {
          loadedCount++;
          if (loadedCount === total) {
            setImagesReady(true);
          }
        };
      });
    }
  }, [gimbapsReady, locationsReady, gimbaps]);

  useEffect(() => {
    const unsubGimbaps = dbService.collection("gimbaps").orderBy("price")
      .onSnapshot(snapshot => {
        const gimbapArray = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setGimbaps(gimbapArray);
        setGimbapsReady(true);
      });
    const unsubLocations = dbService.collection("locations").orderBy("location")
      .onSnapshot(snapshot => {
        const locationArray = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setLocations(locationArray);
        setLocationsReady(true);
      });

    return () => {
      unsubGimbaps();
      unsubLocations();
    };
  }, []);

  if (loading) {
    return (
      <Loading />
    );
  }

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
