import { useEffect, useState } from 'react';
import type { Athlete, ConnectionStatus } from './types';
import Header from './components/Header';
import Leaderboard from './components/Leaderboard.tsx';

function App() {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('Disconnected');
  const [athletes, setAthletes] = useState<Athlete[]>([]);

    const incompleteCount = athletes.filter(
    a => !a.country || !a.name || !a.bib
  ).length;

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => setConnectionStatus('Connected');
    ws.onclose = () => setConnectionStatus('Disconnected');
    ws.onerror = () => setConnectionStatus('Error');

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'RACE_UPDATE') {
          setAthletes(data.athletes);
        }
      } catch (error) {
        console.error('Failed to parse message:', error);
      }
    };

    return () => ws.close();
  }, []);

  return (
    <div className="min-h-screen min-w-screen bg-neutral-900 text-white p-8 font-mono">
      <Header connectionStatus={connectionStatus} incompleteCount={incompleteCount} />
      <main>
        <Leaderboard athletes={athletes} />
      </main>
    </div>
  );
}

export default App;