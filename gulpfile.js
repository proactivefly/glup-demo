var gulp = require('gulp');
var rename = require('gulp-rename');//重命名
var uglify=require('gulp-uglify');//js压缩
var watch=require('gulp-watch');//监视
var stylus=require('gulp-stylus');//编译stylus
var minifyCss = require("gulp-minify-css");//压缩CSS
var minifyHtml = require("gulp-minify-html");//压缩html
var jshint = require("gulp-jshint");//js检查
var imagemin = require('gulp-imagemin'); //压缩图片
var connect=require('gulp-connect');//引入gulp-connect模块 
var concat=require('gulp-concat')


 

gulp.task('stylus',function(){
    return gulp.src('/stylus/*.styl')
    .pipe(stylus())//编译stylus
    .pipe(gulp.dest('css/')) //当前对应css文件
    .pipe(connect.reload());//更新
})
 

gulp.task('css',['stulus'],function(){
    return gulp.src('css/*.css')
    .pipe(concat('build.css')) //合并临时文件
    .pipe(minifyCss())
    .pipe(gulp.dest('css/')) //当前对应css文件
    .pipe(connect.reload());//更新
})

gulp.task('js',function(){
    return gulp.src('js/*.js')
    .pipe(jshint())//检查代码
    .pipe(uglify())//压缩js
    .pipe(gulp.dest('dist/js/'))
    .pipe(connect.reload());
})


gulp.task('img',function(){
    return gulp.src('img/*.jpg')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img/'))
    .pipe(connect.reload());
})


gulp.task('html',function(){
    return gulp.src('*.html')
    .pipe(minifyHtml())
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload());
})

gulp.task('watchs',function(){
    gulp.watch('cug_vatti_Backpass/*.html',gulp.series('html'));
    gulp.watch('cug_vatti_Backpass/css/*.stylus',gulp.series('css'));
    gulp.watch('cug_vatti_Backpass/js/*.js',gulp.series('js'));
})
gulp.task('connect',function(){
    connect.server({
        root:'cug_vatti_Backpass',//根目录
        // ip:'192.168.11.62',//默认localhost:8080
        livereload:true,//自动更新
        port:9909//端口
    })
})

 //gulp.series|4.0 依赖
 //gulp.parallel|4.0 多个依赖嵌套
gulp.task('default',gulp.series(gulp.parallel('connect','watchs','html','css','js')));