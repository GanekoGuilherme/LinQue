<h3 align="center">
    LinQue
</h3>

<p align="center">LinQue Back-End</p>


<p align="center">
  <a href="#%EF%B8%8F-sobre-o-projeto">Sobre o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-inicializando">Inicializando</a>&nbsp;&nbsp;&nbsp;
</p>


## 💇🏻‍♂️ Sobre o projeto

Este projeto tem o objetivo de criar uma aplicação Back-End para Front (BFF).

O LinQue é plataforma online onde o usuário pode:
- Visualizar seu ranqueamento atual (solo, flex e TFT), quantidades de vítorias e nível.
- Encontrar suas ultimas partidas.
- Publicar (e assistir) vídeos.
- Compartilhar seu perfil.

## 💻 Inicializando

### Requisitos

- [Node.js](https://nodejs.org/en/) >= 16.14.2
- [MongoDB](https://www.mongodb.com/pt-br) = 5.0.8
- [Mailjet](https://www.mailjet.com/) >= 3.3.13
- [AWS S3](https://aws.amazon.com/pt/) >= 2.1148.0 
- [API RIOT](https://developer.riotgames.com/)

**Clone o projeto e acesse a pasta**

```bash
$ git clone https://github.com/GanekoGuilherme/LinQue.git
```

**Siga os próximos passos**

```bash
# Instalando as dependências
$ npm install

# Crie uma cópia do ".env.example" para ".env"
# e insira SUAS variáveis de ambiente
$ cp .env.example .env

# Executando no ambiente local
$ npm run dev

# Para compilar a aplicação
$ npm run build
```

---

Criado por Guilherme Massaru Ganeko 👋 [See my linkedin](https://www.linkedin.com/in/guilhermeganeko/)
