// 购物车
define(["jquery"], function ($) {
    // 点击加入购物车
    function sc_btnClick() {
        // sc_num()
        $("#detail ul").on("click", ".sc_btn", function () {
            var id = this.id;

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
                console.log(cookieArr)
            }
        })
    }

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

    // 加载购物车列表
    // cookie只存储了id和num，商品数据在服务器
    // 下载数据，在数据中筛选加入购物车的数据
    function sc_msg() {
        sc_num()
        $.ajax({
            url: "data/shoppingcar.json",
            success: function (arr) {
                var cookieStr = $.cookie("goods");
                if (cookieStr) {
                    var cookieArr = JSON.parse(cookieStr);
                    // 存储符合条件的数据
                    var newArr = [];

                    // 拿到我们所有的数据
                    for (var i = 0; i < arr.length; i++) {
                        // 拿到cookie的数据
                        for (var j = 0; j < cookieArr.length; j++) {
                            // 如果cookie中的id和我们所有数据的id一样
                            if (arr[i].id == cookieArr[j].id) {
                                arr[i].num = cookieArr[j].num;
                                cookieArr[j].pice = arr[i].pice;
                                newArr.push(arr[i]);
                                // 每次找一个就行
                                break;
                            }

                        }
                    }
                    $.cookie("goods", JSON.stringify(newArr))
                    // console.log(newArr); // 购物车显示的数据
                    for (var i = 0; i < newArr.length; i++) {
                        $(`
                            <li id="${newArr[i].id}">
                            <div class="select">
                                <a class="select-icon"></a>
                            </div>
                            <div class="merchandise">
                                <img src=${newArr[i].img} alt="">
                                <p>${newArr[i].title}</p>
                            </div>

                            <div class="price">
                                <span>¥</span>
                                <span class="money">${newArr[i].pice}</span>
                            </div>
                            <div class="more-or-less">
                                <div class="less">-</div>
                                <div class="number">${newArr[i].num}</div>
                                <div class="more">+</div>
                            </div>
                            <div class="add">
                                <span>¥</span>
                                <span class="addNum">${newArr[i].pice * newArr[i].num}</span>
                            </div>
                            <div class="del">
                            <a class="del-icon"></a>
                        </div>
                        </li>
                        `).appendTo(".everyone")
                    }
                }


            },
            error: function (msg) {
                console.log(msg);
            }
        });
    }

    // 删除
    $(".everyone").on("click", ".del-icon", function () {
        // 我们要删除的不是Button按钮，而是button的父节点li，
        // closest是查找第一个符合条件的父节点，再通过remove删除父节点
        // 我们把这个li节点的id获取到（remove返回值还是li）        
        var id = $(this).closest("li").remove().attr("id");

        //在cookie中删除这个数据
        // 首先拿出cookie中的数据
        var cookieArr = JSON.parse($.cookie("goods"));
        // 过滤出除这个删除的商品之外的其他商品(返回一个去除了不要信息的新数组)
        cookieArr = cookieArr.filter(item => item.id != id);
        // 把商品添加进去，如果删到最后一个就变成空数组了，就没有必要再添加进去了
        // 如果还有东西的话，就把它转成json格式的字符串再添加进去
        cookieArr.length ? $.cookie("goods", JSON.stringify(cookieArr), { expires: 7 }) : $.cookie("goods", null);
        // 每一次增加或删除都要执行以下计算商品数量的函数
        sc_num();
    })

    // 左右按钮添加增加删除
    $(".everyone").on("click", ".more-or-less div", function () {
        // 找到我们当前点击的父节点的id，也就是该商品的id
        var id = $(this).closest("li").attr("id");

        //找到cookie中的商品
        // 先把我们的cookie中的数据拿出来
        var cookieArr = JSON.parse($.cookie("goods"));
        // 找到我们当前的id的节点
        var res = cookieArr.find(item => item.id == id);
        console.log(this.innerHTML)

        if (this.innerHTML == "+") {
            res.num++;
        } else {
            res.num == 1 ? alert("数量为1，不能减少") : res.num--;
        }
        $(this).siblings(".number").html(`${res.num}`);
        $(this).parent().parent().find('.addNum').html(`${res.num * res.pice}`)
        // 最后要把数据给存回去！！！！
        $.cookie("goods", JSON.stringify(cookieArr), {
            expires: 7
        })
        // 购物车的数量也要变
        sc_num();
    })

    // 点击图标改变
    var flag = true;
    $(".everyone").on("click", ".select-icon", function () {
        if (flag) {
            $(this).css("background-position", "0px -418px");
            flag = false;
        }else{
            $(this).css("background-position", "0px -507px");
            flag = true;
        }
    })





    $(".select-text").on("click", function () {
        $(this).css("background-position", "0px -418px");
        $(".select-icon").css("background-position", "0px -418px");

    })


    return {
        sc_msg: sc_msg,
        sc_btnClick: sc_btnClick,
    }
})
