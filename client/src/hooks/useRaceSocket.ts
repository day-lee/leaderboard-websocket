import {  useEffect, useRef, useState, useCallback } from 'react';
import type { Athlete, ServerMessage} from '../types';

export function useRaceSocket(url: string) {
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [isRaceActive, setIsRaceActive] = useState(true);

  const wsRef = useRef<WebSocket | null>(null);
  
  const sendMessage = useCallback((message: string) => {
  if (wsRef.current?.readyState === WebSocket.OPEN) {
    wsRef.current.send(message);
  }
  }, []);
  
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    wsRef.current = ws;

    ws.onopen = () => setConnectionStatus('Connected');
    ws.onclose = () => setConnectionStatus('Disconnected');
    ws.onerror = () => setConnectionStatus('Disconnected');

    ws.onmessage = (event) => {
      try {
        const data: ServerMessage = JSON.parse(event.data);
        if (data.type === 'RACE_START') {
          console.log('Race started at:', new Date(data.startTime).toISOString()); 
        }
        if (data.type === 'RACE_UPDATE') {
          setAthletes(data.athletes);
        }
        if (data.type === 'ACK') {
          console.log('ACK received:', data.message);
        }
        if (data.type === 'RACE_STATUS') {
          setIsRaceActive(data.isActive);    
        }
      } catch (error) {
        console.error('Failed to parse message:', error);
      }
    };

    return () => ws.close();
  }, [url]);

    return {
        connectionStatus,
        athletes,
        isRaceActive,
        sendMessage
    }
}