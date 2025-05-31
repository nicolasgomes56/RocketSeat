using Taskmanager.Communication.Model;

namespace Taskmanager.Application.UseCases;

public class CreateTaskUseCase
{
    public void Execute(TaskItem request)
    {
        var task = new TaskItem
        {
            Id = TaskStorage.Tasks.Count + 1,
            Nome = request.Nome,
            Descricao = request.Descricao,
            Prioridade = request.Prioridade,
            DataLimite = request.DataLimite,
            Status = request.Status
        };

        TaskStorage.Tasks.Add(task);
    }
}