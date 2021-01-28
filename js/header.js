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

    global(2);

})();

/**
 * 国际化切换
 * @param t
 */
function global(t) {
    const elem = $('.dropdown-item');
    for (let i = 0; i < t; i++) {
        elem[i].onclick = function () {
            for (let j = 0; j < t; j++) {
                if (j !== i) {
                    $(elem[j]).removeClass("drop-active");
                }
            }
            $(elem[i]).addClass("drop-active");
            $(".bi-globe2")[0].innerHTML=$(elem[i])[0].innerHTML
        }
    }
}