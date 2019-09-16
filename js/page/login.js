$(function () {
    getCodeImg();
});

/**
 * 登录·提交表单
 */
function loginChange() {
    event.preventDefault();
    $.ajax({
        type: 'post',
        url: loginUrl,
        data: {
            sessionId: $("#sessionId").val(),
            userName: $("#username").val(),
            userPwd: $("#password").val(),
            code: $("#code").val()
        },
        success: function (e) {
            let res = JSON.parse(e);
            console.log(res);
            if (res.type == "success") {
                window.localStorage.setItem("tokenId",res.data.token.tokenId);
                window.localStorage.setItem("uid", res.data.token.uid);
                window.localStorage.setItem("avatar",res.data.token.avatar);
                $('form').fadeOut(500);
                $("#accountTitle").text("Welcome");
                $('.wrapper').addClass('form-success');
                setTimeout(function () {
                    window.location = "home.html";
                }, 1500);
            } else {
                alert(res.msg);
            }
        }
    })
}

/**
 * 验证码刷新
 */
function refresh() {
    // 提示框隐藏
    $("#id-msg").hide();
    getCodeImg();
}

/**
 * 获取验证码图片
 */
function getCodeImg() {
    $.ajax({
        url: codeImgUrl,
        type: 'post',
        success: function (e) {
            let data = JSON.parse(e);
            $("#captchaImg").attr("src", "data:image/jpg;base64," + data.codeImg);
            $("#sessionId").attr("value", data.sessionId);
        },
    })
}