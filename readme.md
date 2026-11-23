# API de Cifra de César

API REST desenvolvida para cifrar, decifrar e quebrar mensagens por força bruta utilizando a Cifra de César.

## Integrantes do Grupo
- Bruna Serra
- Vinicius Araujo

## Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- npm

## Como executar o projeto

1. Extraia o arquivo `.zip` e acesse a pasta raiz do projeto pelo terminal:
   ```bash
   cd nome-da-pasta-do-projeto
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor:
   ```bash
   npm run dev
   ```
   *(Ou `npm start`, caso utilize o script de inicialização padrão)*

A API estará em execução em `http://localhost:3000`.

## Endpoints Disponíveis

### 1. Cifrar Mensagem
- **Método:** `POST`
- **Rota:** `/cifrar`
- **Body (JSON):**
  ```json
  {
    "textoClaro": "ola mundo",
    "deslocamento": 3
  }
  ```
- **Resposta (`200 OK`):**
  ```json
  {
    "textoCifrado": "rod pxqgr"
  }
  ```

### 2. Decifrar Mensagem
- **Método:** `POST`
- **Rota:** `/decifrar`
- **Body (JSON):**
  ```json
  {
    "textoCifrado": "rod pxqgr",
    "deslocamento": 3
  }
  ```
- **Resposta (`200 OK`):**
  ```json
  {
    "textoClaro": "ola mundo"
  }
  ```

### 3. Quebrar Cifra por Força Bruta (Português)
- **Método:** `POST`
- **Rota:** `/decifrarForcaBruta`
- **Body (JSON):**
  ```json
  {
    "textoCifrado": "rod pxqgr"
  }
  ```
- **Resposta (`200 OK`):**
  ```json
  {
    "textoClaro": "ola mundo"
  }
  ```