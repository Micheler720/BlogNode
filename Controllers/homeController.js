const mongoose = require('mongoose');
const Post = mongoose.model('Post');
exports.userMiddleware = (req, res, next)=>{
    let info = {name: 'Micdkldjlkjsakljsdhele', id: "1"};
    req.userInfo = info;
    next();
};
exports.index = async (req, res)=>{
   
    let responseJson = {  
        nome: 'Michele',
        sobrenome: 'Freitas',
        Idade: '26',
        mostrar: true,
        pageTitle: 'Teste',
        ingredientes:[
            {nome: 'Arroz', qt: '20g' },
            {nome: 'Feijão', qt: '20g'},
            {nome: 'Macarrão', qt: '20g'}
        ],
        userInfo: req.userInfo,
        posts: [],
        tags:[],
        tag: ''     
    };
    responseJson.tag = req.query.t;    
    const postFilter = (typeof responseJson.tag != 'undefined') ? {tags: responseJson.tag} : {};    
    const tagsPromise = Post.getTagsList();
    const postsPromise = Post.find(postFilter).populate('autor');
    const [tags , posts] = await Promise.all([tagsPromise, postsPromise]);
    for(let i in tags){
        if(tags[i]._id == responseJson.tag ){
            tags[i].class = "selected";
        }
    }
    responseJson.tags = tags;
    responseJson.posts = posts;
    res.render('home', responseJson);   
}

function newFunction() {
    return "selected";
}
