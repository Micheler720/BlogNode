window.onload = function (){
    setTimeout(noneFlash, 9000);

}
function noneFlash(){
    var flash = document.getElementsByClassName('flash');
    for(var i = 0 ; i < flash.length ; i ++){
        flash[i].style.display = 'none';
    }

}
function menuNone(){
    var menu = document.getElementById('menu');
    var linkMenu = menu.getElementsByTagName('label');
    var menuNav = menu.getElementsByTagName('ul');
    var screenWidget = window.innerWidth;
    if ( linkMenu[0].style.display == '' || linkMenu[0].style.display == 'none' || menuNav[0].style.display == 'none'){
        menuNav[0].style.display = 'block';
        for(var i = 0 ; i < linkMenu.length ; i++){
            linkMenu[i].style.display = 'flex';
        }
    }else{
        
        menuNav[0].style.display = screenWidget < 884 ? 'none' : 'block';
        for(var i = 0 ; i < linkMenu.length ; i++){
            linkMenu[i].style.display = 'none';
        }

    }

}