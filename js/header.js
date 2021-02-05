import {getCookie} from "./utils.js";
(function () {
    //导航高亮切换
    window.onload = function () {
        const url = window.location.href;
        const navs = $('.nav-item');
        for (let i = 0; i < navs.length; i++) {
            if (url.indexOf($(navs[i]).text().trim().toLocaleLowerCase()) !== -1) {
                $(navs[i]).addClass('active');
            }
        }
        //archive列表筛选功能
        if (window.location.pathname === '/blog/archive/') {
            archiveFilter();
        }
    }

    global(2);

    lang();

})();

/**
 * archive过滤(根据语言和类别)
 */
function archiveFilter(){
    const search = window.location.search.replace("?category=", '');
    const items = $('.liDiv');
    for (let i = 0; i < items.length; i++) {
        $(items[i].parentElement).hide();
        let cate = items[i].getAttribute("data-cate");
        let en=items[i].getAttribute("lang-en");
        let cn=items[i].getAttribute("lang-cn");
        if(en.length===0&&cn.length===0 || en&&getCookie("lang")==='English' || cn&&getCookie("lang")==='中文') {
            if (cate.indexOf(search) !== -1) {
                //不符合搜索
                $(items[i].parentElement).show();
            }
        }
    }
    if(search.length>0){
        let list=$('.right .list-group .list-group-item a');
        for(let i=0;i<list.length;i++){
            if(list[i].innerHTML===search){
                $(list[i].parentElement).addClass('category-back');
            }else{
                $(list[i].parentElement).removeClass('category-back');
            }
        }
    }
}

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
            let lang = $(elem[i])[0].innerHTML
            $(".bi-globe2")[0].innerHTML = lang;
            document.cookie = "lang=" + lang + "; path=/ ";
            changePage(lang);
        }
    }
}

/**
 * 语言 cookie-lang设置
 */
function lang() {
    let l = getCookie("lang");
    if (l === "") {
        l="中文";
        document.cookie = "lang=" + l + "; path=/ ";
    }
    changePageLang(l)
}

//导航条修改-lang
function changePageLang(lang) {
    $(".bi-globe2")[0].innerHTML = lang;
    const elem = $('.dropdown-item');
    if (lang === "中文") {
        $(elem[0]).addClass("drop-active");
        $(elem[1]).removeClass("drop-active");
    } else {
        $(elem[1]).addClass("drop-active");
        $(elem[0]).removeClass("drop-active");
    }
    changePage(lang);
}

//页面语言切换
function changePage(lang) {
    let url = window.location.pathname;
    if (lang === "中文") {
        $('.en').hide();
        $('.cn').show();
    } else {
        $('.cn').hide();
        $('.en').show();
    }
    if(url==='/blog/archive/'){
        archiveFilter();
    }
}

