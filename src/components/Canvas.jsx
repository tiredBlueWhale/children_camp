import React, { createRef, useEffect } from 'react'

import { qrcode } from './../third_party/qr_code'

const CanvasQR = (props) => {
  //TODO: useEffect fires to often
  // const [paused, setPaused] = useState();
  const canvasRef = createRef()
  useEffect(() => {
    if (canvasRef.current && props.videoRef && props.videoRef.current && props.videoMeta) {
      const scan = setInterval(() => {
        if (!props.videoRef.current.paused) {
          try {
            const ctx = canvasRef.current.getContext('2d');
            ctx.drawImage(props.videoRef.current, 0, 0)
            var result = qrcode.process(props.videoMeta.videoWidth, props.videoMeta.videoHeight, ctx);
            props.setQRCode(result);
          } catch (err) {
            props.setQRCode(undefined);
            if (err !== "Couldn't find enough finder patterns")
              new Error(err);
          }
        }
      }, 1000 / 30);
      return () => clearInterval(scan)
    }
  })

  return (
    <canvas
      style={{ display: 'none' }}
      ref={canvasRef}
      width={props.videoMeta ? props.videoMeta.videoWidth : 400}
      height={props.videoMeta ? props.videoMeta.videoHeight : 400} />
  )
}

export default CanvasQR;