using Microsoft.AspNetCore.Mvc;
using Petfolio.Application.UseCases.Pet.Delete;
using Petfolio.Application.UseCases.Pet.GetAll;
using Petfolio.Application.UseCases.Pet.GetById;
using Petfolio.Application.UseCases.Pet.Register;
using Petfolio.Application.UseCases.Pet.Update;
using Petfolio.Communication.Requests;
using Petfolio.Communication.Response;

namespace Petfolio.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PetController : ControllerBase
{
    [HttpPost]
    [ProducesResponseType(typeof(RegisterPetResp), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ErrorsResp), StatusCodes.Status400BadRequest)]
    public IActionResult Register([FromBody] PetReq request)
    {
        var response = new RegisterPetUseCase().Execute(request);

        return Created(string.Empty, response);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(typeof(ErrorsResp), StatusCodes.Status400BadRequest)]
    public IActionResult Update(int id, [FromBody] PetReq request)
    {
        new UpdatePetUseCase().Execute(id, request);

        return NoContent();
    }

    [HttpGet]
    [ProducesResponseType(typeof(PetAll), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public IActionResult GetAll()
    {
        var useCase = new GetAllPetsUseCases();
        
        var response = useCase.Execute();

        if (response.Pets.Any())
        {
            return Ok(response);
        }
        
        return NoContent();
    }
    
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(PetById), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorsResp), StatusCodes.Status404NotFound)]
    public IActionResult GetById(int id)
    {
        var useCase = new GetPetByIdUseCase();

        var response = useCase.Execute(id);

        if (response != null)
        {
            return Ok(response);
        }

        return NotFound();
    }
    
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(typeof(ErrorsResp), StatusCodes.Status404NotFound)]
    public IActionResult Delete(int id)
    {
        var useCase = new DeletePetByIdUseCase();
        
        useCase.Execute(id);
        
        return NoContent();
    }
}