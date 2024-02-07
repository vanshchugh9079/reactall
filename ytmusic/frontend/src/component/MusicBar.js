import React, { useEffect, useState } from 'react';
import { faBackward, faForward, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { headers, url as mURL } from '../pages/Allhelp';
import { useSearchParams } from 'react-router-dom';
import { Form } from 'react-bootstrap';

const MusicBar = () => {
    const [name, setName] = useState('');
    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(null);
    const [queryId, setQueryId] = useState(null);
    const [allMusic, setAllMusic] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentSong, setCurrentSong] = useState(null);
    const [newSong, setNewSong] = useState(null);
    let [autoplay, setAutoPlay] = useState(false);

    const buttonArr = [{ icon: faBackward }, { icon: (playing) ? faPause : faPlay }, { icon: faForward }];
    let latest = (newSong || currentSong)
    const handlePlay = (audioElement) => {
        if (currentSong && currentSong !== audioElement) {
            setNewSong(audioElement);
            setCurrentTime(audioElement.currentTime);
            currentSong.pause();
            audioElement.play();
            setCurrentSong(audioElement);
            setPlaying(true);
        }
    };

    useEffect(() => {
        fetch(`${mURL}songs?populate=*&pagination[start]=${0}&pagination[limit]=${42}`, {
            method: "GET",
            headers: headers,
        })
            .then(res => res.json())
            .then(data => {
                const arr = data.data.map((element, key) => ({
                    name: element.attributes.Name.data.attributes.alternativeText,
                    url: `http://localhost:1337${element.attributes.Name.data.attributes.url}`,
                    id: key
                }));
                setAllMusic(arr);
            })
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        const nameParam = searchParams.get('name');
        const urlParam = searchParams.get('url');
        const urlid = searchParams.get('id');

        const audio = new Audio(urlParam);
        setCurrentSong(audio);
        let current = newSong || audio
        current.addEventListener("loadedmetadata", () => {
            setCurrentTime(current.currentTime)
            setDuration(current.duration);
        })
        current.addEventListener("timeupdate", () => {
            setCurrentTime(current.currentTime)
        })
        setQueryId(urlid);
        setName(nameParam);
        console.log(autoplay);
    }, [searchParams]);

    const handleended = (current) => {
        let autoclass=document.querySelector(".v-autoplay>input").getAttribute("value")
        if (autoclass==="1") {
            handleNext(2)
            setAutoPlay(true);
        }
        else {
            setCurrentTime(0);
            current.currentTime = 0
            current.pause()
            setAutoPlay(false);
            setPlaying(false);
            console.log(autoplay);
            console.log(autoclass);
        }
    }

    const handleTimeChange = (e) => {
        latest.currentTime = e.target.value
        setCurrentTime(e.target.value);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(latest.currentTime)
            if (latest && latest.currentTime === latest.duration) {
                handleended(latest)
            }
        }, 100);
        return () => clearInterval(interval);
    }, [currentSong, newSong]);

    const handlePlayPause = () => {
        if (playing) {
            latest.pause();
            setPlaying(false);
        } else {
            latest.play();
            setPlaying(true);
        }
    };

    const handleNext = (index) => {
        if (autoplay === true) {
            setAutoPlay(true)
        }
        console.log("my name is vansh");
        latest.pause();
        const nextSong = allMusic.find(song => song.id === (index === 2 ? parseInt(queryId) + 1 : parseInt(queryId) - 1));

        if (nextSong) {
            setSearchParams({ "url": nextSong.url, "name": nextSong.name, "id": nextSong.id });
            handlePlay(new Audio(nextSong.url));
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className='bg-danger v-musicbar d-flex flex-column justify-content-around m-0 p-0'>
            <div className="m-0 p-0 v_bt d-flex flex-column">
                <div className='d-flex mt-2 gap-2 ms-auto me-auto p-0 m-0 flex-wrap'>
                    {buttonArr.map((element, index) => (
                        <button className="rounded-circle fw-bold " key={index} onClick={() => {
                            if (index === 1) {
                                handlePlayPause();
                            } else {
                                handleNext(index);
                            }
                        }}>
                            <FontAwesomeIcon icon={element.icon} size="2xl" />
                        </button>
                    ))}
                </div>
                <Form className="ms-auto m-0 d-inline">
                    <Form.Check // prettier-ignore
                        type="switch"
                        className="text-white fs-4 m-0 p-0 v-autoplay "
                        id="custom-switch"
                        label="Autoplay"
                        checked={(autoplay===true?1:0)}
                        value={(autoplay===true?1:0)}
                        onChange={() => {
                           setAutoPlay(!autoplay)
                        }}
                    />
                </Form>
            </div>
            <p className='text-white text-center fs-5 m-0 p-0'>{name}</p>
            <div>
                <input
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime || 0}
                    className='w-100 bg-success cursor-pointer'
                    onChange={handleTimeChange}
                />
                <p className='m-0 p-0 text-white ms-2'>
                    {formatTime(currentTime)}/{formatTime(duration)}
                </p>
            </div>
        </div>
    );
};

export default MusicBar;
