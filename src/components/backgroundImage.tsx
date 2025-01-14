import { memo } from "react";
import bgImage2 from "../../public/assets/images/allora-wood.jpg";
import bgImage from "../../public/assets/images/baground.jpg";

interface BackgroundImageProps {
  className?: string; // Allow custom class names to be passed
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({ className }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${bgImage2.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
      className={`absolute inset-0 -z-10 ${className || ""}`}
    />
  );
};

export const BackgroundImage2: React.FC<BackgroundImageProps> = ({ className }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${bgImage.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
      className={`absolute inset-0 bg-text -z-10 ${className || ""}`} // Append custom class names
    />
  );
};

export default memo(BackgroundImage);
