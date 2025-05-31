using Taskmanager.Communication.Model;

namespace Taskmanager.Application.UseCases;

public class GetTaskByIdUseCase
{
    public TaskItem Execute(int id)
    {
        var task = TaskStorage.Tasks.FirstOrDefault(t => t.Id == id);
        
        if (task == null)
        {
            throw new Exception("Task not found");
        }

        return task;
    }
}