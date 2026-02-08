import { useRaceSocket } from './hooks/useRaceSocket';
import Header from './components/Header';
import Leaderboard from './components/Leaderboard';

/*
Creating a custom hook
1. which data to move? 
2. create a new file
3. move state and ref 
4. move useEffect & handler
5. define what to return
6. Apply to App component 
*/

function App() {

  const {
    connectionStatus,
    athletes,
    isRaceActive,
    sendMessage
  } = useRaceSocket('ws://localhost:8080')

  const incompleteCount = athletes.filter(
    a => !a.country || !a.name || !a.bib).length;
  
  const toggleRace = () => {
    sendMessage('TOGGLE_RACE');
  };
  
  return (
    <div className="min-h-screen min-w-screen bg-neutral-900 text-white p-8 font-mono">
      <Header connectionStatus={connectionStatus} 
              incompleteCount={incompleteCount} 
              isRaceActive={isRaceActive}
              onToggleRace={toggleRace}/>
      <main>
        <Leaderboard athletes={athletes} onPushGraphic={sendMessage} />
      </main>
    </div>
  );
}

export default App;