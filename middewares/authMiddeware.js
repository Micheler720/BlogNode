module.exports.isLogged = (req, res, next)=>{
    if(!req.isAuthenticated()){
        req.flash('error' , 'Ops! Você não tem acesso a essa pagina!');
        res.redirect('/users/login');
        return;

    }
    next();
}
exports.changePassword = (req, res)=>{
    if(req.body.password != req.body['password-confirm']){
        req.flash('error', 'Senhas não batem');
        res.redirect('/profile');
        return;
    }

    req.user.setPassword(req.body.password, async ()=>{
        await req.user.save();
        req.flash('sucess' , 'Senha alterado com sucesso!');
        res.redirect('/');
    });
};