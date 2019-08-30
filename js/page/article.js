
// 广告
let adInfo;



// 文章列表
// let articleList;

$(function () {
    // 设置主体
    setBody();
});


/**
 * 设置主体
 */
function setBody() {
    // 前端默认展示页面
    setHtml();

    // 设置广告栏
    setAd();

}

function setHtml() {
    $.ajax({
        url: frontUrl,
        type: 'post',
        async: false,
        success: function (e) {
            let data = JSON.parse(e);
            console.log(data);


            // 设置广告地址
            adInfo = data.adInfo;


            // 设置文章列表
            // articleList = data.adImgHref[0].frontValue;
        }
    })
}




/**
 * 设置广告栏
 */

function setAd() {
    let imgSrc = adInfo[0].frontValue;
    $("#ad-img").attr("src", imgSrc);
}

function adToUrl() {
    let url = adInfo[1].frontValue;
    window.location = url;
}

