import type { Athlete } from '../types';
import AthleteRow from './AthleteRow';

const headerStyle = 'border-b border-gray-500 py-4 font-bold text-center';

interface LeaderboardProps {
  athletes: Athlete[];
  onPushGraphic: (message: string) => void;
}

function Leaderboard({ athletes, onPushGraphic }: LeaderboardProps) {
  if (athletes.length === 0) {
    return <div>Waiting for data...</div>;
  }

  const leaderDistance = athletes[0]?.distance ?? 0;

  const formatGap = (athlete: Athlete): string => {
    if (athlete.rank === 1) return 'Leader';
    return `+${(leaderDistance - athlete.distance).toFixed(1)}m`;
  };

  return (
    <div className="grid grid-cols-[80px_100px_60px_1fr_100px_120px_120px_140px] px-4 max-w-5xl mx-auto">
      {/* header */}
      <div className={headerStyle}>Rank</div>
      <div className={headerStyle}>Country</div>
      <div className={headerStyle}>Bib</div>
      <div className={`${headerStyle} text-left pl-4`}>Name</div>
      <div className={headerStyle}>Gap</div>
      <div className={headerStyle}>Speed(km/h)</div>
      <div className={headerStyle}>Distance(m)</div>
      <div className={headerStyle}>Push to Air</div>

      {/* rows */}
      {athletes.map((athlete) => (
        <AthleteRow
          key={athlete.id}
          athlete={athlete}
          gap={formatGap(athlete)}
          onPushGraphic={onPushGraphic}
        />
      ))}
    </div>
  );
}

export default Leaderboard;