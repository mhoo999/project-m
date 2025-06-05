import React, { createContext, useContext, useRef, useState } from 'react';

interface MapContextValue {
  map: any | null;
  setMap: (map: any) => void;
}

const MapContext = createContext<MapContextValue | undefined>(undefined);

export const MapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [map, setMap] = useState<any | null>(null);
  return (
    <MapContext.Provider value={{ map, setMap }}>
      {children}
    </MapContext.Provider>
  );
};

export function useMap() {
  const ctx = useContext(MapContext);
  if (!ctx) throw new Error('useMap must be used within a MapProvider');
  return ctx;
} 