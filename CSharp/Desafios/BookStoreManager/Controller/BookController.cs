using BookStoreManager.Model;
using Microsoft.AspNetCore.Mvc;

namespace BookStoreManager.Controller;

[ApiController]
[Route("api/[controller]")]
public class BookController : ControllerBase
{
    static List<Book> books = new();
    
    [HttpGet]
    public IActionResult GetAllBooks()
    {
        return Ok(books);
    }
    
    [HttpPost]
    public IActionResult AddBook([FromBody] Book book)
    {
        if (book == null) return BadRequest("Book cannot be null.");
        
        if (string.IsNullOrWhiteSpace(book.Titulo) || string.IsNullOrWhiteSpace(book.Autor) ||
            string.IsNullOrWhiteSpace(book.Genero) || book.Preco <= 0 || book.Quantidade < 0)
        {
            return BadRequest("Invalid book data.");
        }
        
        book.Id = books.Count > 0 ? books.Max(b => b.Id) + 1 : 1;
        
        books.Add(book);

        return Created();
    }
    
    [HttpPut("{id}")]
    public IActionResult UpdateBook(int id, [FromBody] Book book)
    {
        if (book == null) return BadRequest("Book cannot be null.");
        
        var existingBook = books.FirstOrDefault(b => b.Id == id);
        if (existingBook == null) return NotFound("Book not found.");
        
        if (string.IsNullOrWhiteSpace(book.Titulo) || string.IsNullOrWhiteSpace(book.Autor) ||
            string.IsNullOrWhiteSpace(book.Genero) || book.Preco <= 0 || book.Quantidade < 0)
        {
            return BadRequest("Invalid book data.");
        }
        
        existingBook.Titulo = book.Titulo;
        existingBook.Autor = book.Autor;
        existingBook.Genero = book.Genero;
        existingBook.Preco = book.Preco;
        existingBook.Quantidade = book.Quantidade;

        return NoContent();
    }
    
    [HttpDelete("{id}")]
    public IActionResult DeleteBook(int id)
    {
        var book = books.FirstOrDefault(b => b.Id == id);
        if (book == null) return NotFound("Book not found.");
        
        books.Remove(book);
        
        return NoContent();
    }
}