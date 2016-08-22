module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            main: {
                expand: true,
                cwd: 'assets/js',
                src: '**/*.js',
                dest: 'js',
                ext: '.min.js'
            }
        },
        cssmin: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'assets/css',
                    src: ['*.css'],
                    dest: 'css',
                    ext: '.min.css'
                }]
            }
        },
        less: {
            expanded: {
                options: {
                    paths: ["assets/less"]
                },
                files: {
                    "css/clean-blog.css": "assets/less/clean-blog.less"
                }
            },
            minified: {
                options: {
                    paths: ["assets/less"],
                    cleancss: true
                },
                files: {
                    "css/clean-blog.min.css": "assets/less/clean-blog.less"
                }
            }
        },
        imagemin: {
            main: {
                options: {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    cwd: 'assets/img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'img/'
                }]
            }
        },
        banner: '/*!\n' +
            ' * <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license %> (https://spdx.org/licenses/<%= pkg.license %>)\n' +
            ' */\n',
        usebanner: {
            main: {
                options: {
                    position: 'top',
                    banner: '<%= banner %>',
                    linebreak: true
                },
                files: {
                    src: ['css/*.css', 'js/*.js']
                }
            }
        },
        watch: {
            scripts: {
                cwd: 'assets/js/',
                files: ['**/*.js'],
                tasks: ['newer:uglify'],
                options: {
                    spawn: false
                }
            },
            styles: {
                cwd: 'assets/css/',
                files: ['**/*.css'],
                tasks: ['newer:cssmin'],
                options: {
                    spawn: false
                }
            },
            less: {
                cwd: 'assets/less/',
                files: ['**/*.less'],
                tasks: ['less'],
                opetions: {
                    spawn: false
                }
            },
            images: {
                cwd: 'assets/img/',
                files: ['**/*.{png,jpg,gif}'],
                tasks: ['newer:imagemin'],
                options: {
                    spawn: false
                }
            }
        }
    });

    // Load the plugins.
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-banner');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['newer:uglify', 'newer:less', 'newer:cssmin', 'newer:imagemin', 'newer:usebanner']);

};
