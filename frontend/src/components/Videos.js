import React, { useState, useEffect } from "react";
import Header from "./Header";
import {
  Box,
  Grid,
  Stack,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import { config } from "../App";
import { useSnackbar } from "notistack";
import Loading from "../utils/Loading";
import VideoGrid from "./VideoGrid";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import Search from "@mui/icons-material/Search";
import SearchBar from "./SearchBar";

const Videos = ({ videoDetails }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allGenre, setAllGenre] = useState(true);
  const [education, setEducation] = useState(false);
  const [sports, setSports] = useState(false);
  const [comedy, setComedy] = useState(false);
  const [lifestyle, setLifestyle] = useState(false);
  const [contentRating, setContentRating] = useState({
    anyAge: true,
    sevenPlus: false,
    twelvePlus: false,
    sixteenPlus: false,
    eighteenPlus: false,
  });
  //console.log(videos);

  /*
  lix
    1) should display 5 genre buttons on a row
    2) should display 5 content rating buttons on a row
    3) should not have same parent for genre and content rating buttons
    4) should not have "View Count" option selected in sort by dropdown on page load
    5) should have "Release Date" option selected in sort by dropdown on page load
    6) should have "View Count" option selectable after clicking on the sort by dropdown
    7) should open video modal with "Submit" and "Cancel" buttons, on clicking "Upload" button
    8) should open video modal on clicking "Upload" button and close it on clicking "Cancel" button in the modal
    9) should have at least 10 links (with class "video-tile-link") to different videos on page load.
     10) should display the video page on clicking the first video tile (with class "video-tile") which has a parent element with class "video-tile-link"
   */

  const [debounceTimer, setDebounceTimer] = useState(0);
  const [age, setAge] = useState("");
  const [sortBy, setSortBy] = useState("releaseDate");

  useEffect(() => {
    getVideos();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (education || sports || comedy || lifestyle) {
      setAllGenre(false);
    }

    if (education && sports && comedy && lifestyle) {
      setAllGenre(true);
      setEducation(false);
      setSports(false);
      setComedy(false);
      setLifestyle(false);
    }

    if (!education && !sports && !comedy && !lifestyle) {
      setAllGenre(true);
    }
    getVideos();
    // eslint-disable-next-line
  }, [education, sports, comedy, lifestyle, age]);

  useEffect(() => {
    const sortByGetVideos = async (value) => {
      setLoading(true);
      try {
        let response = await axios.get(`${config.endpoint}?sortBy=${value}`);
        setVideos(response.data.videos);
        setLoading(false);
      } catch (error) {
        enqueueSnackbar(`Error:${error.response.data.message}`, {
          variant: "error",
        });

        setLoading(false);
      }
    };

    sortByGetVideos(sortBy);
    // eslint-disable-next-line
  }, [sortBy]);

  const getVideos = async (title) => {
    setLoading(true);
    let url = config.endpoint;

    if (allGenre && !age && title) {
      url = `${url}?${title ? "title=" + encodeURIComponent(title) + "&" : ""}`;
    }
    if (allGenre && age) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }contentRating=${encodeURIComponent(age)}`;
    } else if (education && sports && comedy && age) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Education,Sports,Comedy&contentRating=${encodeURIComponent(age)}`;
    } else if (education && sports && lifestyle && age) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Education,Sports,Lifestyle&contentRating=${encodeURIComponent(
        age
      )}`;
    } else if (sports && comedy && lifestyle && age) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Sports,Comedy,Lifestyle&contentRating=${encodeURIComponent(age)}`;
    } else if (education && comedy && lifestyle && age) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Education,Comedy,Lifestyle&contentRating=${encodeURIComponent(
        age
      )}`;
    } else if (education && sports && age) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Education,Sports&contentRating=${encodeURIComponent(age)}`;
    } else if (education && comedy && age) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Education,Comedy&contentRating=${encodeURIComponent(age)}`;
    } else if (education && lifestyle && age) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Education,Lifestyle&contentRating=${encodeURIComponent(age)}`;
    } else if (sports && comedy && age) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Sports,Comedy&contentRating=${encodeURIComponent(age)}`;
    } else if (sports && lifestyle && age) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Sports,Lifestyle&contentRating=${encodeURIComponent(age)}`;
    } else if (comedy && lifestyle && age) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Comedy,Lifestyle&contentRating=${encodeURIComponent(age)}`;
    } else if (education && age) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Education&contentRating=${encodeURIComponent(age)}`;
    } else if (sports && age) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Sports&contentRating=${encodeURIComponent(age)}`;
    } else if (comedy && age) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Comedy&contentRating=${encodeURIComponent(age)}`;
    } else if (lifestyle && age) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Lifestle&contentRating=${encodeURIComponent(age)}`;
    } else if (education && sports && comedy) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Education,Sports,Comedy`;
    } else if (education && sports && lifestyle) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Education,Sports,Lifestyle`;
    } else if (sports && comedy && lifestyle) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Sports,Comedy,Lifestyle`;
    } else if (education && comedy && lifestyle) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Education,Comedy,Lifestyle`;
    } else if (education && sports) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Education,Sports`;
    } else if (education && comedy) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Education,Comedy`;
    } else if (education && lifestyle) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Education,Lifestyle`;
    } else if (sports && comedy) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Sports,Comedy`;
    } else if (sports && lifestyle) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Sports,Lifestyle`;
    } else if (comedy && lifestyle) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Comedy,Lifestyle`;
    } else if (education) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Education`;
    } else if (sports) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Sports`;
    } else if (comedy) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Comedy`;
    } else if (lifestyle) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Lifestle`;
    }
    try {
      let response = await axios.get(url);
      setVideos(response.data.videos);
      setLoading(false);
    } catch (error) {
      enqueueSnackbar(`Error:${error.response.data.message}`, {
        variant: "error",
      });
      setLoading(false);
    }
  };

  const handleContentRating = (sortAge) => {
    if (sortAge === "anyAge") {
      setAge("");
      setContentRating({
        anyAge: true,
        sevenPlus: false,
        twelvePlus: false,
        sixteenPlus: false,
        eighteenPlus: false,
      });
    } else if (sortAge === "7+") {
      setAge(sortAge);
      setContentRating({
        anyAge: false,
        sevenPlus: true,
        twelvePlus: false,
        sixteenPlus: false,
        eighteenPlus: false,
      });
    } else if (sortAge === "12+") {
      setAge(sortAge);
      setContentRating({
        anyAge: false,
        sevenPlus: false,
        twelvePlus: true,
        sixteenPlus: false,
        eighteenPlus: false,
      });
    } else if (sortAge === "16+") {
      setAge(sortAge);
      setContentRating({
        anyAge: false,
        sevenPlus: false,
        twelvePlus: false,
        sixteenPlus: true,
        eighteenPlus: false,
      });
    } else if (sortAge === "18+") {
      setAge(sortAge);
      setContentRating({
        anyAge: false,
        sevenPlus: false,
        twelvePlus: false,
        sixteenPlus: false,
        eighteenPlus: true,
      });
    }
  };

  const handleSortBy = (event) => {
    setSortBy(event.target.value);
  };

  const debounceSearch = (event, debounceTimeout) => {
    if (debounceTimer !== 0) {
      clearTimeout(debounceTimer);
    }
    const timerId = setTimeout(() => getVideos(event), debounceTimeout);
    setDebounceTimer(timerId);
  };

  const handleSearch = (title) => {
    debounceSearch(title, 500);
  };

  return (
    <>
      {!videoDetails && (
        <>
          <Header handleSearch={handleSearch} />

          <Box sx={{ background: "#202020", position: "sticky", top: "80px" }}>
            <SearchBar handleSearch={handleSearch}  />
            <Box className="genre-pannel">
              {/* Genre Pannel setting for selection */}
              <Box className="genre">
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  gap="20px"
                  sx={{ cursor: "pointer", flexWrap: "wrap" }}
                >
                  <Button
                    onClick={() => {
                      setAllGenre(true);
                      setEducation(false);
                      setSports(false);
                      setComedy(false);
                      setLifestyle(false);
                    }}
                    className={"genre-btn"}
                  >
                    All genre-btn
                  </Button>
                  <Button
                    onClick={() => setEducation(!education)}
                    className={"genre-btn"}
                  >
                    Education
                  </Button>
                  <Button
                    onClick={() => setSports(!sports)}
                    className={"genre-btn"}
                  >
                    Sports
                  </Button>
                  <Button
                    onClick={() => setComedy(!comedy)}
                    className={"genre-btn"}
                  >
                    Comedy
                  </Button>
                  <Button
                    onClick={() => setLifestyle(!lifestyle)}
                    className={"genre-btn"}
                  >
                    Lifestyle
                  </Button>

                  {/* <FormControl className="category-form"> */}
                  <Stack
                    className="category-form"
                    direction="row"
                    alignItems="center"
                    gap="10px"
                  >
                    <KeyboardDoubleArrowUpIcon />
                    <select
                      className="sort-select"
                      value={sortBy}
                      onChange={handleSortBy}
                    >
                      <option style={{ height: "50px"}} id="release-date-option" value={"releaseDate"}>
                        Release Date
                      </option>
                      <option id="view-count-option" value={"viewCount"}>
                        View Count
                      </option>
                    </select>
                  </Stack>
                  {/* </FormControl> */}
                </Stack>
              </Box>

              {/* Content Rating Pannel Setting for age selection */}

              <Box className="" sx={{ margin: "2rem 1rem 0" }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  gap="40px"
                  sx={{ cursor: "pointer", flexWrap: "wrap" }}
                >
                  <Button
                    onClick={() => {
                      handleContentRating("anyAge");
                    }}
                    className={"content-rating-btn"}
                  >
                    Any age group
                  </Button>
                  <Button
                    onClick={() => {
                      handleContentRating("7+");
                    }}
                    className={"content-rating-btn"}
                  >
                    7+
                  </Button>
                  <Button
                    onClick={() => {
                      handleContentRating("12+");
                    }}
                    className={"content-rating-btn"}
                  >
                    12+
                  </Button>
                  <Button
                    onClick={() => {
                      handleContentRating("16+");
                    }}
                    className={"content-rating-btn"}
                  >
                    16+
                  </Button>
                  <Button
                    onClick={() => {
                      handleContentRating("18+");
                    }}
                    className={"content-rating-btn"}
                  >
                    18+
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Box>
        </>
      )}

      <>
        {loading ? (
          <Loading />
        ) : (
          <Box sx={{ padding: "3rem 5rem" }}>
            <Grid container spacing={2}>
              {videos.map((video) => (
                <Grid key={video._id} item xs={12} sm={6} md={3}>
                  <VideoGrid video={video} sortBy={sortBy} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </>
    </>
  );
};

export default Videos;
