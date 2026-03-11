"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
  Tooltip,
} from "react-leaflet";
import type { LatLngTuple } from "leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useLocale, useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import type {
  Address,
  AddressDraft,
  AddressFields,
} from "@/lib/types/addresses";
import { useAddAddress } from "@/hooks/address/use-add-address";
import { reverseGeocodeAction } from "@/lib/actions/address/reverse-geolocation";
import { useUpdateAddress } from "@/hooks/address/use-update-address";

// Types
type LocationPermission = "granted" | "denied" | null;

type AddressMapProps = {
  setFullAddress: React.Dispatch<React.SetStateAction<AddressDraft | null>>;
  fullAdress: AddressFields | null;
  closeModal: (open: boolean) => void;
  formTitle: "create" | "update";
  currentAdress: Address | null;
};

type PlaceInfo = {
  city: string;
  country: string;
  displayName: string;
};

// Fix for default markers in react-leaflet
const DefaultIconProto = Icon.Default.prototype as unknown as {
  _getIconUrl?: unknown;
};

delete DefaultIconProto._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom component to update map center
type MapUpdaterProps = {
  center: LatLngTuple;
  zoom: number;
};

function MapUpdater({ center, zoom }: MapUpdaterProps) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
}

// Allow user to pick location by click or dragend
type MapPickerProps = {
  onPick: (latlng: LatLngTuple) => void;
};

function MapPicker({ onPick }: MapPickerProps) {
  useMapEvents({
    click(e) {
      onPick([e.latlng.lat, e.latlng.lng]);
    },
    dragend(e) {
      const map = e.target;
      const c = map.getCenter();
      onPick([c.lat, c.lng]);
    },
  });

  return null;
}

//Google style Pin Icon (drop pin)
const googlePinIcon = new Icon({
  iconUrl:
    "data:image/svg+xml;base64," +
    btoa(`
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 2C15.7157 2 9 8.71573 9 17C9 29 24 46 24 46C24 46 39 29 39 17C39 8.71573 32.2843 2 24 2Z" fill="#EA4335" stroke="white" stroke-width="3"/>
      <circle cx="24" cy="17" r="6.5" fill="white"/>
    </svg>
  `),
  iconSize: [44, 44],
  iconAnchor: [22, 42], // bottom point
  popupAnchor: [0, -36],
  tooltipAnchor: [0, -34],
});

