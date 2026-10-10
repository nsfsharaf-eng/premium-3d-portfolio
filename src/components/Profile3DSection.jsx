import { useEffect, useRef, useState } from 'react';
import { FaPlay, FaPause, FaSyncAlt, FaVolumeUp, FaVolumeMute, FaMicrophone } from 'react-icons/fa';
import SectionFrame from './SectionFrame';

export default function Profile3DSection({ theme = 'dark' }) {
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [duration, setDuration] = useState(10);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const targetTimeRef = useRef(0);
  const isDraggingRef = useRef(false);

  // Video Metadata Loaded
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const dur = videoRef.current.duration || 10;
      setDuration(dur);
      videoRef.current.playbackRate = playbackSpeed;
      videoRef.current.defaultPlaybackRate = playbackSpeed;
      videoRef.current.muted = isMuted;
      setVideoLoaded(true);
      setVideoError(false);
    }
  };

  const handleVideoError = () => {
    setVideoError(true);
    setVideoLoaded(false);
  };

  // Continuous 60fps Sync Loop for Timeline Range Slider
  useEffect(() => {
    let animationFrameId;

    const syncLoop = () => {
      const video = videoRef.current;
      if (video && videoLoaded && duration > 0) {
        if (!video.paused && !isDraggingRef.current) {
          if (video.currentTime >= duration - 0.06) {
            video.pause();
            video.currentTime = duration;
            targetTimeRef.current = duration;
            setCurrentTime(duration);
            setIsPlaying(false);
          } else {
            setCurrentTime(video.currentTime);
            targetTimeRef.current = video.currentTime;
          }
        }
      }
      animationFrameId = requestAnimationFrame(syncLoop);
    };

    animationFrameId = requestAnimationFrame(syncLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [videoLoaded, duration]);

  // Play / Pause Video
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      if (video.currentTime >= duration - 0.08) {
        video.currentTime = 0;
        targetTimeRef.current = 0;
        setCurrentTime(0);
      }
      video.playbackRate = playbackSpeed;
      video.muted = isMuted;
      video.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn("Unmuted autoplay restricted, playing muted:", err);
        video.muted = true;
        setIsMuted(true);
        video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      });
    }
  };

  // Toggle Audio Mute
  const toggleMute = (e) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !isMuted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  // Scrub Slider Change
  const handleSliderChange = (e) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    targetTimeRef.current = val;
    if (videoRef.current) {
      videoRef.current.currentTime = val;
    }
  };

  // Reset Video to Start
  const handleReset = (e) => {
    if (e) e.stopPropagation();
    setIsPlaying(false);
    targetTimeRef.current = 0;
    setCurrentTime(0);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  // Toggle Playback Speed
  const toggleSpeed = (e) => {
    if (e) e.stopPropagation();
    const speeds = [1, 1.25, 1.5, 2];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length] || 1;
    setPlaybackSpeed(nextSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextSpeed;
    }
  };

  return (
    <SectionFrame
      id="briefing"
      index="01"
      title="Broadcast Briefing"
      meta="Full HD 1080P • Voice Briefing"
      headline="A personal"
      italicWord="introduction"
      headlineAfter="."
      subheading="Direct from the broadcast desk: welcoming visitors, outlining engineering focus, and software philosophy."
    >
      <div className="px-6 pb-12 md:px-10 md:pb-16">
        
        {/* Architectural Video Viewport Frame */}
        <div className="border border-line bg-bg-raised relative overflow-hidden">
          
          {/* Corner Ticks */}
          <span aria-hidden="true" className="tick -top-[5px] -left-[5px] text-faint">+</span>
          <span aria-hidden="true" className="tick -top-[5px] -right-[5px] text-faint">+</span>
          <span aria-hidden="true" className="tick -bottom-[5px] -left-[5px] text-faint">+</span>
          <span aria-hidden="true" className="tick -bottom-[5px] -right-[5px] text-faint">+</span>

          {/* Top HUD Bar */}
          <div className="flex items-center justify-between border-b border-line px-4 py-2.5 hud-label text-muted bg-bg">
            <div className="flex items-center gap-3">
              <span className="text-accent flex items-center gap-1.5 font-bold">
                <FaMicrophone className="text-accent animate-pulse" />
                <span>STUDIO BROADCAST // 16:9 HD</span>
              </span>
              <span className="hidden sm:inline text-faint">|</span>
              <span className="hidden sm:inline text-faint">MFA NASEEF SHARAF</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className={`px-2 py-0.5 hud-label transition-colors cursor-pointer border ${
                  isMuted
                    ? 'border-line text-muted hover:text-ink'
                    : 'border-accent/40 text-accent bg-accent/10'
                }`}
              >
                {isMuted ? 'Muted' : 'Voice Live'}
              </button>
              <span className="hud-label text-faint">
                {isPlaying ? '● LIVE' : 'PAUSED'}
              </span>
            </div>
          </div>

          {/* 16:9 Video Player Screen */}
          <div
            onClick={togglePlay}
            className="relative w-full aspect-video bg-bg-sunken flex items-center justify-center cursor-pointer group"
          >
            <video
              ref={videoRef}
              src="/assets/intro-final.mp4"
              poster="/assets/intro-final-poster.jpg"
              playsInline
              muted={isMuted}
              preload="auto"
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => {
                setIsPlaying(false);
                if (duration > 0) {
                  targetTimeRef.current = duration;
                  setCurrentTime(duration);
                }
              }}
              onError={handleVideoError}
              className={`w-full h-full object-contain object-center transition-opacity duration-300 ${
                videoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ aspectRatio: '16 / 9' }}
            />

            {/* Big Center Play Overlay Button */}
            {!isPlaying && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className="absolute z-20 w-16 h-16 sm:w-20 sm:h-20 bg-bg/90 border border-line text-ink flex items-center justify-center hover:bg-invert-bg hover:text-invert-fg transition-all group cursor-pointer shadow-2xl"
                title="Play Briefing"
              >
                <FaPlay className="text-xl sm:text-2xl ml-1 transition-transform group-hover:scale-110" />
              </button>
            )}

            {/* Fallback image when video loading */}
            {(!videoLoaded || videoError) && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <img
                  src="/assets/intro-final-poster.jpg"
                  alt="MFA Naseef Sharaf"
                  className="w-full h-full object-contain object-center"
                />
              </div>
            )}
          </div>

          {/* Bottom HUD Scrubber & Controls Toolbar */}
          <div className="border-t border-line bg-bg p-4 sm:p-5 space-y-3">
            
            {/* Timeline Progress Bar */}
            <div className="flex items-center gap-4">
              <span className="hud-label text-muted shrink-0 text-[10px]">
                {currentTime.toFixed(1)}s
              </span>
              <div className="relative flex-1 flex items-center">
                <input
                  type="range"
                  min="0"
                  max={duration || 10}
                  step="0.02"
                  value={currentTime}
                  onChange={handleSliderChange}
                  onMouseDown={() => { isDraggingRef.current = true; }}
                  onMouseUp={() => { isDraggingRef.current = false; }}
                  onTouchStart={() => { isDraggingRef.current = true; }}
                  onTouchEnd={() => { isDraggingRef.current = false; }}
                  className="w-full h-1.5 bg-bg-sunken appearance-none cursor-pointer accent-accent"
                />
              </div>
              <span className="hud-label text-faint shrink-0 text-[10px]">
                {(duration || 10).toFixed(1)}s
              </span>
            </div>

            {/* Controls Button Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className="btn-artcraft py-2 px-4 cursor-pointer"
                >
                  {isPlaying ? <FaPause className="text-[10px]" /> : <FaPlay className="text-[10px]" />}
                  <span>{isPlaying ? 'Pause' : 'Play Briefing'}</span>
                </button>

                <button
                  onClick={toggleMute}
                  className="btn-artcraft-outline py-2 px-3 text-[10px] cursor-pointer"
                  title="Toggle Audio"
                >
                  {isMuted ? <FaVolumeMute className="text-xs" /> : <FaVolumeUp className="text-xs text-accent" />}
                  <span>{isMuted ? 'Unmute' : 'Voice On'}</span>
                </button>

                <button
                  onClick={toggleSpeed}
                  className="btn-artcraft-outline py-2 px-3 text-[10px] cursor-pointer"
                  title="Playback Speed"
                >
                  {playbackSpeed}x
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="p-2 border border-line text-muted hover:text-ink hover:bg-bg-raised transition-colors cursor-pointer"
                  title="Reset to 0s"
                >
                  <FaSyncAlt className="text-xs" />
                </button>
                <span className="hud-label text-faint hidden sm:inline">
                  DIRECTOR'S CUT • PERADENIYA
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </SectionFrame>
  );
}
