# Full Cycle Nginx Node

Este projeto faz parte de um desafio que consiste na criação de uma aplicação Node.js utilizando o Nginx como proxy reverso.

## Sobre o desafio e o que foi feito

O critério de aceite do desafio é que ao acessar o Nginx seja feita uma requisição para a aplicação Node.js. Esta aplicação por sua vez vai:
* Inserir um registro em uma base de dados MySQL.
* Retornar como resposta um arquivo HTML contendo todos os registros inseridos na base de dados.

## Construindo e executando

Para construir a imagem Docker e executar o projeto:

```bash
docker compose up --build -d
```
