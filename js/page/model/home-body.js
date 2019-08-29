// 分类导航栏列表
let sortNavBarList;

// 广告图片地址
let adImgUrl;

// 广告跳转链接
let adImgHref;

// 文章列表
let articleList;

$(function () {
    // 设置主体
    setBody();
});

/**
 * 设置主体
 */
function setBody() {

    // 设置分类导航栏
    setSortNav();
    设置广告栏
    // setAd();
    //

}


/**
 * 设置分类导航栏
 */
function setSortNav() {
    sortNavBarList = JSON.parse(localStorage.getItem("sortNavBarList"));
    console.log(sortNavBarList);
    $.each(sortNavBarList, function (i, val) {
        let name = sortNavBarList[i].frontName;
        let value = sortNavBarList[i].frontValue;

        let $li = $("<li id='id-sortNav-li'></li>");

        $("#id-sortNav-model").append($li);
        $li.attr("id", "id-sortNav-li" + i);
        $li.text(name);
        $li.attr("value", sortNavBarList[i].frontValue);

        $li.on('click', function () {
            window.location = value
        })
    });
}


/**
 * 设置广告栏
 */

function setAd() {

}


/**
 * 鼠标进入
 * @param x
 */
function changeColor(x) {
    x.style.background = 'red';
    x.style.color = 'white';
}

/**
 * 鼠标离开
 * @param x
 */
function changeColorBack(x) {
    x.style.background = 'white';
    x.style.color = 'black';
}