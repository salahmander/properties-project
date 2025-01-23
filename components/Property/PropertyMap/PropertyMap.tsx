"use client";

import Image from "next/image";

import { useEffect, useState } from "react";
import { setDefaults, fromAddress, OutputFormat } from "react-geocode";
import Map, { Marker } from "react-map-gl";

import pin from "@/assets/images/pin.svg";

import Spinner from "@/components/Spinner/Spinner";

import type { PropertyType } from "@/types/properties.types";

import "mapbox-gl/dist/mapbox-gl.css";

type PropertyMapProps = {
  property: PropertyType;
};

const PropertyMap = ({ property }: PropertyMapProps) => {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: "100%",
    height: "500px",
  });
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);
  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
    language: "en",
    region: "gb",
    outputFormat: OutputFormat.JSON,
  });

  useEffect(() => {
    const fetchCords = async () => {
      try {
        const propertyAddress = `${property.location.street} ${property.location.city} ${property.location.county} ${property.location.postcode}`;
        const res = await fromAddress(propertyAddress);

        if (res.results.length === 0) {
          return setGeocodeError(true);
        }

        const { lat, lng } = res.results[0].geometry.location;

        setLat(lat);
        setLng(lng);
        setViewport({
          ...viewport,
          latitude: lat,
          longitude: lng,
        });
      } catch (error) {
        setGeocodeError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCords();
  }, []);

  if (loading) return <Spinner />;

  if (geocodeError)
    return <div className="text-xl">No location data found</div>;

  return (
    !loading && (
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 14,
        }}
        style={{ width: "100%", height: 500 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker longitude={lng} latitude={lat} anchor="bottom">
          <Image src={pin} alt="location" width={40} height={40} />
        </Marker>
      </Map>
    )
  );
};

export default PropertyMap;
