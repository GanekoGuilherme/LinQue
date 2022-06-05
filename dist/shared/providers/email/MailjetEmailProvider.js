"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nodeMailjet = _interopRequireDefault(require("node-mailjet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MailjetEmailProvider {
  async sendEmailToResetPassword({
    email,
    name,
    token
  }) {
    const conection = _nodeMailjet.default.connect(String(process.env.MAILJET_API_KEY), String(process.env.MAILJET_API_SECRET));

    await conection.post('send', {
      version: 'v3.1'
    }).request({
      Messages: [{
        From: {
          Email: 'guilhermeganeko@hotmail.com',
          Name: 'LinQue'
        },
        To: [{
          Email: email,
          Name: name
        }],
        Subject: 'Recuperação de senha',
        HTMLPart: `<h3>Olá ${name}, <br><br>    Clique <a href='https://agroradar.herokuapp.com/cadastro-senha/${token}'>aqui</a> para iniciar a recuperação de sua senha!</h3><h5> Caso o link acima não funcionar, copie a URL (https://agroradar.herokuapp.com/cadastro-senha/${token}) e cole no navegador.</h5>`,
        CustomID: 'AppGettingStartedTest'
      }]
    }).then(() => console.log('enviou'));
  }

  async sendEmailToActiveUser({
    email,
    name,
    token
  }) {
    const conection = _nodeMailjet.default.connect(String(process.env.MAILJET_API_KEY), String(process.env.MAILJET_API_SECRET));

    await conection.post('send', {
      version: 'v3.1'
    }).request({
      Messages: [{
        From: {
          Email: 'guilhermeganeko@hotmail.com',
          Name: 'LinQue'
        },
        To: [{
          Email: email,
          Name: name
        }],
        Subject: 'Verificação de usuário',
        HTMLPart: `Olá ${name}, <br><br>    Utilize o código abaixo para ativar seu usuário:<br>Código para ativação: ${token}`,
        CustomID: 'AppGettingStartedTest'
      }]
    });
  }

}

var _default = MailjetEmailProvider;
exports.default = _default;