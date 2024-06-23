'use client';

import React, { useEffect, useRef } from 'react';
import mapboxgl, { Map } from 'mapbox-gl';
import { cn } from '@/lib/utils';

import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken =
  'pk.eyJ1IjoiZ29zdG96byIsImEiOiJjbGt2NWFhcXQwNXZiM3BtejUzaW15cWN5In0.ljDeA9mdeOZUOsZkbnr2dQ';

function SimpleMap({
  className,
  latitude,
  longitude,
}: {
  className?: string;
  latitude: number;
  longitude: number;
}) {
  let mapContainer = useRef<HTMLDivElement>(null);
  let map = useRef<Map | null>(null) as React.MutableRefObject<Map | null>;

  useEffect(() => {
    if (map.current || !mapContainer.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [longitude, latitude],
      zoom: 14,
    });

    new mapboxgl.Marker({ anchor: 'center' })
      .setLngLat([longitude, latitude])
      .addTo(map.current);
  });

  return <div className={cn('h-32 w-96', className)} ref={mapContainer} />;
}

export default SimpleMap;
