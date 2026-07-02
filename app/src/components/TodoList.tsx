import { useMemo, useState } from 'react';
import type { Filter, Todo } from '@/types/todo';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
  onClearCompleted: () => void;
  onToggleAll: () => void;
}

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
];

export default function TodoList({
  todos,
  onToggle,
  onRemove,
  onUpdate,
  onClearCompleted,
  onToggleAll,
}: TodoListProps) {
  const [filter, setFilter] = useState<Filter>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const visible = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.completed);
    if (filter === 'completed') return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  const completedCount = todos.filter((t) => t.completed).length;
  const activeCount = todos.length - completedCount;
  const allDone = todos.length > 0 && activeCount === 0;

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const commitEdit = () => {
    if (editingId) onUpdate(editingId, editText);
    setEditingId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  if (todos.length === 0) {
    return (
      <div className="mt-6 rounded-2xl bg-white shadow-sm border border-slate-200 py-14 text-center">
        <div className="text-5xl mb-3">📝</div>
        <p className="text-slate-500 text-sm">
          No tasks yet. Add one above to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-2xl bg-white shadow-sm border border-slate-200 overflow-hidden">
      {/* Filter bar */}
      <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-slate-100">
        <button
          onClick={onToggleAll}
          className="text-xs text-slate-500 hover:text-slate-800 transition px-2 py-1"
          title={allDone ? 'Mark all as active' : 'Mark all as completed'}
        >
          {allDone ? '↺ Uncheck all' : '✓ Check all'}
        </button>
        <div className="flex gap-1 bg-slate-100 rounded-full p-1">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`text-xs font-medium px-3 py-1 rounded-full transition ${
                filter === f.key
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <ul className="divide-y divide-slate-100">
        {visible.length === 0 ? (
          <li className="px-5 py-10 text-center text-sm text-slate-400">
            {filter === 'active'
              ? 'Nothing left to do. Nice work!'
              : 'No completed tasks yet.'}
          </li>
        ) : (
          visible.map((todo) => {
            const isEditing = editingId === todo.id;
            return (
              <li
                key={todo.id}
                className="group flex items-center gap-3 px-5 py-3 hover:bg-slate-50/60 transition"
              >
                <button
                  onClick={() => onToggle(todo.id)}
                  aria-label={
                    todo.completed ? 'Mark as active' : 'Mark as completed'
                  }
                  className={`shrink-0 h-6 w-6 rounded-full border-2 flex items-center justify-center transition ${
                    todo.completed
                      ? 'bg-gradient-to-br from-indigo-500 to-purple-500 border-transparent text-white'
                      : 'border-slate-300 hover:border-indigo-400'
                  }`}
                >
                  {todo.completed && (
                    <svg
                      viewBox="0 0 20 20"
                      className="h-3.5 w-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 10l3 3 7-7"
                      />
                    </svg>
                  )}
                </button>

                {isEditing ? (
                  <input
                    autoFocus
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={commitEdit}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') commitEdit();
                      if (e.key === 'Escape') cancelEdit();
                    }}
                    className="flex-1 bg-transparent outline-none text-slate-800 border-b border-indigo-400 pb-0.5"
                  />
                ) : (
                  <span
                    onDoubleClick={() => startEdit(todo)}
                    className={`flex-1 text-slate-800 cursor-text select-none break-words ${
                      todo.completed ? 'line-through text-slate-400' : ''
                    }`}
                  >
                    {todo.text}
                  </span>
                )}

                <button
                  onClick={() => onRemove(todo.id)}
                  aria-label="Delete task"
                  className="shrink-0 opacity-0 group-hover:opacity-100 focus:opacity-100 text-slate-300 hover:text-rose-500 transition text-xl leading-none px-1"
                >
                  ×
                </button>
              </li>
            );
          })
        )}
      </ul>

      {/* Bottom bar */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 text-xs text-slate-500">
        <span>
          {activeCount} {activeCount === 1 ? 'item' : 'items'} left
        </span>
        {completedCount > 0 && (
          <button
            onClick={onClearCompleted}
            className="hover:text-rose-500 transition"
          >
            Clear completed ({completedCount})
          </button>
        )}
      </div>
    </div>
  );
}
