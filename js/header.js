(function () {
    //导航高亮切换
    window.onload=function (){
        const url = window.location.href;
        const navs=$('.nav-item');
        for(let i=0;i<navs.length;i++){
            if(url.indexOf($(navs[i]).text().trim().toLocaleLowerCase())!==-1){
                $(navs[i]).addClass('active');
            }
        }
    }
})();