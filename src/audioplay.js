import React, { useState, useEffect } from 'react';
import './audioplay.css';

const AudioPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [audioElement, setAudioElement] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);

  const audioFiles = [
    './Track1.mp3',
    './Track1.mp3',
    './Track1.mp3',
    // Add more audio files as needed
  ];

  const playPrevious = () => {
    setCurrentTrack((prevTrack) => Math.max(prevTrack - 1, 0));
  };

  const playNext = () => {
    if(currentTrack !== 0){
    setCurrentTrack((prevTrack) => Math.min(prevTrack + 1, audioFiles.length - 1));
  }else{
  setCurrentTrack(0)
  }
  };

  const playAudio = () => {
    audioElement.src = audioFiles[currentTrack];

    // If audio is playing, pause it; otherwise, start playing
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }

    setIsPlaying(!isPlaying);
  };

  const stopAudio = () => {
    audioElement.pause();
    audioElement.currentTime = 0;
    setIsPlaying(false);
  };

  const pauseAudio = () => {
    audioElement.pause();
    setIsPlaying(false);
  };

  useEffect(() => {
    // Cleanup function to pause audio when the component unmounts or the track changes
    return () => {
      audioElement.pause();
      audioElement.currentTime = 0;
    };
  }, [audioElement]);

  return (
    <div>
      <button onClick={playPrevious} disabled={currentTrack === 0}>
        Previous
      </button>
      <button onClick={playAudio}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <button onClick={stopAudio}>
        Stop
      </button>
      <button onClick={playNext} disabled={currentTrack === audioFiles.length - 1}>
        Next
      </button>
    </div>
  );
};

export default AudioPlayer;
