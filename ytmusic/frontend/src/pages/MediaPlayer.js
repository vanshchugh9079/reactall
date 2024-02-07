import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
export default function MediaPlayer({ urlel, name, handlePlay , id }) {
    const [showPlay, setShowPlay] = useState(false);
    const [audio] = useState(new Audio(urlel));
    const [isPlaying, setIsPlaying] = useState(false);
    
    useEffect(() => {
        const handleAudioEnd = () => {
            setIsPlaying(false);
        };

        audio.addEventListener('ended', handleAudioEnd);

        return () => {
            audio.removeEventListener('ended', handleAudioEnd);
        };
    }, [audio]);

    const togglePlay = () => {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSpanClick = (e) => {
        e.preventDefault(); // Prevent click event from reaching parent
        togglePlay(); // Perform play/pause action
    };
    return (
        <Link
            to={`/music?url=${urlel}&name=${name}&id=${id}`}
            className={`text-decoration-none text-black media-player d-flex me-0`}
            onMouseEnter={() => setShowPlay(true)}
            onMouseLeave={() => setShowPlay(false)}
        >
            <span
                className={`d-flex ${showPlay ? "bg-secondary" : "v-media-img"} ${isPlaying ? "musicplay" : "musicpause"} cursor-pointer`}
                onClick={handleSpanClick} // Handle click on the span
            >
                {showPlay && <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} className={`w-100 align-items-center h-50 mt-3`} />}
            </span>
            <div onClick={() => {

            }}>
                <h6 className="fw-bold d-inline">{name}</h6>
                <p className=''>Artist Name</p>
            </div>
        </Link>
    );
}
