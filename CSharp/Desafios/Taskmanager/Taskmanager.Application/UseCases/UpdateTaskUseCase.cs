using Taskmanager.Communication.Model;

namespace Taskmanager.Application.UseCases;

public class UpdateTaskUseCase
{
    public void Execute(int id, TaskItem request)
    {
        var task = TaskStorage.Tasks.FirstOrDefault(t => t.Id == id);
        
        if (task == null)
        {
            throw new Exception("Task not found");
        }

        task.Nome = request.Nome;
        task.Descricao = request.Descricao;
        task.Prioridade = request.Prioridade;
        task.DataLimite = request.DataLimite;
        task.Status = request.Status;

    }
}