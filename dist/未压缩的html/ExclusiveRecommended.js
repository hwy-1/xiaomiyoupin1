// 专属推荐
define(["jquery"], function ($) {
    function ExclusiveRecommendedDownPic() {
        $.ajax({
            url: "data/ExclusiveRecommended.json",
            success: function (arr) {
                for (var i = 0; i < arr.length; i++) {
                    // 添加图片
                    $(`
                        <li>
                        <!-- 图片和图片上的文字描述 -->
                        <a href="">
                            <div class="pic">
                                <img src=${arr[i].img} alt="">
                        
                                <p class = "picText">${arr[i].picText}</p>
                    
                                <span class = "num${i}">${arr[i].num}</span>
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
                    </li>   
                `).appendTo("#ExclusiveRecommended ul");

                    var value = $(`#ExclusiveRecommended ul .pic span.num${i}`).text();
                    // console.log(value)
                    if (!value) {
                        $(`#ExclusiveRecommended ul .pic span.num${i}`).remove();
                    }
                }


            },
            error: function (msg) {
                console.log(msg);
            }
        });
    }
    return {
        ExclusiveRecommendedDownPic: ExclusiveRecommendedDownPic,
    }
})
