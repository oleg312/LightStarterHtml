let project_folder = require("path").basename(__dirname);
let source_folder = "#src";
let fs = require('fs');

let path = {
   build: {
      html: project_folder + "/",
      css: project_folder + "/assets/styles/",
      js: project_folder + "/assets/js/",
      img: project_folder + "/assets/images/",
      fonts: project_folder + "/assets/fonts/",
   },
   src: {
      html: source_folder + "/*.html",
      css: source_folder + "/assets/styles/style.sass",
      js: source_folder + "/assets/js/main.js",
      img: source_folder + "/assets/images/**/*.{jpg,png,svg,gif,ico,webp}",
      fonts: source_folder + "/assets/fonts/*.ttf",
   },
   watch: {
      html: source_folder + "/**/*.html",
      css: source_folder + "/assets/styles/**/*.sass",
      js: source_folder + "/assets/js/**/*.js",
      img: source_folder + "/assets/images/**/*.{jpg,png,svg,gif,ico,webp}",
   },
}
let { src, dest } = require('gulp'),
   gulp = require('gulp'),
   browsersync = require('browser-sync').create(),
   panini = require('panini'),
   del = require("del"),
   sass = require("gulp-sass"),
   autoprefixer = require("gulp-autoprefixer"),
   concat = require('gulp-concat'),
   group_media = require("gulp-group-css-media-queries"),
   clean_css = require("gulp-clean-css"),
   rename = require("gulp-rename"),
   uglify = require("gulp-uglify-es").default,
   imagemin = require("gulp-imagemin"),
   webp = require("gulp-webp"),
   webphtml = require("gulp-webp-html"),
   webpCss = require('gulp-webp-css'),
   ttf2woff = require('gulp-ttf2woff'),
   ttf2woff2 = require('gulp-ttf2woff2');
function browserSync(params) {
   browsersync.init({
      server: {
         baseDir: "./" + project_folder + "/"
      },
      port: 3000,
      notify: false
   })
}
function html() {
   panini.refresh();
   return src(path.src.html)
      .pipe(panini({
         root: source_folder + "/",
         layouts: source_folder + "/" + 'layouts/',
         partials: source_folder + "/" + 'partials/',
         helpers: source_folder + "/" + 'helpers/',
         data: source_folder + "/" + 'data/'
      }))
      .pipe(webphtml())
      .pipe(dest(path.build.html))
      .pipe(browsersync.stream())
}
function css(params) {
   return src(path.src.css)
      .pipe(
         sass({
            output: "expanded"
         })
      )
      .pipe(
         group_media()
      )
      .pipe(
         autoprefixer({
            overrideBrowserslist: ["last 3 versions"],
            cascade: true
         })
      )
      .pipe(webpCss(['.jpg', '.png']))
      .pipe(dest(path.build.css))
      .pipe(clean_css())
      .pipe(
         rename({
            extname: ".min.css"
         })
      )
      .pipe(dest(path.build.css))
      .pipe(browsersync.stream())
}
function js() {
   return gulp.src(['./#src/assets/js/main.js'])
      .pipe(concat('main.js'))
      .pipe(dest(path.build.js))
      .pipe(
         uglify()
      )
      .pipe(
         rename({
            extname: ".min.js"
         })
      )
      .pipe(dest(path.build.js))

      .pipe(browsersync.stream())
}
function images() {
   return src(path.src.img)
      .pipe(
         webp({
            quality: 70
         })
      )
      .pipe(dest(path.build.img))
      .pipe(src(path.src.img))
      .pipe(
         imagemin({
            progressive: true,
            svgPlugins: [{ removeViewBox: false }],
            interlaxed: true,
            optimizationLevel: 3
         })
      )
      .pipe(dest(path.build.img))
      .pipe(browsersync.stream())
}
function fonts(params) {
   src(path.src.fonts)
      .pipe(ttf2woff())
      .pipe(dest(path.build.fonts))
   return src(path.src.fonts)
      .pipe(ttf2woff2())
      .pipe(dest(path.build.fonts))
}
function fontsStyle(params) {

   let file_content = fs.readFileSync(source_folder + '/assets/styles/fonts.sass');
   if (file_content == '') {
      fs.writeFile(source_folder + '/assets/styles/fonts.sass', '', cb);
      return fs.readdir(path.build.fonts, function (err, items) {
         if (items) {
            let c_fontname;
            for (var i = 0; i < items.length; i++) {
               let fontname = items[i].split('.');
               fontname = fontname[0];
               if (c_fontname != fontname) {
                  fs.appendFile(source_folder + '/assets/styles/fonts.sass', '@include font("' + fontname + '", "' + fontname + '", "400", "normal")\r\n', cb);
               }
               c_fontname = fontname;
            }
         }
      })
   }
}

function cb() { }
function watchFiles(params) {
   gulp.watch([path.watch.html], html)
   gulp.watch([path.watch.css], css)
   gulp.watch([path.watch.js], js)
   gulp.watch([path.watch.img], images)
}
function clean(params) {
   cleanOnlyProjectFiles = [path.build.css, path.build.js, path.build.fonts, path.build.img, project_folder + "/**/*.html"]
   return del(cleanOnlyProjectFiles);

}
let build = gulp.series(clean, gulp.parallel(js, css, html, images, fonts), fontsStyle);
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
