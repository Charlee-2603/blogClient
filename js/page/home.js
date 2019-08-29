// 缓存
let localStorage = window.localStorage;

$(function () {
    // 前端默认展示页面
    setHtml();
});

/**
 * 前端默认展示页面
 */
function setHtml() {
    $.ajax({
        url: frontUrl,
        type: 'post',
        success: function (e) {
            let data = JSON.parse(e);
            console.log(data);

            // 设置logo
            logoImgUrl = data.logoImgUrl[0].frontValue;

            // 设置顶部导航栏
            navBarList = JSON.stringify(data.navBarList);

            // 设置分类导航栏
            sortNavBarList = JSON.stringify(data.sortNavBarList);

            // 设置广告地址
            adImgUrl = data.adImgUrl[0].frontValue;

            // 设置广告链接
            adImgHref = data.adImgHref[0].frontValue;

            // 设置文章列表
            // articleList = data.adImgHref[0].frontValue;

            addLocalStorage("logoImgUrl", logoImgUrl);
            addLocalStorage("navBarList", navBarList);
            addLocalStorage("sortNavBarList", sortNavBarList);
            addLocalStorage("adImgUrl", adImgUrl);
            addLocalStorage("adImgHref", adImgHref);

        }
    })
}

function addLocalStorage(key, value) {
    localStorage.setItem(key, value);
}