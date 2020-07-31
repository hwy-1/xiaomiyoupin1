console.log("加载成功");
//引入所有的模块
//配置路径
require.config({
  paths: {
    'jquery': "jquery-1.11.3",
    "jquery-cookie": "jquery.cookie",
    // parabola: "parabola", //抛物线方程不支持AMD规范
    'banner': "banner",
    'bannerpic': "bannerpic",
    'seckill': "seckill",
    'dailyNew': "dailyNew",
    // 专属推荐
    'ExclusiveRecommended': "ExclusiveRecommended",
    // 购物车
    'shoppingcar':"shoppingcar",
    // 详情页
    'detail':"detail",
    
    'goods':"goods",
    
    'head': "head",
    'Top': "Top",
    // 注册
    'register': "register",
    // 登录
    'login': "login",

  },
  shim: {
    //设置依赖关系
    "jquery-cookie": ["jquery"],
    //某一个模块，不遵从AMD
    // parabola: {
    //   exports: "_",
    // },
  },
});

//调用模块
require(["banner", "bannerpic", "seckill", "dailyNew", "ExclusiveRecommended", "head", "register", "login", "detail", "shoppingcar","goods"], function (banner, bannerpic, seckill, dailyNew, ExclusiveRecommended, head, register, login, detail, shoppingcar,goods) {
  banner.download();
  banner.goOut();

  bannerpic.downPic();

  seckill.downSeckillPic();

  dailyNew.downDailyPic();

  ExclusiveRecommended.ExclusiveRecommendedDownPic();
  
  head.Head();
  head.Top();
  head.download();
  head.goOut();
  
  
  register.Register();
  register.php();
  
  
  detail.a_btnClick();
  detail.Top();

  shoppingcar.sc_msg();
  shoppingcar.sc_btnClick();


 
  goods.move();
  goods.download()

  login.Login()
});



















