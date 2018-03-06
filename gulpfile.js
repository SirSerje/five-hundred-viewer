//requires
const gulp = require("gulp");
const sass = require("gulp-sass");

//path
let sassFiles = "src/styles/*.sass";
let cssDest = "src/styles/";

//tasks
gulp.task("styles", function () {
	gulp.src(sassFiles)
		.pipe(sass().on("error", sass.logError))
		.pipe(gulp.dest(cssDest));
});

gulp.task("watch", function () {
	gulp.watch(sassFiles, ["styles"]);
});