/**
 * @description 发布文章
 * @author CharLee
 */

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
                let $li = $("<li><a id='id-nav-li'></a></li>");
                $("#articleType").append($li);
                $li.attr("id", "id-nav-li" + i);
                $li.text(sortNavBarList[i].frontName);
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
        userId: uid
    };

    http(postArticleURL, "post", true, data, "json", function (res) {
        if (res.type == "success") {
            alert("发布文章成功");
        } else {
            alert("发布文章失败");
        }
    }, function (res) {
        alert(2);
    });

}