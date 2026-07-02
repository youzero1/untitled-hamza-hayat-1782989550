interface HeaderProps {
  totalCount: number;
  activeCount: number;
}

export default function Header({ totalCount, activeCount }: HeaderProps) {
  return (
    <header className="text-center">
      <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        todos
      </h1>
      <p className="mt-3 text-slate-500 text-sm">
        {totalCount === 0
          ? 'Nothing on your plate. Add your first task below.'
          : `${activeCount} of ${totalCount} still to do`}
      </p>
    </header>
  );
}
