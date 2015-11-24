/*jslint white:true */

/* Install All Packages */
    // npm install gulp gulp-sass browser-sync --save-dev
    // bower install polymer --save

var gulp        = require('gulp');
var sass        = require('gulp-sass');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

var baseDir     = 'app';
var distDir     = 'dist';

/* Prepare Browser-sync for localhost */
gulp.task('browser-sync', function() {
    'use strict';

    browserSync.init(['css/*.css', 'js/*.js'], {
        proxy: 'polymer2.dev',
        open: false,
        browser: ['chrome']
    });
});

/* Compile scss */
gulp.task('sass', function () {
    'use strict';

    gulp.src([
        'resources/assets/sass/app.scss'
    ])
        .pipe(sass())
        .pipe(gulp.dest(baseDir + '/css'))
        /* Reload the browser CSS after every change */
        .pipe(reload({stream:true}));
});

/* Reload browser after file changes */
gulp.task('bs-reload', function () {
    'use strict';

    browserSync.reload();
});

/* Watch scss and html files */
gulp.task('default', ['sass', 'browser-sync'], function () {
    'use strict';

    /* Watch scss, run the sass task on change. */
    gulp.watch(['resources/assets/sass/**/*.scss'], ['sass']);
    /* Watch .html files, run the bs-reload task on change. */
    gulp.watch(['*.html', '**/*.html', '**/**/*.html',], ['bs-reload']);
});