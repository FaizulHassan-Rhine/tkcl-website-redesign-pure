'use client';
import { ReactCompareSlider, ReactCompareSliderImage, ReactCompareSliderHandle } from 'react-compare-slider';

export default function BeforeAfterSlider({ beforeSrc, afterSrc, alt = 'Before After', initial = 50, className = '' }) {
  return (
    <div className={`relative h-full w-full ${className}`}>
      <ReactCompareSlider
        itemOne={<ReactCompareSliderImage src={beforeSrc} alt={`${alt} before`} />}
        itemTwo={<ReactCompareSliderImage src={afterSrc} alt={`${alt} after`} />}
        position={initial}
        boundsPadding={0}
        keyboardIncrement='5%'
        handle={
          <ReactCompareSliderHandle
            buttonStyle={{
              border: 0,
              boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
              width: 44,
              height: 44,
              borderRadius: '9999px',
              background: 'rgba(255,255,255,0.95)',
              color: 'rgba(0,0,0,0.8)',
            }}
            linesStyle={{
              background: 'rgba(255,255,255,0.85)',
              mixBlendMode: 'difference',
              width: 2,
            }}
          />
        }
        style={{ width: '100%', height: '100%', borderRadius: '1rem' }}
      />
      {/* <div className="pointer-events-none absolute left-4 top-4 z-10 rounded-full bg-black/40 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white">Before</div>
      <div className="pointer-events-none absolute right-4 top-4 z-10 rounded-full bg-black/40 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white">After</div> */}
    </div>
  );
}