export default function AddressMap({
  fullAdress,
  closeModal,
  formTitle,
  currentAdress,
}: AddressMapProps) {
  // Locale
  const locale = useLocale();
  const t = useTranslations();
  // Session
  const session = useSession();

  // Variables
  const userName =
    `${session.data?.user?.firstName ?? "User"} ${
      session.data?.user?.lastName ?? ""
    }`.trim() || "User";

  // Default
  const DEFAULT_EGYPT: LatLngTuple = useMemo(() => [26.8206, 30.8025], []);

  // States
  const [position, setPosition] = useState<LatLngTuple>(DEFAULT_EGYPT);
  const [userLocation, setUserLocation] = useState<LatLngTuple | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [geoLoading, setGeoLoading] = useState<boolean>(false);
  const [place, setPlace] = useState<PlaceInfo | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [locationPermission, setLocationPermission] =
    useState<LocationPermission>(null);

  // Mutation
  const { addAddressisPending, onAddAddress } = useAddAddress();
  const { onUpdateAddress, updateAddressisPending } = useUpdateAddress();
  // Refs (debounce + abort) for reverse-geocode
  const debounceRef = useRef<number | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Auto set location on mount (if permission granted)
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      setPosition(DEFAULT_EGYPT);
      setUserLocation(null);
      return;
    }

    setLoading(true);
    setError(null);

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 8000,
      maximumAge: 60000,
    };

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const newPosition: LatLngTuple = [latitude, longitude];

        setUserLocation(newPosition);
        setPosition(newPosition);
        setLocationPermission("granted");
        setLoading(false);
      },
      () => {
        // fallback default
        setUserLocation(null);
        setPosition(DEFAULT_EGYPT);
        setLocationPermission("denied");
        setLoading(false);
      },
      options,
    );
  }, [DEFAULT_EGYPT]);

  //Reverse Geocode using Route Handler (country + city)
  useEffect(() => {
    if (!userLocation) {
      setPlace(null);
      return;
    }

    // debounce
    if (debounceRef.current) window.clearTimeout(debounceRef.current);

    debounceRef.current = window.setTimeout(async () => {
      // abort previous
      if (abortRef.current) abortRef.current.abort();
      abortRef.current = new AbortController();

      try {
        setGeoLoading(true);

        const [lat, lon] = userLocation;

        const data = await reverseGeocodeAction({
          lat,
          lon,
          locale,
          signal: abortRef.current.signal,
        });

        setPlace({
          city: data.city || "",
          country: data.country || "",
          displayName: data.displayName || "",
        });
      } catch (e) {
        if (e instanceof Error) {
          if (e?.name !== "AbortError") setPlace(null);
        }
      } finally {
        setGeoLoading(false);
      }
    }, 450);

    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      if (abortRef.current) abortRef.current.abort();
    };
  }, [userLocation, locale]);

  // Functions
  const getCurrentLocation = (): void => {
    if (!navigator.geolocation) {
      setError(t("geolocation-is-not-supported-by-this-browser"));
      return;
    }

    setLoading(true);
    setError(null);

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000,
    };

    navigator.geolocation.getCurrentPosition(
      (pos: GeolocationPosition) => {
        const { latitude, longitude } = pos.coords;

        const newPosition: LatLngTuple = [latitude, longitude];

        setUserLocation(newPosition);
        setPosition(newPosition);
        setLoading(false);
        setLocationPermission("granted");
      },
      (geoError: GeolocationPositionError) => {
        setLoading(false);
        setLocationPermission("denied");

        switch (geoError.code) {
          case geoError.PERMISSION_DENIED:
            setError(
              t("location-access-denied-please-enable-location-services"),
            );
            break;
          case geoError.POSITION_UNAVAILABLE:
            setError(t("location-information-is-unavailable"));
            break;
          case geoError.TIMEOUT:
            setError(t("location-request-timed-out-please-try-again"));
            break;
          default:
            setError(t("an-unknown-error-occurred-while-retrieving-location"));
            break;
        }

        // fallback
        setUserLocation(null);
        setPosition(DEFAULT_EGYPT);
      },
      options,
    );
  };

  // user picks manually
  function handlePickLocation(latlng: LatLngTuple) {
    setError(null);
    setUserLocation(latlng);
    setPosition(latlng);
  }

  function handleSetNewAddress() {
    if (!userLocation) return;

    if (!fullAdress) {
      setError(t('please-fill-address-data-first'));
      return;
    }

    if (formTitle === "create") {
      onAddAddress(
        {
          ...fullAdress,
          lat: String(userLocation[0]),
          long: String(userLocation[1]),
          username: userName,
          city: place?.city || fullAdress.city,
        },
        {
          onSuccess: () => {
            closeModal(false);
          },
        },
      );
    }

    if (formTitle === "update" && currentAdress) {
      onUpdateAddress(
        {
          addressId: currentAdress?._id,
          values: {
            ...fullAdress,
            lat: String(userLocation[0]),
            long: String(userLocation[1]),
            username: userName,
            city: place?.city || fullAdress.city,
          },
        },
        {
          onSuccess: () => {
            closeModal(false);
          },
        },
      );
    }
  }

  // Tooltip text (hover)
  const hoverTitle =
    place?.displayName ||
    (userLocation
      ? `${userLocation[0].toFixed(6)}, ${userLocation[1].toFixed(6)}`
      : "Egypt");

  return (
    <div className="w-full">
      <div className="relative w-full overflow-hidden rounded-xl border border-zinc-200 h-[260px] sm:h-[320px] md:h-[400px]">
        <MapContainer
          center={position}
          zoom={6}
          scrollWheelZoom={true}
          className="w-full h-full z-0"
        >
          <TileLayer
            url={
              locale !== "ar"
                ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                : "https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
            }
          />

          <MapUpdater center={position} zoom={6} />
          <MapPicker onPick={handlePickLocation} />

          {/* Default marker (when no userLocation) */}
          {!userLocation && (
            <Marker position={position} icon={googlePinIcon}>
              <Tooltip direction="top" offset={[0, -12]} opacity={1}>
                {hoverTitle}
              </Tooltip>

              <Popup>
                <div className="text-center">
                  <p className="font-medium">{t("default-location")}</p>
                  <p className="text-sm text-gray-600">{t("egypt")}</p>
                </div>
              </Popup>
            </Marker>
          )}

          {/* User marker */}
          {userLocation && (
            <Marker position={userLocation} icon={googlePinIcon}>
              <Tooltip direction="top" offset={[0, -12]} opacity={1}>
                <div className="space-y-0.5">
                  <p className="font-semibold">
                    {place?.city || "Selected Location"}
                    {place?.country ? `, ${place.country}` : ""}
                  </p>
                  <p className="text-xs opacity-80">{hoverTitle}</p>
                  {geoLoading && <p className="text-xs">{t("loading")}</p>}
                </div>
              </Tooltip>

              <Popup>
                <div className="text-center">
                  <p className="font-medium text-red-600">
                    {t("selected-location")}
                  </p>
                  <p className="text-sm text-gray-600">
                    {userLocation[0].toFixed(6)}, {userLocation[1].toFixed(6)}
                  </p>
                  {place?.city || place?.country ? (
                    <p className="mt-1 text-xs text-gray-600">
                      {(place?.city || "").trim()}
                      {place?.country ? `, ${place.country}` : ""}
                    </p>
                  ) : null}
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>

        {/* Find My Location button */}
        <button
          onClick={getCurrentLocation}
          disabled={loading}
          className={`
            absolute top-4 right-4 z-[1000]
            inline-flex items-center gap-2
            rounded-md border border-maroon-200 bg-white/95 px-4 py-2
            text-sm font-semibold text-maroon-700 shadow-md backdrop-blur
            transition hover:bg-white hover:shadow-lg
            disabled:cursor-not-allowed disabled:opacity-70
          `}
        >
          <span className="inline-flex size-5 items-center justify-center">
            {loading ? (
              <span className="size-4 rounded-full border-2 border-maroon-600 border-t-transparent animate-spin" />
            ) : (
              <svg
                className="size-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.364-6.364-1.414 1.414M8.05 15.95l-1.414 1.414m0-10.828L8.05 8.05m7.9 7.9 1.414 1.414M12 8a4 4 0 100 8 4 4 0 000-8z"
                />
              </svg>
            )}
          </span>
          <span>{t("find-my-location")}</span>
        </button>

        {loading && <div className="absolute inset-0 z-[999] bg-black/10" />}
      </div>

      {/* Add Address button */}
      <div className="mt-4">
        <button
          onClick={handleSetNewAddress}
          disabled={
            !userLocation ||
            !fullAdress ||
            addAddressisPending ||
            updateAddressisPending
          }
          className={`
            w-full rounded-md py-4 text-center font-semibold text-white
            bg-maroon-600 hover:bg-maroon-700 transition
            disabled:opacity-60 disabled:cursor-not-allowed
          `}
        >
          {formTitle === "create"
            ? t("add-a-new-address")
            : t("update-address-info")}
        </button>

        {/* Error */}
        {error && (
          <div className="mt-3 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <p className="font-medium">{error}</p>
            {locationPermission === "denied" && (
              <p className="mt-1 text-xs text-red-600">
                {t(
                  "enable-location-in-your-browser-settings-and-refresh-the-page",
                )}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
