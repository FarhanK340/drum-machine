import React, { useState, useEffect } from "react";

const sounds = [
    { key: "Q", id: "Heater-1", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" },
    { key: "W", id: "Heater-2", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" },
    { key: "E", id: "Heater-3", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" },
    { key: "A", id: "Heater-4", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" },
    { key: "S", id: "Clap", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" },
    { key: "D", id: "Open-HH", src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" },
    { key: "Z", id: "Kick-n'-Hat", src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" },
    { key: "X", id: "Kick", src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" },
    { key: "C", id: "Closed-HH", src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" }
];

const DrumMachine = () => {
    const [display, setDisplay] = useState('');
    const [activeKey, setActiveKey] = useState('');

    const handleKeyPress = (e) => {
        const key = e.key.toUpperCase();
        const sound = sounds.find((s) => s.key === e.key.toUpperCase());
        if (sound) {
            setActiveKey(key);
            playSound(sound.key);
        }
    };

    const handleKeyRelease = (e) => {
        setActiveKey('');
    }

    const playSound = (key) => {
        const sound = sounds.find((s) => s.key === key);
        if (sound) {
            const audio = document.getElementById(key);
            audio.currentTime = 0;
            audio.play();
            setDisplay(sound.id);
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        document.addEventListener('keyup', handleKeyRelease);
        return () => {
            document.removeEventListener('keydown', handleKeyPress)
            document.removeEventListener('keyup', handleKeyRelease)
        };
    });

    return (
        <div id='drum-machine' className="w-full h-screen flex flex-col items-center justify-center bg-slate-400 text-white">
            <div id="display" className="mb-8 text-2xl">Sound Type: {display}</div>
            <div className="grid grid-cols-3 gap-4">
                {sounds.map((sound) => (
                    <div
                        key={sound.key}
                        id={sound.id}
                        className={`drum-pad p-6  text-2xl rounded cursor-pointer flex justify-center items-center ${activeKey === sound.key ? "bg-orange-300 shadow-white shadow-md" : "bg-gray-500 shadow-lg shadow-black"}`}
                        onClick={() => {
                            playSound(sound.key)
                        }}
                    >
                        {sound.key}
                        <audio className="clip" id={sound.key} src={sound.src}></audio>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DrumMachine;