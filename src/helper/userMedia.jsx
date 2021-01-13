import { useState, useEffect } from "react";


export function useUserMedia(requestedMedia) {
  const [mediaStream, setMediaStream] = useState(null);

  const enableStream = async() => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(requestedMedia);
      setMediaStream(stream);
    } catch (err) {
      // Removed for brevity
      console.error('Getting Media Stream');
    }
  }
  // TODO::ERROR if scanner was not open before logout
  useEffect(() => {
    let mounted = true;
    if (mounted && !mediaStream) enableStream();

    return () => {
      mounted = false;
      if (mediaStream) mediaStream.getTracks().forEach(track => { track.stop(); });
    }
  }, [mediaStream, requestedMedia]);

  return mediaStream;
};