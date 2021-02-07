import {getCookie} from "./utils.js";

(function () {
    if (window.location.pathname.indexOf('/blog/posts/') !== -1) {
        let lang = getCookie('lang');
        if (lang === 'English') {
            lang = 'en'
        } else {
            lang = 'zh-CN'
        }
        var gitalk = new Gitalk({
            clientID: '8b2591ffac78b3682040',
            clientSecret: 'b915ec650b2390e175176f9b5d9da53b7c10aa9d',
            repo: 'blog',
            owner: 'Juneju',
            admin: ['Juneju'],
            id: location.pathname,      // Ensure uniqueness and length less than 50
            distractionFreeMode: false, // Facebook-like distraction free mode
            language: lang
        })
        gitalk.render('gitalk-container')
    }
})
();
