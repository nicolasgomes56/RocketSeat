import { PlusCircle } from '@phosphor-icons/react';
import styles from './Header.module.css';

import todoLogo from '@/assets/Logo.svg';
import { ChangeEvent, FormEvent, useState } from 'react';

interface HeaderProps {
  onAddTask: (taskTitle: string) => void;
}

function Header({ onAddTask }: HeaderProps) {
  const [title, setTitle] = useState('');

  function handleOnChangeTitle(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onAddTask(title);
  }

  return (
    <header className={styles.header}>
      <img src={todoLogo} />

      <form className={styles.taskForm} onSubmit={handleSubmit}>
        <input value={title} onChange={handleOnChangeTitle} placeholder="Adicione uma nova tarefa" />
        <button>
          Criar
          <PlusCircle size={18} weight="bold" />
        </button>
      </form>
    </header>
  );
}


export default Header;
