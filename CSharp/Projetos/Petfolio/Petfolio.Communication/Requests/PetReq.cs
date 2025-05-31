using Petfolio.Communication.Enums;

namespace Petfolio.Communication.Requests;

public class PetReq
{
    public string Name { get; set; } = string.Empty;
    public DateTime Birthday { get; set; }
    public PetType Type { get; set; }
}