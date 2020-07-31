define(["jquery"], function ($) {

    // 判断手机号是否正确
    function Register() {
        // 注册
        // var oPhoneNumber = document.getElementById("PhoneNumber");
        // var oReminder = document.getElementById("reminder");

        $("#PhoneNumber").blur(function () {
            // 获取输入框的值
            // console.log($("#PhoneNumber").val())
            // console.log($("#reminder").text())
            // console.log($("#reminder").size())
            if (!($("#PhoneNumber").val())) {

                $("#reminder")
                    .html("❗请输入手机号码")
                    .css("display", "block");

            } else if (!opH($("#PhoneNumber").val())) {
                $("#reminder")
                    .html("❗手机格式错误")
                    .css("display", "block");

            } else {
                $("#reminder")
                    // .html("手机号码正确")
                    // .css("color","green")
                    .css("display", "none");
            }
        })

    }
    function opH(phone) {
        return /^1[3|4|5|8][0-9]\d{4,8}$/.test(phone);
    }
    // php链接跳转
    function php() {
        //函数防抖
        $('.nowRegion').click(antiShake(download, 1000));
   
        function download() {
            $.ajax({
                type:"post",
                url: "php/register.php",
                data: {
                    username: $(".panel-body input").eq(0).val(),
                    password: $(".panel-body input").eq(1).val(),
                    repassword: $(".panel-body input").eq(2).val()
                },
                success: function (result) {
                    console.log(result);
                    var obj = JSON.parse(result);
                    if (obj.code) {
                        //错误
                        $('.nowRegion').html("注册失败，用户名已存在")
                        $('.nowRegion').css("background","red")
                        
                    } else {
                        $('.nowRegion').html("注册成功")
                        $('.nowRegion').css("background","green")


                        setTimeout(() => {
                           
                            location.assign("login.html");
                        }, 500);
                    }
                },
                error: function (msg) {
                    console.log(msg);
                }
            })
        }

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



    }

    return {
        Register: Register,
        opH: opH,
        php:php
    }
})




