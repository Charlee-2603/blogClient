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
            let data = JSON.parse(e);
            console.log(data);
            if (data.msg == "success") {
                $('form').fadeOut(500);
                $("#accountTitle").text("Welcome");
                $('.wrapper').addClass('form-success');
                setTimeout(function () {
                    window.location = "home.html";
                }, 1500);
            } else {
                alert(data.msg);
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