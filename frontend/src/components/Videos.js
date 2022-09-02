import React, { useState, useEffect } from 'react'
import Header from './Header'
import {
    Box,
    Grid,
    Stack,
    FormControl,
    MenuItem,
    Select
} from '@mui/material'
import axios from "axios"
import { config } from "../App"
import SnackBar from '../utils/SnackBar'
import Loading from '../utils/Loading'
import VideoCard from './VideoCard'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'




const Videos = ({ videoDetails }) => {
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(false)
    const [allGenre, setAllGenre] = useState(true)
    const [education, setEducation] = useState(false)
    const [sports, setSports] = useState(false)
    const [comedy, setComedy] = useState(false)
    const [lifestyle, setLifestyle] = useState(false)
    const [contentRating, setContentRating] = useState({
        anyAge: true,
        sevenPlus: false,
        twelvePlus: false,
        sixteenPlus: false,
        eighteenPlus: false,
    })

    const [debounceTimer, setDebounceTimer] = useState(0)
    const [age, setAge] = useState("")
    const [sortBy, setSortBy] = useState("releaseDate")

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
                <SnackBar message={error.response.data.message} type="error" />

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
            url = `${url}?${title ? "title=" + encodeURIComponent(title) + "&" : ""
                }contentRating=${encodeURIComponent(age)}`;
        } else if (education && sports && comedy && age) {
            url = `${url}?${title ? "title=" + encodeURIComponent(title) + "&" : ""
                }genres=Education,Sports,Comedy&contentRating=${encodeURIComponent(age)}`;
        } else if (education && sports && lifestyle && age) {
            url = `${url}?${title ? "title=" + encodeURIComponent(title) + "&" : ""
                }genres=Education,Sports,Lifestyle&contentRating=${encodeURIComponent(
                    age
                )}`;
        } else if (sports && comedy && lifestyle && age) {
            url = `${url}?${title ? "title=" + encodeURIComponent(title) + "&" : ""
                }genres=Sports,Comedy,Lifestyle&contentRating=${encodeURIComponent(age)}`;
        } else if (education && comedy && lifestyle && age) {
            url = `${url}?${title ? "title=" + encodeURIComponent(title) + "&" : ""
                }genres=Education,Comedy,Lifestyle&contentRating=${encodeURIComponent(
                    age
                )}`;
        } else if (education && sports && age) {
            url = `${url}?${title ? "title=" + encodeURIComponent(title) + "&" : ""
                }genres=Education,Sports&contentRating=${encodeURIComponent(age)}`;
        } else if (education && comedy && age) {
            url = `${url}?${title ? "title=" + encodeURIComponent(title) + "&" : ""
                }genres=Education,Comedy&contentRating=${encodeURIComponent(age)}`;
        } else if (education && lifestyle && age) {
            url = `${url}?${title ? "title=" + encodeURIComponent(title) + "&" : ""
                }genres=Education,Lifestyle&contentRating=${encodeURIComponent(age)}`;
        } else if (sports && comedy && age) {
            url = `${url}?${title ? "title=" + encodeURIComponent(title) + "&" : ""
                }genres=Sports,Comedy&contentRating=${encodeURIComponent(age)}`;
        } else if (sports && lifestyle && age) {
            url = `${url}?${title ? "title=" + encodeURIComponent(title) + "&" : ""
                }genres=Sports,Lifestyle&contentRating=${encodeURIComponent(age)}`;
        } else if (comedy && lifestyle && age) {
            url = `${url}?${title ? "title=" + encodeURIComponent(title) + "&" : ""
                }genres=Comedy,Lifestyle&contentRating=${encodeURIComponent(age)}`;
        } else if (education && age) {
            url = `${url}?${title ? "title=" + encodeURIComponent(title) + "&" : ""
                }genres=Education&contentRating=${encodeURIComponent(age)}`;
        } else if (sports && age) {
            url = `${url}?${title ? "title=" + encodeURIComponent(title) + "&" : ""
                }genres=Sports&contentRating=${encodeURIComponent(age)}`;
        } else if (comedy && age) {
            url = `${url}?${title ? "title=" + encodeURIComponent(title) + "&" : ""
                }genres=Comedy&contentRating=${encodeURIComponent(age)}`;
        } else if (lifestyle && age) {
            url = `${url}?${title ? "title=" + encodeURIComponent(title) + "&" : ""
                }genres=Lifestle&contentRating=${encodeURIComponent(age)}`;
        } else if (education && sports && comedy) {
            url = `${url}?${title ? "title=" + encodeURIComponent(title) + "&" : ""
                }genres=Education,Sports,Comedy`;
        } else if (education && sports && lifestyle) {
            url = `${url}?${title ? "title=" + encodeURIComponent(title) + "&" : ""
                }genres=Education,Sports,Lifestyle`;
        } else if (sports && comedy && lifestyle) {
            url = `${url}?${title ? "title=" + encodeURIComponent(title) + "&" : ""
                }genres=Sports,Comedy,Lifestyle`;
        } else if (education && comedy && lifestyle) {
            url = `${url}?${title ? "title=" + encodeURIComponent(title) + "&" : ""
                }genres=Education,Comedy,Lifestyle`;
        } else if (education && sports) {
            url = `${url}?${title ? "title=" + encodeURIComponent(title) + "&" : ""
                }genres=Education,Sports`;
        } else if (education && comedy) {
            url = `${url}?${title ? "title=" + encodeURIComponent(title) + "&" : ""
                }genres=Education,Comedy`;
        } else if (education && lifestyle) {
            url = `${url}?${title ? "title=" + encodeURIComponent(title) + "&" : ""
                }genres=Education,Lifestyle`;
        } else if (sports && comedy) {
            url = `${url}?${title ? "title=" + encodeURIComponent(title) + "&" : ""
                }genres=Sports,Comedy`;
        } else if (sports && lifestyle) {
            url = `${url}?${title ? "title=" + encodeURIComponent(title) + "&" : ""
                }genres=Sports,Lifestyle`;
        } else if (comedy && lifestyle) {
            url = `${url}?${title ? "title=" + encodeURIComponent(title) + "&" : ""
                }genres=Comedy,Lifestyle`;
        } else if (education) {
            url = `${url}?${title ? "title=" + encodeURIComponent(title) + "&" : ""
                }genres=Education`;
        } else if (sports) {
            url = `${url}?${title ? "title=" + encodeURIComponent(title) + "&" : ""
                }genres=Sports`;
        } else if (comedy) {
            url = `${url}?${title ? "title=" + encodeURIComponent(title) + "&" : ""
                }genres=Comedy`;
        } else if (lifestyle) {
            url = `${url}?${title ? "title=" + encodeURIComponent(title) + "&" : ""
                }genres=Lifestle`;
        }
        try {
            let response = await axios.get(url);
            setVideos(response.data.videos);
            setLoading(false);
        } catch (error) {
            <SnackBar message={error.response.data.message} type="error" />
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
            {!videoDetails &&
                <>
                    <Header handleSearch={handleSearch} />
                    <Box className="genre-pannel">
                        {/* Genre Pannel setting for selection */}
                        <Box sx={{ marginBottom: 1, display: "flex", gap: "10px" }}>
                            <Stack direction="row" alignItems="center" justifyContent="center" gap="20px" sx={{ cursor: "pointer", flexWrap: "wrap" }}>
                                <Box
                                    label="All Genre"
                                    onClick={() => {
                                        setAllGenre(true);
                                        setEducation(false);
                                        setSports(false);
                                        setComedy(false);
                                        setLifestyle(false);
                                    }}
                                    className={allGenre ? "category-btn-active" : undefined}

                                >All Genre</Box>
                                <Box
                                    onClick={() => setEducation(!education)}
                                    className={education ? "category-btn-active" : undefined}

                                >Education</Box>
                                <Box
                                    label="Sports"
                                    onClick={() => setSports(!sports)}
                                    className={sports ? "category-btn-active" : undefined}
                                >Sports</Box>
                                <Box
                                    label="Comedy"
                                    onClick={() => setComedy(!comedy)}
                                    className={comedy ? "category-btn-active" : undefined}

                                >Comedy</Box>
                                <Box
                                    label="Lifestyle"
                                    onClick={() => setLifestyle(!lifestyle)}
                                    className={lifestyle ? "category-btn-active" : undefined}

                                >Lifestyle</Box>

                                <FormControl className='category-form'>
                                    <Stack direction="row" alignItems="center" gap="10px">
                                        <KeyboardDoubleArrowUpIcon />
                                        <Select value={sortBy} onChange={handleSortBy} className="select-date">
                                            <MenuItem value={"releaseDate"}>
                                                Release Date
                                            </MenuItem>
                                            <MenuItem value={"viewCount"}>
                                                View Count
                                            </MenuItem>
                                        </Select>
                                    </Stack>
                                </FormControl>
                            </Stack>
                        </Box>

                        {/* Content Rating Pannel Setting for age selection */}

                        <Box sx={{ margin: "2rem 1rem 0" }}>
                            <Stack direction="row" alignItems="center" justifyContent="center" gap="40px" sx={{ cursor: "pointer", flexWrap: "wrap" }}>
                                <Box
                                    onClick={() => {
                                        handleContentRating("anyAge");
                                    }}
                                    className={contentRating.anyAge ? "category-btn-active" : undefined}
                                >Any age group</Box>
                                <Box
                                    onClick={() => {
                                        handleContentRating("7+");
                                    }}
                                    className={contentRating.sevenPlus ? "category-btn-active" : undefined}

                                >7+</Box>
                                <Box
                                    onClick={() => {
                                        handleContentRating("12+");
                                    }}
                                    className={contentRating.twelvePlus ? "category-btn-active" : undefined}

                                >12+</Box>
                                <Box
                                    onClick={() => {
                                        handleContentRating("16+");
                                    }}
                                    className={contentRating.sixteenPlus ? "category-btn-active" : undefined}
                                >16+</Box>
                                <Box
                                    onClick={() => {
                                        handleContentRating("18+");
                                    }}
                                    className={contentRating.eighteenPlus ? "category-btn-active" : undefined}

                                >18+</Box>
                            </Stack>
                        </Box>
                    </Box>
                </>
            }

            <>
                {
                    loading ?
                        <Loading /> :
                        <Box sx={{ padding: "3rem 5rem" }}>
                            <Grid container spacing={2}>
                                {
                                    videos.map(video => (
                                        <Grid key={video._id} item xs={12} sm={6} md={3}>
                                            <VideoCard video={video} sortBy={sortBy} />
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </Box>
                }
            </>
        </>
    )
}

export default Videos