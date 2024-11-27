import { useEffect, useState } from "react";

import useTexture from "../../hooks/use-texture";

import cloud1 from "../../assets/clouds/cloud-1.png";
import cloud2 from "../../assets/clouds/cloud-2.png";
import cloud3 from "../../assets/clouds/cloud-3.png";
import cloud4 from "../../assets/clouds/cloud-4.png";
import cloud5 from "../../assets/clouds/cloud-5.png";
import cloud6 from "../../assets/clouds/cloud-6.png";
import cloud7 from "../../assets/clouds/cloud-7.png";
import cloud8 from "../../assets/clouds/cloud-8.png";
import cloud9 from "../../assets/clouds/cloud-9.png";
import cloud10 from "../../assets/clouds/cloud-10.png";
import cloud11 from "../../assets/clouds/cloud-11.png";
import cloud12 from "../../assets/clouds/cloud-12.png";
import cloud13 from "../../assets/clouds/cloud-13.png";
import cloud14 from "../../assets/clouds/cloud-14.png";

import ScreenObject from "../../framework/screen-object";
import generateRandomCoordinates from "../../utilities/generate-random-coordinates";
import CONSTANTS from "../../constants";

const scale = 200;

const Clouds = () => {
  const [cloud1Texture, ratio, width, height] = useTexture(cloud1);
  const [cloud2Texture, , ,] = useTexture(cloud2);
  const [cloud3Texture, , ,] = useTexture(cloud3);
  const [cloud4Texture, , ,] = useTexture(cloud4);
  const [cloud5Texture, , ,] = useTexture(cloud5);
  const [cloud6Texture, , ,] = useTexture(cloud6);
  const [cloud7Texture, , ,] = useTexture(cloud7);
  const [cloud8Texture, , ,] = useTexture(cloud8);
  const [cloud9Texture, , ,] = useTexture(cloud9);
  const [cloud10Texture, , ,] = useTexture(cloud10);
  const [cloud11Texture, , ,] = useTexture(cloud11);
  const [cloud12Texture, , ,] = useTexture(cloud12);
  const [cloud13Texture, , ,] = useTexture(cloud13);
  const [cloud14Texture, , ,] = useTexture(cloud14);

  const [clouds, setClouds] = useState<{ x: number; y: number }[]>([]);

  const cloudTextures = [
    cloud1Texture,
    cloud2Texture,
    cloud3Texture,
    cloud4Texture,
    cloud5Texture,
    cloud6Texture,
    cloud7Texture,
    cloud8Texture,
    cloud9Texture,
    cloud10Texture,
    cloud11Texture,
    cloud12Texture,
    cloud13Texture,
    cloud14Texture,
  ];

  useEffect(() => {
    setClouds(generateRandomCoordinates(1000, 1000, 100));
  }, []);

  return (
    <>
      {clouds.map((cloud: { x: number; y: number }) => (
        <ScreenObject
          dimensions={{ width: width, height: height }}
          position={[cloud.x, cloud.y, CONSTANTS.Z_POSITION.CLOUDS]}
          scale={scale}
          texture={
            cloudTextures[Math.floor(Math.random() * cloudTextures.length)]
          }
          textureRatio={ratio}
        />
      ))}
    </>
  );
};

export default Clouds;
