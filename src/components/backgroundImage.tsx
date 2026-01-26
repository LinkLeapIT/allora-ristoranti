import { memo } from "react";
import Image from 'next/image';
import bgImage2 from "../../public/assets/images/allora-wood.jpg";
import bgImage from "../../public/assets/images/baground.jpg";

interface BackgroundImageProps {
  className?: string; // Allow custom class names to be passed
  image?: 'wood' | 'default';
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({ className, image = 'default' }) => {
  const imageSrc = image === 'wood' ? bgImage2 : bgImage;

  return (
    <div className={`absolute inset-0 -z-10 ${className || ''}`}>
      <Image
        src={imageSrc}
        alt="Background Image"
        fill
        style={{ objectFit: 'cover' }}
        priority
      />
    </div>
  );
};

export const BackgroundImage2: React.FC<BackgroundImageProps> = ({ className }) => {
  return (
    <div className={`absolute inset-0 -z-10 ${className || ''}`}>
      <Image
        src={bgImage}
        alt="Background Image"
        fill
        style={{ objectFit: 'cover' }}
        priority
      />
    </div>
  );
};

export default memo(BackgroundImage);
