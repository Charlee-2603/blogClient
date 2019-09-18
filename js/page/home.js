// logo图片地址
let logoImgUrl;

// 顶部导航栏列表
let navBarList;

// 顶部导航栏ID
let navBarId;

//顶部导航栏按钮
let navBarListBtn;

// 分类导航栏列表
var sortNavBarList;

// 选中的导航栏列表下标
let selectedNavIndex = 0;

// 分类栏目id
let sortNavId = 10;

// 选中的导航栏按钮下标
let selectedNavBtnIndex = 0;

// 广告
let adInfo;

// 文章列表
let articleList;

// 文章页码
let pageIndex = 1;

// 文章显示条数
let pageSize = 10;

// 选中的导航栏下标
let selectedSortNavIndex = 0;

// 个人中心导航栏下标
let mineNavIndex = 0;

// 个人中心 》 我的博客页码
let myBlogPageIndex = 1;

// 个人中心 》 我的博客页数大小
let myBlogPageSize = 10;

$(function () {
    // 获取前端默认展示数据
    setHtml();

    // 设置头部内容
    setHead();

    // 用户是否登录
    userIsLogin();

    // 设置中间内容
    setBody();

    mySroll();

});

function mySroll() {
    var height = 50;

    $(window).scroll(function () {
        console.log(1);
        let scrollTop = $(window).scrollTop();
        // console.log("距离顶部:", scrollTop);
        let scrollHeight = $(document).height();
        // console.log("滚动条高度:", scrollHeight);
        let windowHeight = $(this).height();
        // console.log("窗口高度:", windowHeight);
        let positionValue = (scrollTop + windowHeight) - scrollHeight;
        // console.log("当前位置:", positionValue);

        if (positionValue == 0) {
            // 下拉刷新
            pageIndex++;
            myBlogPageIndex++;
            setHtml();
            setArticle();
            getBlogByUserId();
        }

        if (scrollTop > height) {
            $(".bg-sort-model").css({
                'position': 'fixed',
                'top': '0px',
            });
        } else {
            $(".bg-sort-model").css({
                'position': 'absolute',
                'top': '10px',
            });
        }
    });
}

/**
 * 判断用户是否登录
 */
function userIsLogin() {
    let uid = window.localStorage.getItem("uid");
    let tokenId = window.localStorage.getItem("tokenId");
    let url = uType;
    let data = {
        uid: uid,
        tokenId: tokenId
    };
    http(url, "post", true, data, "json", function (res) {
        console.log("用户登录状态：", JSON.stringify(res));
        if (res.type == "success") {
            console.log("用户处于登录状态");

            $("#avatar-btn").bind("click", function () {
                //首页内容模块隐藏

                $("#body-model").hide();
                $("#mime-model").show();
                // ajax请求
                http(myCenterNav, "post", true, "", "json", function (res) {
                    console.log(res);
                    let personalNavList = res.data;
                    if (res.type == "success") {
                        getUserInfo();
                        $("#myCenterNav").empty();
                        $.each(personalNavList, function (i, val) {
                            let $li = $("<li id='my-li'></li>");
                            $("#myCenterNav").append($li);
                            $li.attr("id", "my-li" + i);
                            if (i == mineNavIndex) {
                                $li.attr("class", "my-active");
                            }
                            $li.text(personalNavList[i].frontName);
                            $li.on('click', function () {
                                $("#my-li" + mineNavIndex).attr("class", "");
                                $li.attr("class", "my-active");
                                mineNavIndex = i;
                                switch (i) {
                                    case 0:
                                        getUserInfo();
                                        $("#myData").show();
                                        $("#myBlog").hide();
                                        $("#myShare").hide();
                                        break;
                                    case 1:
                                        getBlogByUserId();
                                        $("#myData").hide();
                                        $("#myBlog").show();
                                        $("#myShare").hide();
                                        break;
                                    case 2:
                                        $("#myData").hide();
                                        $("#myBlog").hide();
                                        $("#myShare").show();
                                        break;
                                }
                            });

                        });
                    }
                }, function () {
                    alert("error");
                })
            });

            let avatar = window.localStorage.getItem("avatar");
            console.log("头像地址 = " + avatar);
            if (avatar != null || avatar != undefined) {
                $("#avatar-img").attr("src", avatar);
            } else {
                alert("头像获取失败");
            }
        } else {
            console.log("未登录");
            $("#avatar-btn").attr("href", "./login.html");
        }
    }, function (res) {
        alert("error");
    })
}


/**
 * 设置头部内容
 */
function setHead() {
    // 设置logo
    setLogo();

    // 设置顶部导航栏列表
    setNavBar();

    // 设置顶部导航栏按钮
    setNavBarBtn();
}

/**
 * 设置中间内容
 */
function setBody() {
    //设置分类导航栏列表
    setSortNav();

    // 设置广告栏
    setAd();

    //设置文章
    setArticle();
}


/**
 * 前端默认展示页面
 */
