define(["jquery"], function ($) {
    function downPic() {
        $.ajax({
            url: "data/bannerpic.json",
            success: function (arr) {
                $(`
                        <li class="active"></li>
                    `).appendTo(".banner-right ol");
                for (i = 1; i < arr.length; i++) {
                    // 添加小原点
                    $(`
                        <li></li>
                    `).appendTo(".banner-right ol");
                }

                for (var j = 0; j < arr.length; j++) {
                    // console.log(j)
                    // 添加图片
                    $(`
                        <li>
                            <a href="https://m.xiaomiyoupin.com/w/mifans?_rt=weex&pageid=3814"><img
                                    src="images/banner/banner-${j + 1}.jpeg" alt=""></a>
                        </li>
                    
                    `).appendTo(".banner-right ul");
                }
                $(`
                <li>
                    <a href="https://m.xiaomiyoupin.com/w/mifans?_rt=weex&pageid=3814"><img
                            src="images/banner/banner-1.jpeg" alt=""></a>
                </li>
                
                 `).appendTo(".banner-right ul");

                // 下方小圆点
                var aBtns = $(".banner-right").find("ol li");
                var oUl = $(".banner-right").find("ul");

                // 左右按钮
                var aBtn = $(".banner-right dl li")
                // console.log(aBtn)
                var iNow = 0; //代表显示的图片的下标
                var timer = null;

                aBtns.click(function () {
                    iNow = $(this).index();
                    tab();
                })
                // $(".banner-right dl li").eq(0).click(function () {
                //     if (iNow == 0) {
                //         iNow = aBtns.size();
                //         oUl.css("left", -859 * 6);
                //     }
                //     iNow--;
                //     tab();
                // })
                // $(".banner-right dl li").eq(1).click(function () {
                //     iNow++;
                //     console.log(iNow)
                //     tab();
                // })

                //自动轮播
                timer = setInterval(function () {
                    iNow++;
                    tab();
                }, 2000);

                $(".banner-right")
                    .mouseenter(function () {
                        clearInterval(timer);
                    })
                    .mouseleave(function () {
                        timer = setInterval(function () {
                            iNow++;
                            tab();
                        }, 2000);
                    });
                function tab() {
                    // 先删除所有样式，再将当前点击的按钮的class设置为active
                    aBtns.removeClass("active").eq(iNow).addClass("active");
                    if (iNow == aBtns.size()) {
                        aBtns.eq(0).addClass("active");
                    }
                    oUl.animate({ left: iNow * -859 }, 500, function () {
                        if (iNow == aBtns.size()) {
                            iNow = 0;
                            oUl.css("left", 0);
                        }
                    });
                }
                $(".banner-right dl li").eq(0).click(antiShake(function () {
                    if (iNow == 0) {
                        iNow = aBtns.size();
                        oUl.css("left", -859 * 6);
                    }
                    iNow--;
                    tab();
                }, 500));
                $(".banner-right dl li").eq(1).click(antiShake(function () {
                    iNow++;
                    // console.log(iNow)
                    tab();
                },500))

                function antiShake(func, delay) {
                    // console.log(func)  console.log(i++)这个函数    
                    var timer = null;
                    // 下面这个函数是为了给func防抖的
                    // 我们最终的参数是为了传给func
                    // 把参数展开成数组（我们要拿到事件对象）
                    return function (...argus) {
                        // console.log(...argus); // 事件对象
                        // console.log(this); // button
                        var _this = this;
                        // 首先清除定时器
                        clearTimeout(timer);
                        timer = setTimeout(function () {
                            // 本来func的this指向window
                            // console.log(this); 
                            func.apply(_this, argus);
                        }, delay);
                    }
                }


            },
            error: function (msg) {
                console.log(msg);
            }
        });
    }
    return {
        downPic: downPic,
    }
})