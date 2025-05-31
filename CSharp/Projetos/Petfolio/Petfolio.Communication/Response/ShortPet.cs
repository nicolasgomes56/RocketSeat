using Petfolio.Communication.Enums;

namespace Petfolio.Communication.Response;

public class ShortPet
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public PetType Type { get; set; }
}