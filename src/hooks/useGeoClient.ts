// useGeoClient.ts
import axios from "axios";

export interface GeoLocation {
  place_id?: number;
  licence?: string;
  osm_type?: string;
  osm_id?: number;
  lat?: string;
  lon?: string;
  class?: string;
  type?: string;
  place_rank?: number;
  importance?: number;
  addresstype?: string;
  name?: string;
  display_name?: string;
  boundingbox?: string[];
}

export async function fetchGeoLocation(
  query: string,
  country?: string | null
): Promise<GeoLocation | null> {
  try {
    let response;
    if (country) {
      response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&limit=3&q=${query}&countrycodes=${country}`
      );
    } else {
      response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&limit=3&q=${query}`
      );
    }

    if (response.status === 200) {
      const data = response.data;

      if (data.length > 0) {
        const { lat, lon } = data[0];
        return { lat: lat, lon: lon };
      }
    }
  } catch (error) {
    console.error("An error occurred while fetching the location:", error);
  }

  return null;
}

export async function fetchGeoLocationOptions(
  query: string,
  country?: string | null
): Promise<GeoLocation[] | null> {
  try {
    let response;
    if (country) {
      response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&limit=12&q=${query}&countrycodes=${country}&accept-language=en`
      );
    } else {
      response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&limit=12&q=${query}&accept-language=en`
      );
    }

    if (response.status === 200) {
      const data = response.data;
      return data;
    }
  } catch (error) {
    console.error("An error occurred while fetching the location:", error);
  }

  return null;
}
