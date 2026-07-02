import { useState } from 'react';

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [value, setValue] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setValue('');
  };

  return (
    <form
      onSubmit={submit}
      className="mt-8 flex items-center gap-3 rounded-2xl bg-white shadow-sm border border-slate-200 px-5 py-3 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-100 transition"
    >
      <span className="text-2xl text-slate-300 select-none leading-none">+</span>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 bg-transparent outline-none text-slate-800 placeholder-slate-400 text-base"
        autoFocus
      />
      {value.trim() && (
        <button
          type="submit"
          className="rounded-lg bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white text-sm font-medium px-4 py-1.5 transition"
        >
          Add
        </button>
      )}
    </form>
  );
}
