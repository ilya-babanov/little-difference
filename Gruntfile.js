module.exports = function(grunt) {

	grunt.initConfig({
		requirejs: {
			compile: {
				options: {
					baseUrl: "client/src",
					paths: {
						react: "empty:",
						signals: '../dist/libs/signals.min',
						oboe: '../dist/libs/oboe-browser.min',
						marked: '../dist/libs/marked.min',
						router: '../dist/libs/director.min'
					},
					shim: {
						router: {exports: 'Router'}
					},
					name: "main",
					optimize: 'uglify2',
					preserveLicenseComments: false,
					generateSourceMaps: true,
					out: "client/dist/src/min.js"
				}
			}
		},

		htmlmin: {
			main: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					'client/dist/index.html': 'client/index.html',
				}
			}
		},

		concat: {
			css: {
				src: ['client/src/**/*.css'],
				dest: 'client/dist/styles/styles.css'
			}
		},

		cssmin: {
			main: {
				src: '<%= concat.css.dest %>',
				dest: 'client/dist/styles/styles.css'
			}
		},

		watch: {
			js: {
				files: 'client/src/**/*.js',
				tasks: ['requirejs']
			},
			html: {
				files: 'client/index.html',
				tasks: ['htmlmin']
			},
			css: {
				files: '<%= concat.css.src %>',
				tasks: ['concat', 'cssmin']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-css');
	grunt.loadNpmTasks('grunt-contrib-concat');
	//grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['htmlmin', 'requirejs', 'concat', 'cssmin']);

};
