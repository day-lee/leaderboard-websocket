import { Fragment, useEffect, useState } from 'react';
import type { Athlete, ConnectionStatus } from './types';

  const headerStyle = 'border-b py-4 font-bold text-center';
  const rowStyle = 'border-b border-gray-500 py-2 text-center';

function App() {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('Disconnected');
  const [athletes, setAthletes] = useState<Athlete[]>([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => setConnectionStatus('Connected');
    ws.onclose = () => setConnectionStatus('Disconnected');
    ws.onerror = () => setConnectionStatus('Error');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'RACE_UPDATE') {
        setAthletes(data.athletes);
      }
    };

    return () => ws.close();
  }, []);

  return (
    <div className="min-h-screen min-w-screen bg-neutral-900 text-white p-8 font-mono">
      <header className="mb-8 border-b border-neutral-700 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-yellow-500">
            GIRRAPHIC <span className="text-white">LIVE</span>
          </h1>
          <p className="text-sm text-neutral-400">Race Control System</p>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${connectionStatus === 'Connected' ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-sm">{connectionStatus}</span>
        </div>
        </div>
      </header>
      <main>
        {athletes.length === 0 ? (
          <div>Waiting for data...</div>
        ) : (
          <div className='grid grid-cols-[80px_100px_60px_1fr_120px_120px] px-4 max-w-3xl mx-auto'>
            {/* header */}
            <div className={headerStyle}>Rank</div>
            <div className={headerStyle}>Country</div>
            <div className={headerStyle}>Bib</div>
            <div className={`${headerStyle} text-left pl-4`}>Name</div>
            <div className={headerStyle}>Speed(km/h)</div>
            <div className={headerStyle}>Distance(m)</div>
            {/* rows */}
            { athletes.map((athlete) => (
              <Fragment key={athlete.id}>
                <div className={rowStyle} >{athlete.rank}</div>
                <div className={rowStyle} >{athlete.country}</div>
                <div className={rowStyle} >{athlete.bib}</div>
                <div className={`${rowStyle} text-left pl-4`}>{athlete.name}</div>
                <div className={rowStyle}>{athlete.speedKmh.toFixed(1)}</div>
                <div className={rowStyle}>{athlete.distance.toFixed(1)}</div>
              </Fragment>  
            ))
            }
          </div>
        )}
      </main>
    </div>
  );
}

export default App;