/**
 * @description 发布文章
 * @author CharLee
 */
let frontId;
let editor;

$(function () {
    // wangEditor编辑器初始化
    let E = window.wangEditor;
    editor = new E('#editor');
    editor.create();

    //获取文章标签
    getArticleLabel();
});

/**
 * 获取文章标签
 */
function getArticleLabel() {
    http(getArticleLabelURL, "post", true, "", "json", function (res) {
        if (res.type == "success") {
            let sortNavBarList = res.data;
            console.log(sortNavBarList);
            for (let i = 0; i < sortNavBarList.length; i++) {
                let $li = $("<li><a href='#' id='id-nav-li'></a></li>");
                $("#articleType").append($li);
                $li.attr("id", "id-nav-li" + i);
                $li.attr("class", "li-model");
                $li.text(sortNavBarList[i].frontName);

                $li.on('click', function () {
                    $("#title").text(sortNavBarList[i].frontName);
                    frontId = sortNavBarList[i].frontId;
                    console.log("点击栏目Id = ", frontId)
                })
            }
        }
    }, function (res) {

    });
}

/**
 * 发布文章
 */
function postArticle() {
    // 文章标题
    let articleTitle = $("#articleTitle").val();
    // 文章简介
    let articleDesc = $("#articleDesc").val();
    // 文章内容
    let articleContent = editor.txt.html();
    // 用户id
    let uid = window.localStorage.getItem("uid");

    let data = {
        articleTitle: articleTitle,
        articleDesc: articleDesc,
        articleContent: articleContent,
        frontId: frontId,
        userId: uid
    };

    if (uid != null) {
        if (frontId > 0) {
            if (articleTitle.length > 0) {
                if (articleDesc.length > 0) {
                    console.log(removeTAG(articleContent).length);
                    if (removeTAG(articleContent).length > 0) {
                        http(postArticleURL, "post", true, data, "json", function (res) {
                            if (res.type == "success") {
                                alert("发布文章成功");
                                window.location = "./home.html"
                            } else {
                                alert("发布文章失败");
                            }
                        }, function (res) {
                            alert(2);
                        });
                        return;
                    }
                    alert("请输入文章的内容");
                    return;
                }
                alert("请输入文章介绍");
                return;
            }
            alert("请输入文章标题");
            return;
        }
        alert("请输入文章标签类型");
        return;
    }
    window.location = "./login.html";
    return;
}

function removeTAG(str) {
    return str.replace(/<[^>]+>/g, "");
}