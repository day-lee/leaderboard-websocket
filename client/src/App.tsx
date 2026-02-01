import { useEffect, useState } from 'react';
import type { Athlete, ConnectionStatus } from './types';

function App() {
  const [status, setStatus] = useState<ConnectionStatus>('Disconnected');
  const [athletes, setAthletes] = useState<Athlete[]>([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => setStatus('Connected');
    ws.onclose = () => setStatus('Disconnected');
    ws.onerror = () => setStatus('Error');

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
        </div>
        
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${status === 'Connected' ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-sm">{status}</span>
        </div>
      </header>

      <main>
        {athletes.length === 0 ? (
          <div>Waiting for data...</div>
        ) : (
          <pre className="text-xs">{JSON.stringify(athletes.slice(0), null, 2)}</pre>
        )}
      </main>
    </div>
  );
}

export default App;