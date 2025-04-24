import { useEffect, useState } from 'react';
import Header from './components/Header';
import Tasks, { ITasks } from './components/Tasks';
import './global.css';

function App() {
  const [tasks, setTasks] = useState<ITasks[]>([]);

  function addTask(taskTitle: string) {
    saveTasksLocal([
      ...tasks,
      {
        id: crypto.randomUUID(),
        title: taskTitle,
        isComplete: false,
      },
    ]);
  }

  function deleteTask(taskId: string) {
    const newTasks = tasks.filter(task => task.id !== taskId);
    saveTasksLocal(newTasks);
  }

  function toggleTaskIsCompleted(taskId: string) {
    const newTasks = tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          isComplete: !task.isComplete,
        };
      }
      return task;
    });
    saveTasksLocal(newTasks);
  }

  function saveTasksLocal(newTasks: ITasks[]) {
    setTasks(newTasks);
    localStorage.setItem('todoList:tasksSaved', JSON.stringify(tasks));
  }

  function loadTasksLocal() {
    const tasksSaved = localStorage.getItem('todoList:tasksSaved');
    if (tasksSaved) {
      setTasks(JSON.parse(tasksSaved));
    }
  }

  useEffect(() => {
    loadTasksLocal();
  }, []);

  return (
    <>
      <Header onAddTask={addTask} />
      <Tasks tasks={tasks} onDeleteTask={deleteTask} onTaskCompleted={toggleTaskIsCompleted} />
    </>
  );
}

export default App;
