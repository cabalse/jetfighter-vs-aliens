import { useEffect } from "react";

type Props = {
  onKeyPress: (key: string, value: boolean) => void;
};

const DetectKeyPress = ({ onKeyPress }: Props) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      onKeyPress(event.key, true);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      onKeyPress(event.key, false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return null;
};

export default DetectKeyPress;
