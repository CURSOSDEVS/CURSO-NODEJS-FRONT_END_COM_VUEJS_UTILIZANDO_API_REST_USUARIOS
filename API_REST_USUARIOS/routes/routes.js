var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require("../controllers/UserController");
var AdminAuth = require('../middleware/AdminAuth');

//rota para acessar a home da página
//router.get('/', HomeController.index);

//rota para criar um novo usuário
router.post('/user', UserController.create);

//rota para listar todos os usuário em json mas somente poderá acessar os administradores
router.get('/user', AdminAuth, UserController.index);

//rota para buscar um usuário pelo id passado como parâmetro na rota
router.get('/user/:id', UserController.findUser);

//rota para alterar um usuário
router.put('/user' , AdminAuth , UserController.edit);

//rota para deletar um usuário
router.delete("/user/:id" , AdminAuth , UserController.remove);

//rota para recuperação de senha
router.post('/recoverpassword', UserController.recoverPassword);

//rota para alterar a senha do usuário
router.put('/changepassword', UserController.changePassword)

//rota para login
router.post('/login', UserController.login);

//rota para teste de envio de email
router.get('/envioemail', UserController.sendEmail)

//rota para acesso do painel administrativo
router.post('/validate',AdminAuth ,HomeController.validate)

module.exports = router;