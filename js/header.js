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
        //archive列表筛选功能
        if(window.location.pathname==='/blog/archive/'){
            const search=window.location.search.replace("?category=",'');
            const items=$('.liDiv');
            for(let i=0;i<items.length;i++){
                let cate=items[i].getAttribute("data-cate");
                if(cate.indexOf(search)!==-1){
                    //不符合搜索
                    $(items[i].parentElement).show();
                }
            }
        }
    }
})();