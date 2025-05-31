using Petfolio.Communication.Requests;

namespace Petfolio.Application.UseCases.Pet.Update;

public class UpdatePetUseCase
{
    public void Execute(int id, PetReq request)
    {
        if (id <= 0)
        {
            throw new ArgumentException("Invalid pet ID.");
        }
    }
}