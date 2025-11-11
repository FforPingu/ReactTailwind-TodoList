import { useState,useEffect } from 'react'




const PlusIcon = () =>(
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
);

export default function App() {
  
  const [tasks,setTasks] = useState( () => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newTask,setNewTask] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(newTask.trim() === '') return;

    const task = {
      id: Date.now(),
      text: newTask,
      completed:false,
    };

    setTasks([task, ...tasks]);

    setNewTask('');
  }

  const deleteTask = (id) =>{
    setTasks(tasks.filter(task => task.id != id));
  }

  const toggleComplete = (id) =>{
    setTasks(tasks.map(task=>task.id === id ? {...task, completed: !task.completed} : task
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 md:p-8">
        
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Your todo List!
        </h1>

        
        <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new activity..."
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-lg shadow hover:bg-blue-700 transition-colors duration-200 flex-shrink-0"
            aria-label="Add task"
          >
            <PlusIcon />
          </button>
        </form>

        
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <p className="text-gray-500 text-center">any activity in the list add a new one!</p>
          ) : (
            tasks.map(task => (
              <div
                key={task.id}
                className="flex items-center bg-gray-50 p-3 rounded-lg shadow-sm transition-all duration-200"
              >
                
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                  className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mr-4"
                />
                
                
                <span className={`flex-grow text-gray-800 ${task.completed ? 'line-through text-gray-400' : ''}`}>
                  {task.text}
                </span>
                
                
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-gray-400 hover:text-red-600 transition-colors duration-200 p-1"
                  aria-label="Elimina task"
                >
                  <TrashIcon />
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );

}

