import { useState } from 'react';

export default function NoteSection() {
  const [hoveredWord, setHoveredWord] = useState(null);

  const images = {
    thinking: {
      src: '/images/shape-5.webp',
      position: 'top-right',
    },
    creativity: {
      src: '/images/shape-4.webp',
      position: 'left-center',
    },
    quality: {
      src: '/images/shape-5.webp',
      position: 'bottom-center',
    },
  };

  const getPositionClasses = (position) => {
    switch (position) {
      case 'top-right':
        return 'top-10 right-[80px]';
      case 'left-center':
        return 'top-[100px] left-[90px] ';
      case 'bottom-center':
        return 'bottom-[0px] left-1/2 ';
      default:
        return '';
    }
  };

  return (
    <div className="lg:py-40  flex items-center justify-center p-4 relative overflow-hidden">
      <div className="text-center max-w-4xl font-semibold text-4xl md:text-[90px] leading-[100%]   relative z-10">
        <p>
          It’s all about the unique{' '}
          <span
            className="text-green-500 relative cursor-pointer "
            onMouseEnter={() => setHoveredWord('thinking')}
            onMouseLeave={() => setHoveredWord(null)}
          >
            thinking
          </span>{' '}
          with{' '}
          <span
            className="text-green-500 relative cursor-pointer "
            onMouseEnter={() => setHoveredWord('creativity')}
            onMouseLeave={() => setHoveredWord(null)}
          >
            creativity
          </span>{' '}
          and{' '}
          <span
            className="text-green-500 relative cursor-pointer "
            onMouseEnter={() => setHoveredWord('quality')}
            onMouseLeave={() => setHoveredWord(null)}
          >
            quality
          </span>{' '}
          for complex solution in easy way.
        </p>
      </div>

      {/* Hover Image positioned by word */}
      {hoveredWord && (
        <img
          src={images[hoveredWord].src}
          alt={hoveredWord}
          className={`absolute w-28 h-28 object-contain transition-opacity duration-300 opacity-100 ${getPositionClasses(
            images[hoveredWord].position
          )}`}
        />
      )}
    </div>
  );
}
