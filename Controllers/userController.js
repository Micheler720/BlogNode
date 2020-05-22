const mongoose = require('mongoose');
const User =  require('./../Models/Users');
const crypto = require('crypto');
const mailHandler  = require('../handlers/mailHandler');
exports.login = (req , res)=>{    
    res.render('login');
}

exports.loginAction= async (req, res)=>{
    const auth = User.authenticate();
    auth(req.body.email, req.body.password, (error, result)=>{
        if(!result){
            req.flash('error' , 'Seu e-mail e ou senha estão errados.');
            res.redirect('/users/login');
            return;
        }
        req.login(result, ()=>{});
        req.flash('sucess', 'Você foi logado com sucesso!');
        res.redirect('/');
    }  );
}
exports.register = (req, res)=>{
    res.render('register');
}

exports.registerAction = (req, res)=>{
    User.register(new User(req.body), req.body.password, (error)=>{
        if (error){
            console.log('erro ao registrar' , error);
            req.flash('error' , 'Não foi possivel realizar o registro, tente mais tarde!');
            res.redirect('/');
            return;
        }
        req.flash('sucess' , 'Registro realizado com sucesso! Faça login');
        res.redirect('/users/login');


    });
};
exports.logout = (req, res)=>{
    req.logout();
    res.redirect('/');
}
exports.profile = ( req, res) =>{
    res.render('profile');
}
exports.profileAction= async (req, res)=>{
    try{
    const user = await User.findByIdAndUpdate(
        { _id: req.user._id},
        {name: req.body.name , email: req.body.email},
        { new: true, runValidators:true}
    );
    }catch(e){
        req.flash('error' , 'Ocorreu algum erro ' + e.message);
        res.redirect('/profile');
        return;
    }    
    req.flash('sucess' , 'Dados alterados com sucesso!');
        res.redirect('/profile');

};
exports.forget= (req,res)=>{
    res.render('forget');
};
exports.forgetAction = async (req, res)=>{
    //Verifica se o usuario Existe
    const user = await User.findOne({email: req.body.email}).exec();
    if(!user){
        req.flash('error', 'E-mail não cadastrado!');
        res.redirect('/users/forget');
        return;
    }
    //gerar o token
    user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordExpires = Date.now() +3600000; // 1 hora
    await user.save();

    //Gerar link com TOken e alterar senha
    const resetLink = `http://${req.headers.host}/user/reset/${user.resetPasswordToken}`;
    mailHandler.send({
        to: user.email,
        subject: 'Resetar uma senha',
        html: 'testando email com Link' + resetLink,
        text: 'testando email com Link' + resetLink
    });
    req.flash('sucess' , 'Te enviamos o e-mail com link para redefinição de senha' + resetLink);
    res.redirect('/users/login');
};
exports.forgetToken= async (req, res)=>{
    const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() }
    }).exec();
    if(!user){
        req.flash('error', 'Token Expirado');
        res.redirect('/users/forget');
        return;
    }else{
        res.render('forgetPassword');
    }
};
exports.forgetTokenAction = async (req, res)=>{
    const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() }
    }).exec();
    if(!user){
        req.flash('error', 'Token Expirado');
        res.redirect('/users/forget');
        return;
    }
    if(req.body.password != req.body['password-confirm']){
        req.flash('error', 'Senhas não batem');
        res.redirect('/profile');
        return;
    }

    user.setPassword(req.body.password, async ()=>{
        await user.save();
        req.flash('sucess' , 'Senha alterado com sucesso!');
        res.redirect('/');
    });

};