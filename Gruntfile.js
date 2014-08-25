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
						router: '../dist/libs/director.min',
						i18njs: '../dist/libs/i18n', // @see http://i18njs.com,
						i18n: 'services/i18n'
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
			},
			i18n: {
				files: 'client/i18n/**/*.json',
				tasks: ['i18n']
			}
		}
	});

	grunt.registerTask('i18n', 'Process i18n files', function () {
		var langs = ['en', 'ru'];
		var locales = langs.map(function (lang) {
			return grunt.file.readJSON('client/i18n/'+lang+'/main.json');
		});
		var defLocale = locales[0];

		var locale, lang, i;

		// match values with default locale
		for (var key in defLocale.values) {
			for (i = 0; i < locales.length; i ++) {
				locale = locales[i];
				if (!locale.values[key]) {
					locale.values[key] = defLocale.values[key];
				}
			}
		}

		//TODO match contexts

		//write locales to client/dist/i18n/
		for (i = 0; i < locales.length; i ++) {
			locale = locales[i];
			lang = langs[i];
			grunt.file.write('client/dist/i18n/'+lang+'/main.json', JSON.stringify(locale));
		}
	});


	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-css');
	grunt.loadNpmTasks('grunt-contrib-concat');
	//grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['htmlmin', 'requirejs', 'concat', 'cssmin', 'i18n']);

};
