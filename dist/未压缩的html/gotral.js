define(["jquery", "jquery-cookie"], function ($) {
    // 点击抢购页商品进入商品详情页
    function a_btnClick() {
        $("#detail ul").on("click", "a", function () {
            var id = this.id;
            var arr = [{id:id}];
            $.cookie("goods", JSON.stringify(arr),{expires:7});
            // 把cookie中存的刚才点击的数据取出来
            var cookieArr = JSON.parse($.cookie("goods"));
            console.log(cookieArr)

        })
    }
    return{
        a_btnClick:a_btnClick
    }


})