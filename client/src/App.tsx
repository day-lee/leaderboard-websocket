import { useEffect, useRef, useState } from 'react';
import type { Athlete } from './types';
import Header from './components/Header';
import Leaderboard from './components/Leaderboard';

function App() {
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  const incompleteCount = athletes.filter(
    a => !a.country || !a.name || !a.bib
  ).length;

  const sendMessage = (message: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(message);
    }
  };

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    wsRef.current = ws;

    ws.onopen = () => setConnectionStatus('Connected');
    ws.onclose = () => setConnectionStatus('Disconnected');
    ws.onerror = () => setConnectionStatus('Disconnected');

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'RACE_START') {
          console.log('Race started at:', new Date(data.startTime).toISOString()); 
        }
        if (data.type === 'RACE_UPDATE') {
          setAthletes(data.athletes);
        }
        if (data.type === 'ACK') {
        console.log('ACK received:', data.message);
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
        <Leaderboard athletes={athletes} onPushGraphic={sendMessage} />
      </main>
    </div>
  );
}

export default App;