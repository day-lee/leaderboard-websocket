// components/AthleteRow.tsx
import { memo } from 'react';
import type { Athlete } from '../types';

const rowStyle = 'border-b border-gray-500 py-2 text-center';

interface AthleteRowProps {
  athlete: Athlete;
  gap: string;
  onPushGraphic: (message: string) => void;
}

function AthleteRow({ athlete, gap, onPushGraphic }: AthleteRowProps) {
  const handleClick = () => {
    const message = `RENDER_GRAPHIC*SCENE=LOWER_THIRD*NAME=${athlete.name || 'N/A'}*COUNTRY=${athlete.country || 'N/A'}*GAP=${gap}`;
    onPushGraphic(message);
  };

  return (
    <>
      <div className={rowStyle}>{athlete.rank}</div>
      <div className={rowStyle}>{athlete.country || <span className="text-red-500">N/A</span>}</div>
      <div className={rowStyle}>{athlete.bib}</div>
      <div className={`${rowStyle} text-left pl-4`}>{athlete.name || <span className="text-red-500">N/A</span>}</div>
      <div className={rowStyle}>{gap}</div>
      <div className={rowStyle}>{athlete.speedKmh.toFixed(1)}</div>
      <div className={rowStyle}>{athlete.distance.toFixed(1)}</div>
      <div className={rowStyle}>
        <button
          onClick={handleClick}
          className="px-2 py-1 border border-amber-400 text-amber-300 text-xs font-bold"
        >
          PUSH GRAPHIC
        </button>
      </div>
    </>
  );
}

export default memo(AthleteRow);