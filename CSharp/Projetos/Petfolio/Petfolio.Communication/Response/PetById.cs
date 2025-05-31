namespace Petfolio.Communication.Response;

public class PetById
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public DateTime Birthday { get; set; }
    public string Type { get; set; } = string.Empty;
}