var gulp = require("gulp");
var clean = require("gulp-clean");
var htmlmin = require("gulp-htmlmin");
var less = require("gulp-less");
var uglify = require("gulp-uglify")
var concat = require("gulp-concat")
var sourcemaps = require("gulp-sourcemaps")
var autoprefixer = require("gulp-autoprefixer")
var gls = require('gulp-live-server');
var open = require ("gulp-open");
var server;

gulp.task("clean", [], function() {
    return gulp.src("dist")
        .pipe(clean());
})

gulp.task("html", [], function() {
    return gulp.src("index.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist"));
})

gulp.task("img", [], function() {
    return gulp.src("img/*.png")
        .pipe(gulp.dest("dist/img"));
})
gulp.task("styles", [], function() {
    return gulp.src("css/style.less")
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist/css"))
})

gulp.task("bootstrap", [], function() {
    return gulp.src("css/*.min.css")
        .pipe(gulp.dest("dist/css"))
})

gulp.task("js", [], function() {
    return gulp.src("js/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"))
})

gulp.task("vendor", [], function() {
    return gulp.src(["vendor/jquery-1.12.1.min.js", "vendor/bootstrap.min.js", "vendor/canvasjs.min.js"])
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest("dist/js"))
})

gulp.task("serve", [], function() {
    server = gls.static("dist", 5000)
    server.start();
})

gulp.task("open",[],function(){
	var options ={
		uri:"http://localhost:5000",
		app:"chrome"
	};
	gulp.src('.')
	.pipe(open(options))
})


gulp.task("default", ["clean"], function() {
    gulp.run("html");
    gulp.run("img");
    gulp.run("styles");
    gulp.run("bootstrap");
    gulp.run("js");
    gulp.run("vendor");
    gulp.run("serve");
    gulp.run("open");
     // gulp.watch("./index.html", ['html']);
    gulp.watch("css/*.less", function(file){
    	gulp.run("styles");
    	server.notify.apply(server, [file]);
    });
});