function setHtml() {
    $.ajax({
        type: 'POST',
        url: frontUrl,
        async: false,
        data: {
            pageIndex: pageIndex,
            pageSize: pageSize,
            frontId: navBarId,
            sortNavId: sortNavId
        },
        success: function (e) {
            let res = JSON.parse(e);
            console.log(res);
            // 设置logo
            logoImgUrl = res.data.logoImgUrl[0].frontValue;

            // 设置顶部导航栏
            navBarList = res.data.navBarList;

            // 设置顶部导航栏按钮
            navBarListBtn = res.data.navBarListBtn;

            // 设置分类导航栏
            sortNavBarList = res.data.sortNavBarList;
            // console.log("分类导航栏：", sortNavBarList);

            // 设置广告地址
            adInfo = res.data.adInfo;

            // 文章列表
            articleList = res.data.articleList;
            // console.log("文章列表", articleList);
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
    for (let i = 0; i < navBarList.length; i++) {
        let $li = $("<li id='id-nav-li'></li>");
        $("#bg-nav-ul").append($li);
        $li.attr("id", "id-nav-li" + i);

        // 判断是否已登录，登陆了隐藏登录注册按钮
        let user = window.localStorage.getItem("user");
        if (user == null) {
            // 未登录  显示登录注册按钮
            if (i == selectedNavIndex) {
                $li.attr("class", "active");
            }

            $li.text(navBarList[i].frontName);
            $li.attr("value", navBarList[i].frontId);

            $li.on('click', function () {
                $("#mime-model").hide();
                $("#body-model").show();

                $("#id-nav-li" + selectedNavIndex).attr("class", "");
                $("#id-nav-li" + i).attr("class", "active");
                navBarId = $li.val();
                console.log("navBarId", navBarId);
                selectedNavIndex = i;
            })
        } else {
            // 登录 隐藏登录注册按钮  显示头像按钮

        }
    }
}


/**
 * 设置顶部导航栏按钮
 */
function setNavBarBtn() {
    for (let i = 0; i < navBarListBtn.length; i++) {
        let $li = $("<li id='id-nav-btn'></li>");
        $("#bg-nav-btn").append($li);
        $li.attr("id", "id-nav-btn" + i);

        $li.text(navBarListBtn[i].frontName);
        $li.attr("value", i);

        $li.on('click', function () {
            window.location = navBarListBtn[i].frontValue;
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
        // 导航栏Id
        let Id = sortNavBarList[i].frontId;

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
        $li.attr("value", Id);

        $li.on('click', function () {
            $("#id-sortNav-li" + selectedSortNavIndex).attr("class", "");
            $("#id-sortNav-li" + i).attr("class", "sortActive");
            sortNavId = Id;
            selectedSortNavIndex = i;
            console.log("sortNavId", sortNavId);
            $("#bg-content-model-article").empty();
            pageIndex = 1;
            setHtml();
            setArticle();
        })
    });

}

/**
 * 顶部导航栏跳转
 */
function clickLogo() {
    window.location = "../page/home.html";
}


/**
 * 设置广告图片地址
 */

function setAd() {
    let imgSrc = adInfo[0].frontValue;
    $("#ad-img").attr("src", imgSrc);
}

/**
 * 设置广告图片跳转
 */
function adToUrl() {
    let url = adInfo[1].frontValue;
    window.location = url;
}

/**
 * 设置文章内容
 */
function setArticle() {
    console.log("articleList", articleList);
    $.each(articleList, function (i, val) {
        let $div = $("<div class='bg-content-model-article'>" +
            "<div class='model-article'>" +
            "<input type='hidden' id='article-artId'>" +
            "<a class='article-title' id='article-title'><!--文章标题--></a>" +
            "<p class='article-introduction' id='article-desc'></p>" +
            "<div class='article-message'>" +
            "<div style='display:flex'>" +
            "<div class='article-title-img-model'>" +
            "<img src='../images/logo/logo.jpg' class='article-title-img'>" +
            "<span class='article-title-user'>中国卫视</span>" +
            "</div>" +
            "<div class='interval'></div>" +
            "<div class='article-time' id='article-time'></div>" +
            "</div>" +
            "<div style='display:flex'>" +
            "<div>" +
            "<a href='' class='article-readCount'>" +
            "阅读数：<span style='color:lightskyblue' id='article-readCount'></span>" +
            "</a>" +
            "</div>" +
            "<div class='interval'></div>" +
            "<div class='article-comment'>" +
            "评论：<a style='color:lightskyblue' id='article-comment'></a>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>");

        // 添加元素
        $("#bg-content-model-article").append($div);

        $("#article-artId").attr("id", "article-artId" + articleList[i].articleId);
        $("#article-title").attr("id", "article-title" + articleList[i].articleId);
        $("#article-desc").attr("id", "article-desc" + articleList[i].articleId);
        $("#article-time").attr("id", "article-time" + articleList[i].articleId);
        $("#article-readCount").attr("id", "article-readCount" + articleList[i].articleId);
        $("#article-comment").attr("id", "article-comment" + articleList[i].articleId);

        // 设置文章隐藏ID
        $("#article-artId" + articleList[i].articleId).attr("value", articleList[i].articleId);

        // 设置文章标题
        $("#article-title" + articleList[i].articleId).text(articleList[i].articleTitle);

        //设置文章标题跳转路径
        $("#article-title" + articleList[i].articleId).attr("href", "");

        // 设置文章简介
        let articleDesc = subString(articleList[i].articleDesc, "desc");
        $("#article-desc" + articleList[i].articleId).text(articleDesc);

        // 设置文章创建时间
        let articleCreateTime = subString(articleList[i].articleCreateTime, "time");
        $("#article-time" + articleList[i].articleId).text(articleCreateTime);

        // 设置文章阅读数量
        $("#article-readCount" + articleList[i].articleId).text(articleList[i].articleReadNum);

        // 设置文章评论数量
        $("#article-comment" + articleList[i].articleId).text(articleList[i].articleComment);

    });
}

/**
 * 获取用户信息
 */
function getUserInfo() {
    let userId = window.localStorage.getItem("uid");
    let data = {
        userId: userId
    };
    if (userId != null && userId != undefined) {
        http(getUserInfoURL, "post", true, data, "json", function (res) {
            console.log(res);
            $("#userAvatar").attr("src", res.data.userAvatar);
            $("#userNickname").text(res.data.userNickname);
            $("#userActualName").text(res.data.userActualName);
            $("#userSex").text(res.data.userSex);
            $("#userCity").text(res.data.userCity);
            $("#userBirthday").text(res.data.userBirthday);
            $("#userIndustry").text(res.data.userIndustry);
            $("#userPosition").text(res.data.userPosition);
            $("#userSignature").text(res.data.userSignature);
        }, function () {
            alert("error");
        })
    } else {
        window.location = "./login.html";
    }
}

/**
 * 时间截取值分钟
 * @param time
 * @returns {string}
 */
function subString(str, key) {
    if (key == "desc") {
        return str.substring(0, 49) + "...";
    } else if (key == "time") {
        return str.substring(0, 16);
    } else {
        return str.substring(0, 30) + "...";
    }
}


function getBlogByUserId() {
    let userId = window.localStorage.getItem("uid");
    let data = {
        userId: userId,
        pageDo: {
            pageIndex: myBlogPageIndex,
            pageSize: myBlogPageSize
        }
    };
    if (userId != null && userId != undefined) {
        http(getArticleByUserIdURL, "post", true, data, "json", function (res) {
            console.log(res);
            let articleList = res.data;
            $.each(articleList, function (i, val) {
                $md = $("<div style=\"border-bottom: 1px solid #CCCCCC;margin: 10px 20px;padding: 10px 0\">" +
                    "<div>\n" +
                    "<input type='hidden' id='articleId'/>" +
                    "<span style=\"font-size: 20px\"><a id='articleTitle'></a></span>\n" +
                    "</div>\n" +
                    "<div style=\"display: flex;justify-content: space-between;margin-top: 10px\">\n" +
                    "<div>\n" +
                    "<span id='articleCreateTime'>2019.9.6 12:14:02</span>\n" +
                    "<span id='articleComment' style=\"padding: 0 10px\"></span>\n" +
                    "<span id='articleReadNum' style=\"padding: 0 10px\"></span>\n" +
                    "</div>\n" +
                    "<div>\n" +
                    "<a href=\"\" style=\"padding: 0 10px;border-right: 1px solid #CCCCCC\">查看</a>\n" +
                    "<a href=\"\" style=\"padding: 0 5px;\">删除</a>\n" +
                    "</div>\n" +
                    "</div>" +
                    "</div>");

                $("#myBlog").append($md);

                let dataId = articleList[i].articleId;
                let dataTitle = articleList[i].articleTitle;
                let dataCreateTime = articleList[i].articleCreateTime;
                let dataComment = articleList[i].articleComment;
                let dataReadNum = articleList[i].articleReadNum;

                $("#articleId").attr("id", "articleId" + dataId);
                $("#articleTitle").attr("id", "articleTitle" + dataId);
                $("#articleCreateTime").attr("id", "articleCreateTime" + dataId);
                $("#articleComment").attr("id", "articleComment" + dataId);
                $("#articleReadNum").attr("id", "articleReadNum" + dataId);

                $("#articleId" + dataId).attr("value", articleList[i].articleId);
                $("#articleTitle" + dataId).text(dataTitle);
                $("#articleCreateTime" + dataId).text(dataCreateTime);
                $("#articleComment" + dataId).text("评论：" + dataComment);
                $("#articleReadNum" + dataId).text("阅读次数：" + dataReadNum);
            })
        }, function () {
            alert("error");
        })
    } else {
        window.location = "./home.html";
    }
}