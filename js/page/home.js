// logo图片地址
let logoImgUrl;

// 顶部导航栏列表
let navBarList;

// 分类导航栏列表
let sortNavBarList;

// 选中的导航栏下标
let selectedNavIndex = 0;

// 选中的导航栏下标
let selectedSortNavIndex = 0;


$(function () {
    // 设置导航栏信息
    setHead();
});

/**
 * 设置导航栏信息
 */
function setHead() {
    // 前端默认展示页面
    setHtml();

    // 设置logo
    setLogo();

    // 设置列表
    setNavBar();

    // 设置分类导航栏
    setSortNav();
}

/**
 * 前端默认展示页面
 */
function setHtml() {
    $.ajax({
        url: frontUrl,
        type: 'post',
        async: false,
        success: function (e) {
            let data = JSON.parse(e);
            // 设置logo
            logoImgUrl = data.logoImgUrl[0].frontValue;
            // 设置顶部导航栏
            navBarList = data.navBarList;
            // 设置分类导航栏
            sortNavBarList = data.sortNavBarList;
        }
    })
}


/**
 * 设置logo
 */
function setLogo() {
    if (logoImgUrl != null) {
        $("#bg-nav-logo").attr("src", logoImgUrl);
    }
}

/**
 * 设置顶部导航栏列表
 */
function setNavBar() {
    console.log("2222");
    for (let i = 0; i < navBarList.length; i++) {
        let $li = $("<li id='id-nav-li'></li>");
        $("#bg-nav-ul").append($li);
        $li.attr("id", "id-nav-li" + i);

        if (i == selectedNavIndex) {
            $li.attr("class", "active");
        }

        $li.text(navBarList[i].frontName);
        $li.attr("value", i);

        $li.on('click', function () {
            console.log("点击位置：" + i);
            console.log("隐藏位置：" + selectedNavIndex);
            $("#id-nav-li" + selectedNavIndex).attr("class", "");
            $("#id-nav-li" + i).attr("class", "active");
            selectedNavIndex = i;
            $("#iframeBody").attr("src", navBarList[i].frontValue);
        })
    }

}

/**
 * 设置分类导航栏
 */
function setSortNav() {
    console.log(sortNavBarList);
    $.each(sortNavBarList, function (i, val) {
        // 导航栏名称
        let name = sortNavBarList[i].frontName;
        // 导航栏链接
        let value = sortNavBarList[i].frontValue;

        let $li = $("<li id='id-sortNav-li'></li>");
        $("#id-sortNav-model").append($li);
        $li.attr("id", "id-sortNav-li" + i);

        // 默认选中第一个
        if (i == selectedSortNavIndex) {
            $li.attr("class", "sortActive");
        }

        // 设置名称
        $li.text(name);
        // 给每个li赋值编号
        $li.attr("value", i);

        $li.on('click', function () {
            $("#id-sortNav-li" + selectedSortNavIndex).attr("class", "");
            $("#id-sortNav-li" + i).attr("class", "sortActive");
            selectedSortNavIndex = i;
            $("#iframeBody").attr("src", value);
        })
    });
}

/**
 * 顶部导航栏跳转
 */
function clickLogo() {
    window.location = "../page/home.html";
}
