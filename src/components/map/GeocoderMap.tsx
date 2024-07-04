'use client';

import React, { useEffect, useRef, useState } from 'react';
import Map, {
  GeolocateControl,
  MapRef,
  Marker,
  NavigationControl,
} from 'react-map-gl';
import GeocoderControl from '@/components/map/GeocoderControl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { getAddress } from '@/lib/utils';

type Props = {
  oldData?: { latitude: number; longitude: number };
  onSelect: (selection: MapboxGeocoder.Result) => void;
};

function GeocoderMap({ onSelect, oldData }: Props) {
  const mapRef = useRef<MapRef>(null);
  const [selected, setSelected] = useState<MapboxGeocoder.Result>();
  const [flashHide, setFlashHide] = useState(false);

  function handleSelection(event: MapboxGeocoder.Result) {
    setFlashHide(true);
    setSelected(event);
    onSelect(event);
  }

  useEffect(() => {
    if (flashHide) {
      setTimeout(() => {
        setFlashHide(false);
        if (selected) {
          mapRef?.current?.resize();
          mapRef?.current?.flyTo({
            center: {
              lon: selected?.geometry.coordinates[0],
              lat: selected?.geometry.coordinates[1],
            },
            zoom: 15,
            //speed: 5,
            //curve: 1,
            //easing(t) {
            //  return t;
            //},
          });
        }
      }, 500);
    }
  }, [flashHide]);

  return (
    <div hidden={flashHide}>
      <Map
        ref={mapRef}
        dragPan={!!selected}
        scrollZoom={!!selected}
        trackResize={true}
        style={
          oldData || selected
            ? {
                width: '100%',
                height: '250px',
              }
            : {
                width: '100%',
                height: 'calc(80svh - 8rem)',
              }
        }
        mapboxAccessToken={
          'pk.eyJ1IjoiZ29zdG96byIsImEiOiJjbGt2NWFhcXQwNXZiM3BtejUzaW15cWN5In0.ljDeA9mdeOZUOsZkbnr2dQ'
        }
        mapStyle="mapbox://styles/mapbox/streets-v12"
        initialViewState={{
          latitude: oldData?.latitude || 45.0044,
          longitude: oldData?.longitude || 16.3451,
          zoom: oldData ? 15 : 5.5,
        }}
        maxZoom={20}
        minZoom={3}
      >
        <>
          <GeolocateControl position="bottom-left" />
          <NavigationControl position="top-right" />
        </>
        (
        <GeocoderControl
          flyTo={false}
          collapsed={true}
          countries={'HR'}
          onResult={handleSelection}
          mapboxAccessToken={
            'pk.eyJ1IjoiZ29zdG96byIsImEiOiJjbGt2NWFhcXQwNXZiM3BtejUzaW15cWN5In0.ljDeA9mdeOZUOsZkbnr2dQ'
          }
          position="top-left"
        />
        )
        {oldData?.longitude && oldData?.latitude && (
          <Marker longitude={oldData.longitude} latitude={oldData.latitude} />
        )}
      </Map>
    </div>
  );
}

export default GeocoderMap;
