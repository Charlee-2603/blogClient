/**
 * ajax请求
 * 依赖jQuery
 */
const path = "/napi";
function http(url, type, async, data, dataType, successFunction, errorFunction) {
    data["selfToken"] = window.localStorage.token;
    $.ajax({
        type: type || "get",
        url: path + url,
        async: async,
        data : JSON.stringify(data),
        dataType : dataType || "json",
        contentType : "application/json",
        success : function(res) {
            if(res.errCode === 1100000) {
                window.location.href = "./login.html";
            } else {
                successFunction(res);
            }
        },
        error : errorFunction
    });
}