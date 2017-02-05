var gulp = require("gulp"),
    notify = require("gulp-notify"),
    compass = require("gulp-compass"),
    browsersync = require("browser-sync"),
    gulfif = require("gulp-if"),
    concat = require("gulp-concat");

var env = "develpment",
    sassFolder,
    outputDir,
    sassStyle;

if (env === 'develpment') {
    outputDir = 'builds/develpment/';
    sassStyle = 'expanded';
} else {
    outputDir = 'builds/production/';
    sassStyle = 'compressed';
}

sassFolder = ['components/style/style.scss'];

gulp.task('compass', function() {
    return gulp.src(sassFolder)
        .pipe(compass({
            sass: 'components/style/',
            css: outputDir + "css",
            image: outputDir + "images",
            require: ['susy', 'breakpoint']
        })).on('error', notify.onError())
        .pipe(gulp.dest(outputDir + "css"))
        .pipe(browsersync.stream());
});

gulp.task('serve', ["compass"], function() {

    browsersync.init({
        server: "builds/develpment/"
    });

    gulp.watch(["components/style/**/*.scss"], ['compass']);
    gulp.watch("./builds/develpment/*.html").on('change', browsersync.reload);
    gulp.watch("./builds/develpment/js/*.js").on('change', browsersync.reload);
})

gulp.task('default', ['serve']);
