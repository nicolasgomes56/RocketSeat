using Taskmanager.Communication.Model;

namespace Taskmanager.Application.UseCases;

public class GetAllTasksUseCase
{
    public List<TaskItem> Execute()
    {
        return TaskStorage.Tasks;
    }
}