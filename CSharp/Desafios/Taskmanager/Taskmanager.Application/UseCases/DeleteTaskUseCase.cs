using Taskmanager.Communication.Model;

namespace Taskmanager.Application.UseCases;

public class DeleteTaskUseCase
{
    public void Execute(int id)
    {
        var task = TaskStorage.Tasks.FirstOrDefault(t => t.Id == id);
        
        if (task == null)
        {
            throw new Exception("Task not found");
        }

        TaskStorage.Tasks.Remove(task);
    }
}