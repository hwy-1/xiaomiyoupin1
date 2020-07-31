// 详情
define(["jquery", "jquery-cookie"], function ($) {
    // 找地址?后面的内容
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    // 商品详情页,有放大镜的
    function download() {
        var id = getUrlParam("id");
        // console.log(id)
        $.ajax({
            url: "data/detail.json",
            success: function (arr) {
                var cookieArr = JSON.parse($.cookie("goods"));
                console.log(cookieArr)
                if (!cookieArr) {
                    var newArr = [];
                    // 拿到json的数据
                    for (var i = 0; i < arr.length; i++) {
                        // 如果cookie中的id和我们所有数据的id一样
                        if (arr[i].id == id) {
                            arr[i].num = 1;
                            newArr.push(arr[i]);
                            // 每次找一个就行
                            console.log(0,newArr)
                            break;
                        }
                    }
                } else {
                    var newArr = [];
                    var flag = true
                    for (var j = 0; j < cookieArr.length; j++) {

                        // 如果cookie中的id和我们所有数据的id一样
                        if (cookieArr[j].id == id) {
                            flag = false
                            newArr.push(cookieArr[j]);
                            // 每次找一个就行
                            console.log(1,newArr)

                            break;
                        }
                    }
                    if (flag) {
                        for (var i = 0; i < arr.length; i++) {
                            // 
                            if (arr[i].id == id) {
                                arr[i].num = 1;
                                newArr.push(arr[i]);
                                // 每次找一个就行
                                console.log(2,newArr)
                               
                                break;
                            }
                        }
                    }
                }
                console.log(newArr)
                for (var j = 0; j < newArr.length; j++) {
                    $(`
                    <div class="banner">
                        <div class="smallImg">
                            <img src=${newArr[j].img} alt="">
                            <div class="mark"></div>
    
                        </div>
    
                        <div class="thumb">
    
                        </div>
                        <div class="bigImg">
                            <img src=${newArr[j].img} alt="" class="big">
                        </div>
                    </div>
    
                    <div class="goods-details">
                        <div class="title">
                            <h2>${newArr[j].title}</h2>
                            <p class="picText">${newArr[j].picText}</p>
                        </div>
    
                        <div class="money">
                            <div class="pice">
                                <h5>售价</h5>
    
                                <div class="NowMoney">
                                    <span class="dot">¥</span>
                                    <span class="now-money">${newArr[j].pice}</span>
                                    <span class="rise">${newArr[j].rise}</span>
                                </div>
    
                                <div class = "Full">
                                    <span class="fullcut">${newArr[j].fullCut}</span>
                                    <span class="cut">${newArr[j].cut}</span>
                                    <span class="give">${newArr[j].give}</span>
                                </div>
                            </div>
                            <div class="serve">
                                <h5>服务</h5>
                                <div>
                                    <span class="serve-icon"></span>
                                    <span>满99包邮</span>
                                </div>
                                <div>
                                    <span class="serve-icon"></span>
                                    <span>有品自营</span>
                                </div>
                                <div>
                                    <span class="serve-icon"></span>
                                    <span>支持7天无理由退货</span>
                                </div>
                                <div>
                                    <span class="serve-icon"></span>
                                    <span>有品退换</span>
                                </div>
                            </div>
                        </div>
                        <div class="More-Less">
                            <h5>数量</h5>
    
                            <div class="more-or-less">
                                <div class="less">-</div>
                                <div class="number">${newArr[j].num}</div>
                                <div class="more">+</div>
                            </div>
                        </div>
    
                        <div class="goods-details-bottom">
                            <div class = "sc">
                                <div id = "" class="sc_btn">加入购物车</div>
                            </div>
                            <div class = "now">
                                <div id = "" class="now_btn">立即购买</div>
                            </div>
                        </div>
                    </div>    
                    `).appendTo(".goodsDetail")
                }

            },
            error: function (msg) {
                console.log(msg);
            }
        });
    }
    // 点击加入购物车

    sc_num()
    $(".goodsDetail").on("click", ".sc_btn", function () {
        var id = getUrlParam("id");
        // console.log(id)

        // 1.判断是不是第一次添加
        var first = $.cookie("goods") == null ? true : false;
        if (first) {
            var arr = [{ id: id, num: 1 }];
            $.cookie("goods", JSON.stringify(arr), { expires: 7 });

            // 解决第一次点击购物车购物车中还显示1的问题
            $(".shopping-car .sc_num").html(arr[0].num);

        } else {
            // 2.判断之前是否添加过
            var cookieArr = JSON.parse($.cookie("goods"));
            var findIndex = cookieArr.findIndex(item => item.id == id);
            // 如果之前添加过东西，但没有添加过这个东西的话
            if (findIndex == -1) {
                var obj = { id: id, num: 1 };
                cookieArr.push(obj);
            } else {
                cookieArr[findIndex].num++;
            }

            // 存回去
            $.cookie("goods", JSON.stringify(cookieArr), { expires: 7 });
            sc_num()
        }
    })

    // 计算购物车商品总数
    function sc_num() {
        var cookieStr = $.cookie("goods");
        if (!cookieStr) {
            $(".shopping-car .sc_num").html(0);
        } else {
            // 有的话转成数组
            var cookieArr = JSON.parse(cookieStr);
            var sum = 0;
            for (var i = 0; i < cookieArr.length; i++) {
                sum += cookieArr[i].num;
            }
            $(".shopping-car .sc_num").html(sum);
        }
    }

    // 左右按钮添加增加删除
    $(".goodsDetail").on("click", ".More-Less .more-or-less div", function () {
        // 找到我们当前点击的父节点的id，也就是该商品的id
        // var id = $(this).closest("li").attr("id");
        var id = getUrlParam("id");

        //找到cookie中的商品
        // 先把我们的cookie中的数据拿出来
        var cookieArr = JSON.parse($.cookie("goods"));
        // 找到我们当前的id的节点
        var res = cookieArr.find(item => item.id == id);
        // console.log(res)
        if (!res.num) {
            res.num = 0;
        }
        if (this.innerHTML == "+") {
            res.num++;
        } else {
            res.num == 1 ? alert("数量为1，不能减少") : res.num--;
        }
        $(".number").html(`${res.num}`);
        // $(this).parent().parent().find('.addNum').html(`${res.num * res.pice}`)
        // 最后要把数据给存回去！！！！
        $.cookie("goods", JSON.stringify(cookieArr), {
            expires: 7
        })
        // 购物车的数量也要变
        sc_num();
    })

    // 放大镜
    function move() {
        $("#Goods .goodsDetail").on("mouseenter", ".smallImg", function () {
            $(".mark").css("display", "block");
            $(".bigImg").css("display", "block");
        })
        $("#Goods .goodsDetail").on("mouseleave", ".smallImg", function (e) {
            $(".mark").css("display", "none");
            $(".bigImg").css("display", "none");
        })
        $("#Goods .goodsDetail").on("mousemove", ".smallImg", function (e) {
            var e = e || window.event;
            var l = e.clientX - $(".smallImg").offset().left - 75;
            var t = e.clientY - $(".smallImg").offset().top - 75;
            if (l <= 0) {
                l = 0;
            }
            if (l >= 200) {
                l = 200;
            }
            if (t <= 0) {
                t = 0;
            }
            if (t >= 200) {
                t = 200;
            }
            $(".mark").css("left", l + 'px');
            $(".mark").css("top", t + 'px');
            $(".big").css("left", -2 * l + 'px');
            $(".big").css("top", -2 * t + 'px');
        })

    }


    return {
        // sc_btnClick: sc_btnClick,
        move: move,
        download, download
    }
})
