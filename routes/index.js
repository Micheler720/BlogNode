const express = require('express');
const homeController = require('../Controllers/homeController');
const userController = require('../Controllers/userController');
const postController = require('../Controllers/postController');
const imageMiddeware = require('../middewares/imageMiddeware');
const authMiddeware = require('../middewares/authMiddeware');
//Rotas
const router = express.Router();
router.get('/', homeController.userMiddleware , homeController.index);
router.get('/users/login', userController.login);
router.post('/users/login', userController.loginAction);
router.get('/users/register', userController.register);
router.post('/users/register', userController.registerAction);
router.get('/users/forget', userController.forget);
router.post('/users/forget', userController.forgetAction);
router.get('/user/reset/:token', userController.forgetToken);
router.post('/user/reset/:token', userController.forgetTokenAction);
router.get('/profile', authMiddeware.isLogged ,userController.profile);
router.post('/profile', authMiddeware.isLogged ,userController.profileAction);
router.post('/profile/password', authMiddeware.isLogged , authMiddeware.changePassword);
router.get('/users/logout', userController.logout);
router.get('/post/add', authMiddeware.isLogged ,postController.add);
router.post('/post/add',  authMiddeware.isLogged ,
            imageMiddeware.upload,
            imageMiddeware.resize, postController.addAction);
router.get('/post/:slug/edit',  authMiddeware.isLogged , postController.edit);
router.post('/post/:slug/edit',  authMiddeware.isLogged ,            
imageMiddeware.upload,
imageMiddeware.resize, postController.editAction );
router.get('/post/:slug/', postController.view) ;

module.exports = router;
