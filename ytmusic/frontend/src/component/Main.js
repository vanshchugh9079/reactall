import React, {  useEffect, useState } from 'react';
import { url, headers } from '../pages/Allhelp';
import MediaPlayer from '../pages/MediaPlayer';
import { Spinner } from 'react-bootstrap';
export default function Main() {
    const [allMusic, setAllMusic] = useState([]);
    const [pagedata, setPagedata] = useState({ start: 0, limit: 24 });
    const [showLoader, setShowLoader] = useState(true);
    const [currentSong, setCurrentSong] = useState(null); // State to keep track of the currently playing song
    const handlePlay = (audioElement, isPlaying) => {
        if (currentSong && currentSong !== audioElement) {
            currentSong.pause();
        }
        setCurrentSong(audioElement)
        return !isPlaying
    };
    const fetchData = (start, limit) => {
        fetch(`${url}songs?populate=*&pagination[start]=${start}&pagination[limit]=${limit}`, {
            method: 'GET',
            headers,
        })
            .then((res) => res.json())
            .then((data) => {
                setShowLoader(false);
                let arr = data.data.map((element,key) => ({
                    name: element.attributes.Name.data.attributes.alternativeText,
                    url: element.attributes.Name.data.attributes.url,
                    id:key

                }));
                setAllMusic([...allMusic, ...arr]);
            })
            .catch((err) => {
                console.error('Error fetching data:', err);
            });
    };

    useEffect(() => {
        fetchData(pagedata.start, pagedata.limit);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [pagedata]); // Adding pagedata to the dependency array

    const handleScroll = () => {
        let { scrollHeight, scrollTop, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 5) {
            const newStart = pagedata.start + pagedata.limit;
            const newLimit = pagedata.limit;
            if (newStart < allMusic.length) {
                setPagedata({ start: newStart, limit: newLimit });
                setShowLoader(true);
            }
        }
    };

    return (
        <>
            <div className='main col-11 m-0 p-0 flex-wrap justify-content-between d-flex'>
                {allMusic.map((element, index) => (
                    <MediaPlayer
                        key={index}
                        urlel={`http://localhost:1337${element.url}`}
                        name={element.name}
                        id={element.id}
                        handlePlay={handlePlay}
                    />
                ))}
            </div>
            {showLoader && (
                <div className='text-center'>
                    <Spinner animation='border' className='' variant='primary' />
                </div>
            )}
        </>
    );
}
