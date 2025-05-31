using Microsoft.AspNetCore.Mvc;
using Taskmanager.Application.UseCases;
using Taskmanager.Communication.Model;

namespace Taskmanager.API.Controller;

[ApiController]
[Route("api/[controller]")]
public class TaskManagerController : ControllerBase
{
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult GetTasks()
    {
        var useCase = new GetAllTasksUseCase();
        var response = useCase.Execute();
        
        return Ok(response);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(TaskItem), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult GetTaskById(int id)
    {
        var useCase = new GetTaskByIdUseCase();
        
        var response = useCase.Execute(id);
        
        if (response == null)
        {
            return NotFound("Task not found.");
        }
        
        return Ok(response);
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult CreateTask([FromBody] TaskItem taskItem)
    {
        var useCase = new CreateTaskUseCase();
        useCase.Execute(taskItem);
        
        if(useCase == null)
        {
            return BadRequest("Task creation failed.");
        }

        return Created();
    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult UpdateTask(int id, [FromBody] TaskItem task)
    {
        var useCase = new UpdateTaskUseCase();
        
        useCase.Execute(id, task);
        
        if (useCase == null)
        {
            return BadRequest("Task update failed.");
        }
        
        return NoContent();
    }

    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult DeleteTask(int id)
    {
        var useCase = new DeleteTaskUseCase();
        
        useCase.Execute(id);
        
        if (useCase == null)
        {
            return BadRequest("Task deletion failed.");
        }
        
        return NoContent();
    }
}