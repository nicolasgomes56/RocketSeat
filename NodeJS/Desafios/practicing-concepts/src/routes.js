import { randomUUID } from 'crypto';
import { Database } from './database.js';
import { routePathBuild } from './utils/routePathBuild.js';

/**
 * POST => Criar uma task
 * GET => Listar todas as tasks
 * PUT => Atualizar uma task
 * DELETE => Deletar uma task
 * PATCH => Marcar uma task como concluída
 */

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: routePathBuild('/tasks'),
    handler: async (req, res) => {
      const { search } = req.query;

      const tasks = database.select(
        'tasks',
        search
          ? {
              title: search,
              description: search,
            }
          : null,
      );

      return res.writeHead(200).end(JSON.stringify(tasks));
    },
  },
  {
    method: 'POST',
    path: routePathBuild('/tasks'),
    handler: async (req, res) => {
      try {
        const { title, description } = req.body;

        if (title === '' || description === '')
          return res.writeHead(400).end('Os campos não podem estar vazios!');

        const tasks = {
          id: randomUUID(),
          title,
          description,
          completed_at: null,
          created_at: Date.now(),
          update_at: Date.now(),
        };

        database.insert('tasks', tasks);

        return res.writeHead(201).end('Tarefa criada com sucesso!');
      } catch (error) {
        return res.writeHead(404).end(`Erro ao criar a tarefa: ${error}`);
      }
    },
  },
  {
    method: 'PUT',
    path: routePathBuild('/tasks/:id'),
    handler: async (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;

      if (title === '' || description === '')
        return res.writeHead(400).end('Os campos não podem estar vazios!');

      const result = database.update('tasks', id, {
        title,
        description,
        update_at: Date.now(),
      });

      if (result === 0) return res.writeHead(404).end('Tarefa não encontrada!');

      return res.writeHead(204).end('Tarefa atualizada com sucesso!');
    },
  },
  {
    method: 'PATCH',
    path: routePathBuild('/tasks/:id'),
    handler: async (req, res) => {
      const { id } = req.params;

      const result = database.update('tasks', id);

      if (result === 0) return res.writeHead(404).end('Tarefa não encontrada!');

      return res.writeHead(200).end('Tarefa concluída com sucesso!');
    },
  },
  {
    method: 'DELETE',
    path: routePathBuild('/tasks/:id'),
    handler: async (req, res) => {
      const { id } = req.params;

      const result = database.delete('tasks', id);

      if (result === 0) return res.writeHead(404).end('Tarefa não encontrada!');

      return res.writeHead(200).end('Tarefa deletada com sucesso!');
    },
  },
];
