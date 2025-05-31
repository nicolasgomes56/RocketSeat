using Petfolio.Communication.Requests;
using Petfolio.Communication.Response;

namespace Petfolio.Application.UseCases.Pet.Register;

public class RegisterPetUseCase
{
    public RegisterPetResp Execute(PetReq request)
    {
        return new RegisterPetResp
        {
            Id = 7,
            Name = request.Name,
        };
    }
}