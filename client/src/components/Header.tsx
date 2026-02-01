interface HeaderProps {
  connectionStatus: string;
  incompleteCount: number;
}

function Header({ connectionStatus, incompleteCount }: HeaderProps) {
  return (
    <header className="mb-8 border-b border-neutral-700 h-32 flex">
      <div>
        <h1 className="text-2xl font-bold text-yellow-500">
          GIRRAPHIC <span className="text-white">LIVE</span>
        </h1>
        <p className="text-sm text-neutral-400">Race Control System</p>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${connectionStatus === 'Connected' ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-sm">{connectionStatus}</span>
        </div>
          {incompleteCount > 0 && (
        <div className="text-red-500 text-sm">
          ⚠️ {incompleteCount} incomplete records
        </div>
      )}
      </div>
    </header>
  );
}

export default Header;