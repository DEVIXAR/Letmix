module.exports = function( grunt ) {
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        copy: {
            main: {
                files: [
                    { expand: true, cwd: "src/", src: ['letmix.js'], dest: 'dist/' },
                ],
            },
            libs: {
                files: [
                    { expand: true,
                        cwd: "node_modules/jquery/dist/", src: ['jquery.min.js'], dest: 'lib/' },
                    { expand: true,
                        cwd: "node_modules/bootstrap/dist/css/", src: ['bootstrap.min.css'], dest: 'lib/' },
                ]
            }
        },

        uglify: {
            options: {
                banner: '/*! \nCopyright (c) 2016, <%= pkg.name %> - v<%= pkg.version %>. All rights reserved.' +
                '\n<%= grunt.template.today("yyyy-mm-dd") %>' +
                '\ndev Didyk Mikhail (DEVIXAR).' +
                '\nFor licensing, see LICENSE.md' +
                '\nhttp://devixar.com */\n'
            },

            build: {
                src: 'src/letmix.js',
                dest: 'dist/letmix.min.js'
            }
        },

        watch: {
            scripts: {
                files: ['src/*.js'],
                tasks: ['copy', 'uglify'],
                options: {
                    spawn: false,
                },
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch']);
}