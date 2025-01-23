"use client";

import { useEffect, useState } from "react";
import { setDefaults, fromAddress, OutputFormat } from "react-geocode";

import type { PropertyType } from "@/types/properties.types";

type PropertyMapProps = {
  property: PropertyType;
};

const PropertyMap = ({ property }: PropertyMapProps) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
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

  if (loading) return <h3>Loading...</h3>;
  if (geocodeError) return <div className="text-xl">No location data found</div>

  return (
    <div>
      <h1>Property Map</h1>
    </div>
  );
};

export default PropertyMap;
