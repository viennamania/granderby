import React, { useState } from 'react';

export default function Jockey() {
  const modelRef = React.useRef();
  const [annots, setAnnots] = useState([]);

  const handleClick = (event) => {
    const { clientX, clientY } = event;

    if (modelRef.current) {
      let hit = modelRef.current.positionAndNormalFromPoint(clientX, clientY);
      if (hit) {
        setAnnots((annots) => {
          return [...annots, hit];
        });
      }
    }
  };

  const getDataPosition = (annot) => {
    return `${annot.position.x} ${annot.position.y} ${annot.position.z}`;
  };

  const getDataNormal = (annot) => {
    return `${annot.normal.x} ${annot.normal.y} ${annot.normal.z}`;
  };

  return (
    <>
      <model-viewer
        id="yearling"
        camera-controls="true"
        autoplay="true"
        //src="https://horsegen.s3.us-west-1.amazonaws.com/reveal-assets/roan.glb"
        src="./models/roan.glb"
        alt="Yearling"
        //animation-name="yearling_breathing_idle"
        animation-name="yearling_gallop_idle"
        interaction-prompt="none"
        scale="-1 1 1"
        exposure="1.3"
        camera-orbit="-20deg 88deg auto"
        max-camera-orbit="Infinity 100deg auto"
        min-camera-orbit="-Infinity 0deg 300%"
        shadow-intensity="2"
        shadow-softness="1"
        ar-status="not-presenting"
        //style="width: 100vw; height: 100vh;"
      ></model-viewer>
    </>
  );
}

{
  /*



<model-viewer
  id="yearling"
  camera-controls="true"
  autoplay="true"
  ///src="https://horsegen.s3.us-west-1.amazonaws.com/reveal-assets/roan.glb"
  src="./models/roan.glb"
  alt="Yearling"
  animation-name="yearling_breathing_idle"
  interaction-prompt="none"
  scale="-1 1 1"
  exposure="1.3"
  camera-orbit="-20deg 88deg auto"
  max-camera-orbit="Infinity 100deg auto"
  min-camera-orbit="-Infinity 0deg 300%"
  shadow-intensity="2"
  shadow-softness="1"
  ar-status="not-presenting"
  style="width: 100vw; height: 100vh;">
</model-viewer>

    <model-viewer
      // className="model-viewer"
      src="./models/roan.glb"
      alt="A Jockey"
      exposure="0.008"
      camera-controls
      ar
      ar-modes="webxr"
      onClick={handleClick}
      ref={(ref) => {
        modelRef.current = ref;
      }}
    >

      
      {annots.map((annot, idx) => (
        <button
          key={`hotspot-${idx}`}
          className="view-button"
          slot={`hotspot-${idx}`}
          data-position={getDataPosition(annot)}
          data-normal={getDataNormal(annot)}
        ></button>
      ))}
      

    </model-viewer>
      */
}
