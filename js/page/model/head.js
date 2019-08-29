// logo图片地址
let logoImgUrl;

// 顶部导航栏列表
let navBarList;

//缓存
var localStorage = window.localStorage;



/**
 * 初始化
 */
$(function () {
    // 设置导航栏信息
    setHead();
});

/**
 * 设置导航栏信息
 */
function setHead() {
    // 设置logo
    setLogo();
    // 设置列表
    setNavBar();
}

/**
 * 设置logo
 */
function setLogo() {
    let logoImgUrl = localStorage.getItem("logoImgUrl");
    if (logoImgUrl != null) {
        $("#bg-nav-logo").attr("src", logoImgUrl);
    }
}

/**
 * 设置列表
 */
function setNavBar() {
    navBarList = JSON.parse(localStorage.getItem("navBarList"));
    let length = navBarList.length;

    for (let i = 0; i < length; i++) {
        let value = navBarList[i].frontValue;
        let $li = $("<li id='id-nav-li'></li>");

        $("#bg-nav-ul").append($li);
        $li.attr("id", "id-nav-li" + i);
        $li.text(navBarList[i].frontName);
        $li.attr("value", navBarList[i].frontValue);

        $li.on('click', function () {
            window.location = value;
        })
    }
}

function clickLogo() {
    window.location = "../../page/home.html"
}