import { Fragment } from 'react';
import type { Athlete } from '../types';

const headerStyle = 'border-b border-gray-500 py-4 font-bold text-center';
const rowStyle = 'border-b border-gray-500 py-2 text-center';

interface LeaderboardProps {
  athletes: Athlete[];
}

function Leaderboard({ athletes }: LeaderboardProps) {
  if (athletes.length === 0) {
    return <div>Waiting for data...</div>;
  }

  const leaderDistance = athletes[0]?.distance ?? 0;

  return (
    <div className="grid grid-cols-[80px_100px_60px_1fr_100px_120px_120px] px-4 max-w-4xl mx-auto">
      {/* header */}
      <div className={headerStyle}>Rank</div>
      <div className={headerStyle}>Country</div>
      <div className={headerStyle}>Bib</div>
      <div className={`${headerStyle} text-left pl-4`}>Name</div>
      <div className={headerStyle}>Gap</div>
      <div className={headerStyle}>Speed(km/h)</div>
      <div className={headerStyle}>Distance(m)</div>

      {/* rows */}
      {athletes.map((athlete) => {
        const gap = athlete.rank === 1 
          ? 'Leader' 
          : `+ ${(leaderDistance - athlete.distance).toFixed(1)}m`;

        return (
          <Fragment key={athlete.id}>
            <div className={rowStyle}>{athlete.rank}</div>
            <div className={rowStyle}>{athlete.country || <span className="text-red-500">N/A</span>}</div>
            <div className={rowStyle}>{athlete.bib}</div>
            <div className={`${rowStyle} text-left pl-4`}>{athlete.name || <span className="text-red-500">N/A</span>}</div>
            <div className={`${rowStyle} ${gap === 'Leader' ? 'font-bold' : ''}`}>{gap}</div>
            <div className={rowStyle}>{athlete.speedKmh.toFixed(1)}</div>
            <div className={rowStyle}>{athlete.distance.toFixed(1)}</div>
          </Fragment>
        );
      })}
    </div>
  );
}

export default Leaderboard;