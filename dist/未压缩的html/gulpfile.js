//gulp遵从 commonjs
const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");
//对当前的html文件进行压缩
gulp.task("copy-html", function () {
  return gulp
    .src("*.html")
    .pipe(
      htmlmin({
        removeEmptyAttibutes: true, // 移出所有空属性
        collapseWhitespace: true, // 压缩 html
      })
    )
    // 习惯上将打包好的文件叫做dist
    .pipe(gulp.dest("dist/"))
    .pipe(connect.reload());
});

//处理图片
gulp.task("images", function () {
  return gulp
    .src("img/**/*")
    .pipe(gulp.dest("dist/images"))
    .pipe(connect.reload());
});

//处理js 如果你使用了第三方库，不需要再进行处理了
gulp.task("scripts", function () {
  return gulp
    .src(["*.js", "!gulpfile.js"])
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload());
});

//数据源文件
gulp.task("data", function () {
  return gulp
    .src(["*.json", "!package.json"])
    .pipe(gulp.dest("dist/data"))
    .pipe(connect.reload());
});

// scss文件要压缩、重命名 要进行编译
// 处理scss gulp-sass gulp-minify-css gulp-rename
// 编译的时候，要把我们用的插件引进来
// 如果有多个scss文件并且不涉及重命名，可以批量处理 将index.css换成*.css就可以了
// 如果要重命名，只能一个文件一个任务，而且任务名不能重复，会覆盖
const scss = require("gulp-sass");
const minifyCSS = require("gulp-minify-css");
const rename = require("gulp-rename");
gulp.task("scss1", function () {
  return gulp
    .src("stylesheet/index.scss")
    // 编译
    .pipe(scss())
    // 放入
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("index.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
});

gulp.task("scss2", function () {
  return gulp
    .src("stylesheet/register.scss")
    // 编译
    .pipe(scss())
    // 放入
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("register.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
});

gulp.task("scss3", function () {
  return gulp
    .src("stylesheet/login.scss")
    // 编译
    .pipe(scss())
    // 放入
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("login.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
});
gulp.task("scss4", function () {
  return gulp
    .src("stylesheet/detail.scss")
    // 编译
    .pipe(scss())
    // 放入
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("detail.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
});
gulp.task("scss5", function () {
  return gulp
    .src("stylesheet/shoppingcar.scss")
    // 编译
    .pipe(scss())
    // 放入
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("shoppingcar.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
});
// 商品放大图
gulp.task("scss6", function () {
  return gulp
    .src("stylesheet/goods.scss")
    // 编译
    .pipe(scss())
    // 放入
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("goods.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
});
//先让上面的任务都执行一次，如果没有问题再执行,这过程 build
gulp.task(
  "build",
  ["copy-html", "scripts", "images", "data", "scss1","scss2","scss3","scss4","scss5","scss6"],
  function () {
    console.log("项目建立成功");
  }
);

//实现监听
gulp.task("watch", function () {
  // 参数1，监听的路径 参数2，我们要执行的任务
  gulp.watch("*.html", ["copy-html"]);
  gulp.watch("img/**/*", ["images"]);
  gulp.watch(["*.js", "!gulpfile.js"], ["scripts"]);
  gulp.watch(["*.json", "!package.json"], ["data"]);


  gulp.watch("stylesheet/index.scss", ["scss1"]);
  gulp.watch("stylesheet/register.scss", ["scss2"]);
  gulp.watch("stylesheet/login.scss", ["scss3"]);
  gulp.watch("stylesheet/detail.scss", ["scss4"]);
  gulp.watch("stylesheet/shoppingcar.scss", ["scss5"]);
  gulp.watch("stylesheet/goods.scss", ["scss6"]);
  
});

//启动一个临时的服务器
const connect = require("gulp-connect");

gulp.task("server", function () {
  connect.server({
    root: "dist",
    port: 8888,
    livereload: true,
  });
});

//同时启动监听和服务
gulp.task("default", ["watch", "server"]);
