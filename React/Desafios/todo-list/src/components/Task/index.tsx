import { CheckCircle, Trash } from '@phosphor-icons/react';
import { ITasks } from '../Tasks';
import styles from './Task.module.css';

interface ITask {
  task: ITasks;
  onDeleteTask: (taskId: string) => void;
  onTaskCompleted: (taskId: string) => void;
}

function Task({ task, onDeleteTask, onTaskCompleted }: ITask) {
  return (
    <div className={styles.task}>
      <button className={styles.taskCheckContainer} onClick={() => onTaskCompleted(task.id)}>
        {task.isComplete ? <CheckCircle weight='fill' /> : <div />}
      </button>
      <p className={task.isComplete ? styles.textIsCompleted : ''}>{task.title}</p>
      <button className={styles.taskDeleteButton} onClick={() => onDeleteTask(task.id)}>
        <Trash size={20} />
      </button>
    </div>
  );
}

export default Task;
