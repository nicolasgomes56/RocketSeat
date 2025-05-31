using Petfolio.Communication.Enums;
using Petfolio.Communication.Response;

namespace Petfolio.Application.UseCases.Pet.GetAll;

public class GetAllPetsUseCases
{
    public PetAll Execute()
    {
        return new PetAll
        {
            // Pets = new List<ShortPet>
            // {
            //     new()
            //     {
            //         Id = 1,
            //         Name = "Buddy",
            //         Type = PetType.Dog
            //     }
            // }
        };
    }
}