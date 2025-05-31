using Taskmanager.Communication.Enums;

namespace Taskmanager.Communication.Model;

public class TaskItem
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string Descricao { get; set; } = string.Empty;
    public Prioridade Prioridade { get; set; }
    public DateTime DataLimite { get; set; }
    public Status Status { get; set; }
}