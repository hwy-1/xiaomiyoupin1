// 最大的轮播图
//必须遵从AMD规范
define(["jquery"], function ($) {
  function download() {
    $.ajax({
      url: "data/banner.json",
      success: function (arr) {
        for (i = 0; i < arr.length; i++) {
          var titles = arr[i].title;
          $(` <li class = "nav-item"><span style="color: #fff;">${titles[0]}</span>
              <span style="color: #fff;">/</span>
              <span style="color: #fff;">${titles[1]}</span>
              
              <div class = "hidden${i} hidden" ">
                <div class="section">
                    <div class="title">${titles[0]}</div>
                    <div class="title-content1">
                    </div>
                  
                </div>
                <div class="section">
                    <div class="title">${titles[1]}</div>
                    <div class="title-content2">
                    </div>
                </div>
              </div>                                           
            
              </li>
          `).appendTo("#banner .nav-list");
          //   $(` 
          //   <div class = "hidden${i*2} hidden" ">
          //     <div class="section">
          //         <div class="title">${titles[0]}</div>
          //         <div class="title-content1">
          //         </div>

          //     </div>
          //     <div class="section">
          //         <div class="title">${titles[1]}</div>
          //         <div class="title-content2">
          //         </div>
          //     </div>
          //   </div>                                           
          //  `).appendTo(".nav-list li:nth-of");

          var broadsides = arr[i].broadside;
          var broadsides0 = arr[i].broadside[0];
          var broadsides0subtitle = arr[i].broadside[0].subtitle;
          var broadsides1subtitle = arr[i].broadside[1].subtitle;
        }

        // 第一部分
        for (let j = 0; j < broadsides0subtitle.length; j++) {
          $(` <div class = "sub1">
                  <span class= "subtitle${j}" >${broadsides0subtitle[j]}</span>
                </div>
           `).appendTo("#banner .title-content1")
        }

        for (let i = 0; i < arr.length; i++) {
          var broadsides0hot1 = arr[i].broadside[0].hot1;
          for (var h = 0; h < broadsides0hot1.length; h++) {
            $(` <span>
              <a href="#">${broadsides0hot1[h].title}</a>
            </span>
          `).appendTo(`#banner .subtitle${i}`)
          }
        }


        // 第二部分
        for (let k = 0; k < broadsides1subtitle.length; k++) {
          $(` <div class = "sub2">
                 <span class= "subtitle1${k}">${broadsides1subtitle[k]}</span>
           
              </div>
           `).appendTo("#banner .title-content2")
        }
        for (let j = 0; j < arr.length; j++) {
          var broadsides0hot2 = arr[j].broadside[0].hots2;
          for (var h = 0; h < broadsides0hot2.length; h++) {
            $(` <span>
              <a href="#">${broadsides0hot2[h].title}</a>
            </span>
          `).appendTo(`#banner .subtitle1${j}`)
          }
        }

      },
      error: function (msg) {
        console.log(msg);
      },
    });
  }

  // 鼠标移入移出
  // 事件委托
  function goOut() {
    $(function () {
      $("#banner .nav-list").on("mouseenter", ".nav-item", function () {
        $(`.hidden${$(this).index()}`).has(".section").css("display", "block");
        $(this).css("backgroundColor", "rgba(0,0,0,.15);")
      })
      $("#banner .nav-list").on("mouseleave", ".nav-item", function () {

        $(`#banner .hidden${$(this).index()}`).has(".section").css("display", "none");
      })
    })
  }
  return {
    download: download,
    goOut: goOut
  };
});
