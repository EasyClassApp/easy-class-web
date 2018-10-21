# Easy Class - Cliente Web


Cliente Web para a área administrativa do projeto Easy Class

## Como rodar a aplicação

**Pré-requisitos: Node, NPM e MongoDB.** 

1. Execute o projeto contendo o servidor Express (http://www.tools.ages.pucrs.br/easyclass/backend)
2. Instale as dependências do projeto

````
# npm install
````

3. Execute o script para inicializar o servidor webpack para desenvolvimento

````
# npm run start-dev
````

4. Para executar a compilação do projeto:

````
# npm run build
````

Para executar os testes:

````
# npm test
````

---

## Como rodar a aplicação com Docker

**Pré-requisitos: Docker, (no Windows, habilitar Hyper-V)** 

Cria imagem e executa container para desenvolvimento:

````
  # docker-compose up app
````

A aplicação em modo produção ficará disponível em **localhost:3000**

Cria imagem, gera container para testes e executa os testes:

````
  # docker-compose run test
````

Faz o build do projeto com webpack e gera container Nginx para servir o resultado:

````
  # docker build -t ec-prod-image .
  # docker run --name ec-prod-container -p 8080:80 ec-prod-image
````

A aplicação em modo produção ficará disponível em **localhost:8080**
