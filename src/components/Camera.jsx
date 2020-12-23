import React, { useRef, useState } from 'react';

import { useUserMedia } from './../helper/userMedia';
import { useIonViewDidEnter, useIonViewDidLeave } from '@ionic/react';
import CanvasQR from './Canvas';

const CAPTURE_OPTIONS = {
    audio: false,
    video: true//{ facingMode: "environment" },
};

const Camera = (props) => {
    const [metadata, setMetadata] = useState();
    
    const videoRef = useRef();
    const mediaStream = useUserMedia(CAPTURE_OPTIONS);

    if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
        videoRef.current.srcObject = mediaStream;
    }

    useIonViewDidEnter(() => {
        if (videoRef.current) handleCanPlay();
    });

    useIonViewDidLeave(() => {
        videoRef.current.pause();
    })

    function handleCanPlay() {
        videoRef.current.play();
    }

    return (
        <>
            <video
                ref={videoRef}
                onCanPlay={handleCanPlay}
                onLoadedMetadata={e => { setMetadata({ videoHeight: e.target.videoHeight, videoWidth: e.target.videoWidth }) }}
                autoPlay
                playsInline
                muted />
            <CanvasQR videoRef={videoRef} videoMeta={metadata} setQRCode={props.setQRCode} />
        </>
    );
}

export default Camera;