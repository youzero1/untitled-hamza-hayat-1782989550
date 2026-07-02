import Header from '@/components/Header';
import TodoInput from '@/components/TodoInput';
import TodoList from '@/components/TodoList';
import { useTodos } from '@/hooks/useTodos';

export default function HomePage() {
  const {
    todos,
    addTodo,
    toggleTodo,
    removeTodo,
    updateTodo,
    clearCompleted,
    toggleAll,
  } = useTodos();

  const activeCount = todos.filter((t) => !t.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-800">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
        <Header totalCount={todos.length} activeCount={activeCount} />

        <TodoInput onAdd={addTodo} />

        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onRemove={removeTodo}
          onUpdate={updateTodo}
          onClearCompleted={clearCompleted}
          onToggleAll={toggleAll}
        />

        <p className="mt-8 text-center text-xs text-slate-400">
          Double-click a task to edit · Tasks are saved to your browser
        </p>
      </div>
    </div>
  );
}
