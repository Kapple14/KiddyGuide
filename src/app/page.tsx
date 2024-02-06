"use client";

import { useEffect, useState } from "react";
import { useChat } from "ai/react";
import { Controller, Form, useForm, useFormState } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, object, string, date, number } from "zod";
import axios from "axios";

import Image from "next/image";

import styles from "@/styles/page.module.scss";

import ProgressBar from "@/components/Progressbar";
import ChevronLeftIcon from "@/components/Icons/ChevronLeftIcon";
import ChevronRightIcon from "@/components/Icons/ChevronRightIcon";

import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Alert from "@mui/material/Alert";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import LoadingScreen from "@/components/LoadingScreen";

type Location = {
  latitude: number;
  longitude: number;
};

export default function Home() {
  const [location, setLocation] = useState<Location | null | undefined>({
    latitude: 52.52,
    longitude: 13.405,
  });
  const [ageGroup, setAgeGroup] = useState<number | null | undefined>(null);
  const [spots, setSpots] = useState<any[] | null | undefined>(null);
  const [selectedSpot, setSelectedSpot] = useState<string | undefined>(
    undefined
  );
  const [story, setStory] = useState<string | null | undefined>(null);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean | undefined>(false);
  const [progress, setProgress] = useState<number | undefined>(0);

  const steps = [
    {
      id: "Step 1",
      fields: ["user_location"],
    },
    {
      id: "Step 2",
      fields: ["age_group"],
    },
    {
      id: "Step 3",
      fields: ["attractions"],
    },
  ];

  const userProfileSchema = z.object({
    user_location: z.string().min(4, "Please let us know your city").max(75),
    age_group: z
      .string()
      .min(2, "Please choose a username of at least two characters")
      .max(75),
  });

  const { messages, input, setInput, handleInputChange, handleSubmit } =
    useChat();

  async function handleGetLocation() {
    if (navigator) {
      setProgress(1);
      setLoading(false);
      const position = await navigator?.geolocation?.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    }
  }

  const handleSpotSelect = (event: SelectChangeEvent) => {
    setSelectedSpot(event.target.value as string);
    setProgress(3);
  };

  async function getSpots() {
    setProgress(2);
    setLoading(true);
    try {
      // Make a POST request to the API endpoint
      const response = await axios.post("/api/spots", {
        data: {
          latitude: location?.latitude,
          longitude: location?.longitude,
        },
      });
      console.log("Response:", response.data.messages.split(";"));
      setSpots(response.data.messages.split(";"));
      setLoading(false);
      // Handle response as needed
    } catch (error) {
      console.error("Error:", error);
      // Handle error as needed
    }
  }

  async function getStory() {
    setProgress(3);
    setLoading(true);
    try {
      // Make a POST request to the API endpoint
      const response = await axios.post("/api/spots", {
        data: {
          latitude: location?.latitude,
          longitude: location?.longitude,
        },
      });
      console.log("Response:", response.data.messages.split(";"));
      setSpots(["Brandenburg", "Berlin", "Hamburg", "Munich", "Cologne"]);
      setLoading(false);
      // Handle response as needed
    } catch (error) {
      console.error("Error:", error);
      // Handle error as needed
    }
  }

  useEffect(() => {}, []);

  return (
    <main className={styles.main}>
      <ProgressBar progress={progress} length={4} />
      <div
        className={[styles.controllerButtons, styles.controlEnabled].join(" ")}
      >
        <button
          className={styles.chevronButtons}
          onClick={() => (progress ? setProgress(progress - 1) : {})}
          disabled={progress ? progress <= 0 : true}
        >
          <ChevronLeftIcon />
        </button>
      </div>
      <div className={styles.funnel}>
        {progress === 0 && (
          <>
            <h2>Where are you?</h2>
            <Button
              variant="contained"
              type="submit"
              onClick={(e: any) => handleGetLocation()}
              disabled={false}
            >
              Locate Me
            </Button>
          </>
        )}
        {progress === 1 && (
          <>
            {!loading ? (
              <>
                <h2>What age are your children?</h2>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Age Group
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    onChange={() => {
                      getSpots();
                    }}
                  >
                    <FormControlLabel
                      value={0}
                      control={<Radio />}
                      label="3-4"
                    />
                    <FormControlLabel
                      value={1}
                      control={<Radio />}
                      label="5-7"
                    />
                    <FormControlLabel
                      value={2}
                      control={<Radio />}
                      label="8-11"
                    />
                    <FormControlLabel
                      value={3}
                      control={<Radio />}
                      label="12-15"
                    />
                  </RadioGroup>
                </FormControl>
              </>
            ) : (
              <LoadingScreen />
            )}
          </>
        )}
        {progress === 2 && (
          <>
            {!loading ? (
              <>
                <h2>Pick some nice attraction</h2>
                <FormControl sx={{ m: 1, minWidth: 120 }} disabled>
                  <InputLabel id="demo-simple-select-disabled-label">
                    Attraction
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-disabled-label"
                    id="demo-simple-select-disabled"
                    value={selectedSpot}
                    label="Attracton"
                    onChange={handleSpotSelect}
                    disabled={false}
                  >
                    {spots &&
                      spots.length > 0 &&
                      spots?.map((spot) => (
                        <MenuItem value={spot}>{spot}</MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </>
            ) : (
              <LoadingScreen />
            )}
          </>
        )}
        {progress === 3 && (
          <>{!loading ? <h2>Here is your story</h2> : <LoadingScreen />}</>
        )}
      </div>
    </main>
  );
}
