// 每日新品
define(["jquery"], function ($) {
    function downDailyPic() {
        $.ajax({
            url: "data/dailyNew.json",
            success: function (arr) {
                for (var i = 0; i < arr.length; i++) {
                    // 添加图片
                    $(`
                    <li>
                    <a href=""><img src=${arr[i].img} alt="">
                        <div>
                            <p>${arr[i].title}</p>
                            <p title = '${arr[i].title1}'>${arr[i].message}</p>
                            <p>
                                <span class="now-money dot">¥</span>
                                <span class="now-money">${arr[i].pice}</span>
                                <span class="now-money rise">${arr[i].rise}</span>

                            </p>
                        </div>
                    </a>
                </li>
                    
                    `).appendTo("#DailyNew ul");


                }

                var oUl = $("#DailyNew ul");
                var aLis = $("#DailyNew ul li");

                var j = 1; //代表显示的图片的下标

                // function tab() {
                //     oUl.animate({ left: j * -271 }, 500);
                // }

                $("#DailyNew dl li").eq(0).click(antiShake(function () {
                    if (j >= 2) {
                        oUl.animate({ left: 270 * -1 * (j - 2) }, 500);
                        j--;
                    }
                    if (j == 1) {
                        $(this).css("background-position", "0 -1940px");
                    }
                    console.log(j)
                }, 200));

                //左右滚动
                $("#DailyNew dl li").eq(1).click(antiShake(function () {
                    if (j <= 2) {
                        oUl.animate({ left: 270 * -1 * j }, 500);
                        j++;
                    }
                    if (j == 3) {
                        $(this).css("background-position", "0 -1856px");
                    }

                }, 200));

                // 变色
                $("#DailyNew dl li").eq(0).hover(function () {
                    if (j >= 2) {
                        $(this).css("background-position", "0 -1814px");
                    }
                }, function () {
                    $(this).css("background-position", "0 -1940px");
                })

                // 变色
                $("#DailyNew dl li").eq(1).hover(function () {
                    if (j <= 6) {
                        $(this).css("background-position", "0 -1898px");
                    }
                }, function () {
                    $(this).css("background-position", "0 -1856px");
                })

                // 防抖
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
        downDailyPic: downDailyPic,
    }
})
