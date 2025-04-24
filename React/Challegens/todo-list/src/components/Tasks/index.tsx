import Task from '../Task';
import styles from './Tasks.module.css';
import { ClipboardText } from '@phosphor-icons/react';

export interface ITasks {
  id: string;
  title: string;
  isComplete: boolean;
}

interface TasksProps {
  tasks: ITasks[];
  onDeleteTask: (taskId: string) => void;
  onTaskCompleted: (taskId: string) => void;
}

function Tasks({ tasks, onDeleteTask, onTaskCompleted }: TasksProps) {
  const tasksQuantity = tasks.length;
  const completedTasks = tasks.filter(task => task.isComplete).length;

  return (
    <section className={styles.tasks}>
      <header className={styles.header}>
        <div>
          <p>Tarefas criadas</p>
          <span>{tasks.length}</span>
        </div>
        <div>
          <p className={styles.textCompletedPurple}>Concluídas</p>
          <span>
            {completedTasks} de {tasksQuantity}
          </span>
        </div>
      </header>

      <div className={styles.taskList}>
        {tasks.map(task => {
          return <Task key={task.id} task={task} onDeleteTask={onDeleteTask} onTaskCompleted={onTaskCompleted} />;
        })}

        {tasks.length <= 0 && (
          <section className={styles.tasksEmpty}>
            <ClipboardText size={50} />
            <div>
              <p>Você ainda não tem tarefas cadastradas</p>
              <span>Crie tarefas e organize seus itens a fazer</span>
            </div>
          </section>
        )}
      </div>
    </section>
  );
}

export default Tasks;
