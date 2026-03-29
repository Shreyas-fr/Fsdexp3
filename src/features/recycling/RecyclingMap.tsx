import { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import { icon as leafletIcon } from 'leaflet';
import { motion } from 'framer-motion';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import { useGeolocation } from '../../hooks/useGeolocation';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setSearchRadius } from '../../app/settingsSlice';
import { mockRecyclingCenters } from '../../mocks';
import type { RecyclingCenter, WasteType } from '../../types';

const wasteTypes: { type: WasteType; label: string; icon: string; color: string }[] = [
  { type: 'plastic', label: 'Plastic', icon: '♻️', color: 'blue' },
  { type: 'glass', label: 'Glass', icon: '🪟', color: 'green' },
  { type: 'e-waste', label: 'E-Waste', icon: '💻', color: 'amber' },
  { type: 'paper', label: 'Paper', icon: '📄', color: 'neutral' },
  { type: 'compost', label: 'Compost', icon: '🌿', color: 'green' },
  { type: 'metal', label: 'Metal', icon: '🔩', color: 'neutral' },
  { type: 'textiles', label: 'Textiles', icon: '👕', color: 'blue' },
];

const badgeVariant = (type: string): 'green' | 'amber' | 'blue' | 'neutral' => {
  if (['glass', 'compost'].includes(type)) return 'green';
  if (['e-waste'].includes(type)) return 'amber';
  if (['plastic', 'textiles'].includes(type)) return 'blue';
  return 'neutral';
};

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function createMarkerIcon(color: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="28" height="40">
    <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z" fill="${color}"/>
    <circle cx="12" cy="12" r="5" fill="white" opacity="0.9"/>
  </svg>`;
  return leafletIcon({
    iconUrl: `data:image/svg+xml;base64,${btoa(svg)}`,
    iconSize: [28, 40],
    iconAnchor: [14, 40],
    popupAnchor: [0, -40],
  });
}

const markerColors: Record<string, string> = {
  plastic: '#3b82f6',
  glass: '#22c55e',
  'e-waste': '#f59e0b',
  paper: '#a8a29e',
  compost: '#10b981',
  metal: '#78716c',
  textiles: '#6366f1',
};

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useMemo(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export default function RecyclingMap() {
  const { lat, lng, loading } = useGeolocation();
  const radius = useAppSelector((s) => s.settings.searchRadiusKm);
  const dispatch = useAppDispatch();
  const [activeFilters, setActiveFilters] = useState<WasteType[]>([]);
  const [selectedCenter, setSelectedCenter] = useState<RecyclingCenter | null>(null);

  const toggleFilter = (type: WasteType) => {
    setActiveFilters((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const filteredCenters = useMemo(() => {
    return mockRecyclingCenters.filter((center) => {
      const dist = haversineDistance(lat, lng, center.lat, center.lng);
      if (dist > radius) return false;
      if (activeFilters.length === 0) return true;
      return activeFilters.some((f) => center.acceptedTypes.includes(f));
    });
  }, [lat, lng, radius, activeFilters]);

  return (
    <div className="space-y-4 pb-20 lg:pb-0">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl lg:text-3xl font-display font-bold text-stone-100">
          Recycling Centers
        </h1>
        <p className="text-stone-400 mt-1 text-sm">
          Find recycling & composting near you • <span className="text-emerald-400">{filteredCenters.length}</span> centers found
        </p>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-3"
      >
        {/* Radius Slider */}
        <Card padding="sm">
          <div className="flex items-center gap-4">
            <label htmlFor="radius" className="text-xs font-medium text-stone-400 whitespace-nowrap">
              Radius
            </label>
            <input
              id="radius"
              type="range"
              min={2}
              max={25}
              value={radius}
              onChange={(e) => dispatch(setSearchRadius(+e.target.value))}
              className="flex-1 h-2 bg-stone-700/60 rounded-full appearance-none cursor-pointer accent-emerald-500
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-400
                [&::-webkit-slider-thumb]:cursor-pointer"
              aria-label="Search radius in kilometers"
            />
            <span className="text-sm font-bold text-emerald-400 min-w-[3rem] text-right">{radius} km</span>
          </div>
        </Card>

        {/* Waste Type Filters */}
        <div className="flex flex-wrap gap-2">
          {wasteTypes.map((wt) => (
            <button
              key={wt.type}
              onClick={() => toggleFilter(wt.type)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all
                ${activeFilters.includes(wt.type)
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : 'bg-stone-800/40 text-stone-400 border-stone-700/40 hover:border-stone-600'
                }`}
              aria-label={`Filter by ${wt.label}`}
              aria-pressed={activeFilters.includes(wt.type)}
            >
              <span>{wt.icon}</span>
              {wt.label}
            </button>
          ))}
          {activeFilters.length > 0 && (
            <button
              onClick={() => setActiveFilters([])}
              className="px-3 py-1.5 rounded-full text-xs text-stone-500 hover:text-stone-300 transition-colors"
            >
              Clear all
            </button>
          )}
        </div>
      </motion.div>

      {/* Map */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl overflow-hidden border border-stone-800/60"
        style={{ height: '450px' }}
      >
        {loading ? (
          <div className="h-full flex items-center justify-center bg-stone-900/60">
            <p className="text-sm text-stone-400">Loading your location...</p>
          </div>
        ) : (
          <MapContainer
            center={[lat, lng]}
            zoom={11}
            style={{ height: '100%', width: '100%' }}
            className="z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            <MapUpdater center={[lat, lng]} />
            <Circle
              center={[lat, lng]}
              radius={radius * 1000}
              pathOptions={{
                color: '#10b981',
                fillColor: '#10b981',
                fillOpacity: 0.05,
                weight: 1,
                dashArray: '5, 5',
              }}
            />
            {/* User location marker */}
            <Marker
              position={[lat, lng]}
              icon={createMarkerIcon('#10b981')}
            >
              <Popup>
                <div className="text-center">
                  <p className="font-semibold text-sm">Your Location</p>
                </div>
              </Popup>
            </Marker>
            {/* Recycling Center markers */}
            {filteredCenters.map((center) => {
              const primaryType = center.acceptedTypes[0] ?? 'paper';
              return (
                <Marker
                  key={center.id}
                  position={[center.lat, center.lng]}
                  icon={createMarkerIcon(markerColors[primaryType] ?? '#78716c')}
                  eventHandlers={{
                    click: () => setSelectedCenter(center),
                  }}
                >
                  <Popup>
                    <div className="min-w-[200px]">
                      <p className="font-semibold text-sm">{center.name}</p>
                      <p className="text-xs text-gray-600 mt-1">{center.address}</p>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        )}
      </motion.div>

      {/* Selected Center Detail Card */}
      {selectedCenter && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card glow>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-semibold text-stone-100">{selectedCenter.name}</h3>
                <p className="text-xs text-stone-400 mt-1">{selectedCenter.address}</p>
              </div>
              <button
                onClick={() => setSelectedCenter(null)}
                className="text-stone-500 hover:text-stone-300 p-1"
                aria-label="Close detail card"
              >
                ✕
              </button>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-stone-500">Hours</span>
                <p className="text-stone-300 mt-0.5">{selectedCenter.hours}</p>
              </div>
              <div>
                <span className="text-stone-500">Phone</span>
                <p className="text-stone-300 mt-0.5">{selectedCenter.phone}</p>
              </div>
              <div>
                <span className="text-stone-500">Rating</span>
                <p className="text-stone-300 mt-0.5">
                  {'⭐'.repeat(Math.round(selectedCenter.rating))} {selectedCenter.rating}
                </p>
              </div>
              <div>
                <span className="text-stone-500">Distance</span>
                <p className="text-stone-300 mt-0.5">
                  {haversineDistance(lat, lng, selectedCenter.lat, selectedCenter.lng).toFixed(1)} km
                </p>
              </div>
            </div>
            <div className="mt-3">
              <span className="text-xs text-stone-500">Accepts</span>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {selectedCenter.acceptedTypes.map((type) => (
                  <Badge key={type} variant={badgeVariant(type)} size="md">
                    {wasteTypes.find((w) => w.type === type)?.icon} {type}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
