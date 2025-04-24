## Metodos HTTP
- GET => Buscar uma informação do back-end
- POST => Buscar um recurso no back-end
- PUT => Atualizar um recurso no bakc-end
- PATCH => Aualizar uma informação especifica de um recurso no back-end
- DELETE => Deleta um recurso do back-end

## Cabeçalhos
- Requisição / Resposta => Metadados

## HTTP Status Code
- 100 / 199 => Informational responses
- 200 / 299 => Successful responses
- 300 / 399 => Redirection responses
- 400 / 499 => Client error responses
- 500 / 599 => Server error responses

### Tipos de Requisição
- Query Parameters: URL Stateful => Filtros, Paginação
  - São utilizados para dados menos sensiveis que modificam a resposta mas que não são obrigatórios.

  - Ex: `http://localhost:3333/users?userId=1`

- Route Parameters: Identificação de recursos
  - O valor "1" se torna o recurso nessa caso `Id: 1` da lista de usuarios
  - Ex: `http://localhost:3333/users/1`

- Request Body: Envio de informações de dados / formulario
  - Ele não fica na URL da requisição
  - Ex: POST: `http://localhost:3333/users`