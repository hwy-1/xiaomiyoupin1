define(["jquery"], function ($) {

    function Login() {
        // var oBtn = document.querySelector(".nowLogin");
        // var aInputs = document.querySelectorAll(".panel-body input");
        // var aAlert = document.querySelector(".alert");

        //函数防抖
        // oBtn.onclick = antiShake(download, 1000);
        $('.nowLogin').click(antiShake(download, 1000));


        function download() {
            $.ajax({
                type:'post',
                url: "php/login.php",
                data: {
                    username: $("#PhoneNumber").val(),
                    password: $("#rePassNumber").val(),
                },
                success: function (result) {
                    var obj = JSON.parse(result);
                    console.log(obj);
                    if (obj.code) {
                        //错误
                        $('.nowLogin').html(obj.msg)
                        $('.nowLogin').css("background","red")

                    } else {
                        ///成功
                        $('.nowLogin').html("登陆成功")
                        $('.nowLogin').css("background","green")
                        setTimeout(() => {
                           
                            location.assign("index.html");
                        }, 500);
                    }
                },
                error: function (msg) {
                    console.log(msg,111);
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
        Login:Login
    }
})





