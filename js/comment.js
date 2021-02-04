import {getCookie} from "./utils.js";
(function () {
    let lang = getCookie('lang');
    if (lang === 'English') {
        lang = 'en'
    } else {
        lang = 'zh-CN'
    }
    var gitalk = new Gitalk({
        clientID: '8b2591ffac78b3682040',
        clientSecret: 'ba6feab5bbc2ba82a16833966f8142f17b8dfba7',
        repo: 'blog',
        owner: 'Juneju',
        admin: ['Juneju'],
        id: location.pathname,      // Ensure uniqueness and length less than 50
        distractionFreeMode: false, // Facebook-like distraction free mode
        language: lang
    })
    gitalk.render('gitalk-container')
})
();