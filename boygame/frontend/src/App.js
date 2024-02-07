import React, { useEffect, useState } from 'react';
import Cactus from '../src/assest/img/cactus-5375863_1280.png';
import Boy from '../src/assest/img/boy-running-1--unscreen.gif';
import './style.css';
import jumpboy from '../src/assest/img/output-onlinegiftools.png';

export default function App() {
    const [jump, setJump] = useState(false);
    const [score, setScore] = useState(0);
    const [gameover, setgameover] = useState(false);
    useEffect(() => {
        const checkCollision = () => {
            const boy = document.querySelector('.boy');
            const cactus = document.querySelector('.cactus');

            if (boy && cactus) {
                const boyRect = boy.getBoundingClientRect();
                const cactusRect = cactus.getBoundingClientRect();

                // Check for collision using the bounding boxes of the elements
                if (
                    boyRect.left < cactusRect.right &&
                    boyRect.right > cactusRect.left &&
                    boyRect.top < cactusRect.bottom &&
                    boyRect.bottom > cactusRect.top
                ) {
                    setgameover(true);
                }
            setScore(score+1);
            }
        };

        const interval = setInterval(() => {
            checkCollision();
        }, 300);
        return () => clearInterval(interval); // Clear the interval on component unmount
    }, [score]); // Add 'score' as a dependency to useEffect

    const handleKeyDown = (e) => {
        if (e.keyCode === 32) {
            setJump(true);
        }
    };

    const handleKeyUp = (e) => {
        if (e.keyCode === 32) {
            setJump(false);
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return (
        <>
            <div className="container">
                {gameover === false &&
                    <marquee behavior direction className="m1" scrollamount={60}>
                        <img src={Cactus} className="cactus" height="200px" alt="Cactus" />
                    </marquee>
                }
                {!jump && (
                    <div className="cont">
                        <img src={Boy} className="boy" alt="Boy" />
                        <hr />
                    </div>
                )}
                {jump && (
                    <div className="cont">
                        <img src={jumpboy} className="boy jump" alt="Jumping Boy" />
                        <hr />
                    </div>
                )}
            </div>
            <h1>Score: {score}</h1>
        </>
    );
}