import React from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl
});

const SANTA_CRUZ_CENTER = [-17.7833, -63.1833];

const MapModal = ({ isOpen, onClose, origin, destination }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg w-full max-w-4xl mx-4 z-10">
        <button
          onClick={onClose}
          className="absolute right-2 top-2 z-10 p-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <div className="h-[600px] w-full rounded-lg overflow-hidden">
          <MapContainer
            center={SANTA_CRUZ_CENTER}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {origin && <Marker position={[origin.lat, origin.lng]} />}
            {destination && <Marker position={[destination.lat, destination.lng]} />}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default MapModal;