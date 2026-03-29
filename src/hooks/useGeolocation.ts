import { useState, useEffect } from 'react';

interface GeolocationState {
  lat: number;
  lng: number;
  loading: boolean;
  error: string | null;
}

// Default: San Francisco
const DEFAULT_LAT = 37.7749;
const DEFAULT_LNG = -122.4194;

export function useGeolocation(): GeolocationState {
  const [state, setState] = useState<GeolocationState>({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState((s) => ({ ...s, loading: false, error: 'Geolocation not supported' }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setState({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          loading: false,
          error: null,
        });
      },
      (err) => {
        setState((s) => ({
          ...s,
          loading: false,
          error: err.message,
        }));
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }, []);

  return state;
}
