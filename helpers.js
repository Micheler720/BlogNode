exports.pageTitleDefault = 'Blog';
exports.menu = [
    {name: 'Home', slug: '/', image: '/assets/images/casa.png', guest:true , logged:true},
    {name: 'AddPoster', slug: '/post/add', image: '/assets/images/mais.png' , guest:false , logged:true},
    {name: 'Login', slug: '/users/login', image: '/assets/images/login.jpg' , guest:true , logged:false},
    {name: 'Registre-se', slug: '/users/register', image: '/assets/images/registro.png', guest:true , logged:false},
    {name: 'Alterar Usuario', slug: '/profile', image: '/assets/images/registro.png', guest:false , logged:true},
    {name: 'Sair', slug: '/users/logout', image: '/assets/images/registro.png', guest:false , logged:true}
];