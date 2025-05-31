using Petfolio.Communication.Response;

namespace Petfolio.Application.UseCases.Pet.GetById;

public class GetPetByIdUseCase
{
    public PetById Execute(int id)
    {
        return new PetById
        {
            Id = id,
            Name = "Buddy",
            Birthday = new DateTime(year: 2025, month: 01, day: 01),
            Type = "Dog"
        };
    }
}