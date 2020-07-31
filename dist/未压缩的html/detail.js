// 商品列表
define(["jquery", "jquery-cookie"], function ($) {

    // 右侧固定部分
    function Top() {
        $("#fixed .top").click(function () {
            $("body,html").animate({ scrollTop: 0 }, 500)
        })
        $(document).ready(function () {
            $(window).scrollTop(0);
        })
    }


    // // 点击加入购物车
    // function sc_btnClick() {
    //     $("#detail ul").on("click", ".sc_btn", function () {
    //         var id = this.id;
    //         // 1.判断是不是第一次添加
    //         var first = $.cookie("goods") == null ? true : false;
    //         if (first) {
    //             var arr = [{ id: id, num: 1 }];
    //             $.cookie("goods", JSON.stringify(arr), { expires: 7 });
    //         } else {
    //             // 2.判断之前是否添加过
    //             var cookieArr = JSON.parse($.cookie("goods"));
    //             var findIndex = cookieArr.findIndex(item => item.id == id);
    //             // 如果之前添加过东西，但没有添加过这个东西的话
    //             if (findIndex == -1) {
    //                 var obj = { id: id, num: 1 };
    //                 cookieArr.push(obj);
    //             } else {
    //                 cookieArr[findIndex].num++;
    //             }

    //             // 存回去
    //             $.cookie("goods", JSON.stringify(cookieArr), { expires: 7 });
    //             // sc_num()
    //         }
    //         // alert($.cookie("goods"))

    //     })

    // }

     // 点击抢购页商品进入商品详情页
     function a_btnClick() {
        $.ajax({
            url: "data/detail.json",
            success: function (arr) {
                for (var i = 0; i < arr.length; i++) {
                    // 添加图片
                    $(`
                        <li>
                        <!-- 图片和图片上的文字描述 -->
                        <a href = "goods.html?id=${arr[i].id}" target="_blank">
                            <div class="pic">
                                <img src=${arr[i].img} alt="">
                        
                                <p class = "picText">${arr[i].picText}</p>
                    
                                <span class = "num${i}">${arr[i].Num}</span>
                            </div>

                            <div class="pic-bottom">
                                <div>
                                    <span class="fullCut">${arr[i].fullCut}</span>
                                    <span class="cut">${arr[i].cut}</span>
                                    <span class="give">${arr[i].give}</span>
                                </div>
                                <!-- title -->
                                <p>${arr[i].title}</p>
                                <p>
                                    <span class="now-money dot">¥</span>
                                    <span class="now-money">${arr[i].pice}</span>
                                    <span class="now-money rise">${arr[i].rise}</span>
                                </p>
                            </div>
                        </a>
                            <div class = "sc">
                                <div id = "${arr[i].id}" class="sc_btn">加入购物车</div>
                            </div>
                    </li>   
                `).appendTo("#detail ul");

                    var value = $(`#detail ul .pic span.num${i}`).text();
                    // console.log(value)
                    if (!value) {
                        $(`#detail ul .pic span.num${i}`).remove();
                    }
                }

                $("#detail ul").on("click", ".dianyixia", function () {
                   
                    
                    location.replace("goods.html")
                    $.cookie("goods", $(this).attr("id"),{expires:30})
                   
                    
                })
                // 把cookie中存的刚才点击的数据取出来
                // var cookieArr = JSON.parse($.cookie("goods"));
                // console.log(cookieArr)
               
            },
            error: function (msg) {
                console.log(msg);
            }
        });

    }

    return {
        // detailDownPic: detailDownPic,
        // sc_btnClick: sc_btnClick,
        Top: Top,
        a_btnClick:a_btnClick
    }
})
