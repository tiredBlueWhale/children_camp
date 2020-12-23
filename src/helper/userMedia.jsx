import { useState, useEffect } from "react";


export function useUserMedia(requestedMedia) {
  const [mediaStream, setMediaStream] = useState(null);

  // TODO::ERROR if scanner was not open before logout
  useEffect(() => {
    async function enableStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(requestedMedia);
        setMediaStream(stream);
      } catch (err) {
        // Removed for brevity
        console.error('Getting Media Stream');
      }
    }

    if (!mediaStream) {
      enableStream();
    } else {
      return function cleanup() {
        mediaStream.getTracks().forEach(track => {
          console.log('stop recording');
          track.stop();
        });
      }
    }
  }, [mediaStream, requestedMedia]);

  return mediaStream;
};