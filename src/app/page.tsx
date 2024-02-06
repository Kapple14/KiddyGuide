"use client";

import { useEffect, useState } from "react";
import { useChat } from "ai/react";
import axios from "axios";

import styles from "@/styles/page.module.scss";

import ProgressBar from "@/components/Progressbar";
import ChevronLeftIcon from "@/components/Icons/ChevronLeftIcon";
import ChevronRightIcon from "@/components/Icons/ChevronRightIcon";

import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
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
  const [ageGroup, setAgeGroup] = useState<string | null | undefined>(null);
  const [spots, setSpots] = useState<any[] | null | undefined>(null);
  const [selectedSpot, setSelectedSpot] = useState<string | undefined>(
    undefined
  );
  const [story, setStory] = useState<string | null | undefined>(null);
  const [loading, setLoading] = useState<boolean | undefined>(false);
  const [progress, setProgress] = useState<number | undefined>(0);

  const { messages, input, setInput, handleInputChange, handleSubmit } =
    useChat();

  async function handleGetLocation() {
    if (navigator) {
      setProgress(1);
      setLoading(true);
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

  const handleSpotSelect = (event: any) => {
    setSelectedSpot(event.target.value);
    getStory(event.target.value);
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
      setSpots(response.data.messages.split(";"));
      setLoading(false);
      // Handle response as needed
    } catch (error) {
      console.error("Error:", error);
      // Handle error as needed
    }
  }

  async function getStory(spot: string) {
    setProgress(3);
    setLoading(true);
    try {
      // Make a POST request to the API endpoint
      const response = await axios.post(
        "/api/thread",
        {
          data: { message: `${spot}, ${ageGroup} years old` },
        },
        { timeout: 50 * 1000 }
      );
      const { thread_id, run_id } = response.data;
      await new Promise((resolve) => setTimeout(resolve, 30 * 1000));
      // Make a POST request to the API endpoint
      const story = await axios.post(
        "/api/story",
        {
          data: { thread_id: thread_id, run_id: run_id },
        },
        { timeout: 50 * 1000 }
      );
      setStory(story.data.messages);
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
                    onChange={(e) => {
                      setAgeGroup(e.target.value);
                      getSpots();
                    }}
                  >
                    <FormControlLabel
                      value={"3-4"}
                      control={<Radio />}
                      label="3-4"
                    />
                    <FormControlLabel
                      value={"5-7"}
                      control={<Radio />}
                      label="5-7"
                    />
                    <FormControlLabel
                      value={"8-11"}
                      control={<Radio />}
                      label="8-11"
                    />
                    <FormControlLabel
                      value={"12-15"}
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
                      spots?.map((spot, index) => (
                        <MenuItem value={spot} key={`${spot.trim()}-${index}`}>
                          {spot}
                        </MenuItem>
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
          <>
            {!loading ? (
              <>
                <h2>Here is your story</h2>
                <p>{story}</p>
              </>
            ) : (
              <LoadingScreen />
            )}
          </>
        )}
      </div>
    </main>
  );
}
