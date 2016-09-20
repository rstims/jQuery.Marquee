module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        babel: {
            options: {
                presets: ['es2015']
            },
            dist: {
                files: {
                    'dist/marquee.js': 'src/index.js'
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n/*! Version <%= pkg.version %> */\n'
            },
            dist: {
                files: {
                    'dist/marquee.min.js': 'dist/marquee.js'
                }
            }
        },
        copy: {
            main: {
                src: 'dist/marquee.min.js',
                dest: '/Applications/MAMP/htdocs/vcusports-v2/wordpress/wp-content/themes/vcusports/assets/js/marquee.min.js',
            },
        },
        webpack: {
            dist: {
                // webpack options
                entry: "./src/index.js",
                output: {
                    path: "./dist",
                    filename: "marquee.js",
                    library: 'marquee',
                    libraryTarget: 'umd'
                },
                progress: true, // Don't show progress
                // Defaults to true

                failOnError: true, // don't report error to grunt if webpack find errors
                module: {
                    loaders: [
                        {
                            test: /\.js$/,
                            exclude: /node_modules/,
                            loader: 'babel'
                        },
                    ],
                },
            }
        }
    });
    grunt.registerTask('default', ['webpack', 'uglify', 'copy']);
}