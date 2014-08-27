module.exports = function(grunt) {

	grunt.initConfig({
		requirejs: {
			compile: {
				options: {
					baseUrl: "client/src",
					paths: {
						react: "empty:",
						signals: '../libs/signals.min',
						oboe: '../libs/oboe-browser.min',
						marked: '../libs/marked.min',
						router: '../libs/director.min',
						i18njs: '../libs/i18n', // @see http://i18njs.com,
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

		compress: {
			options: {
				mode: 'gzip'
			},
			js: {
				files: [{
					expand: true,
					cwd: 'client/dist/',
					src: ['**/*.js', '!**/*.min.js'],
					dest: 'client/dist/',
					ext: '.js.gz'
				},{
					expand: true,
					cwd: 'client/dist/',
					src: ['**/*.min.js'],
					dest: 'client/dist/',
					ext: '.min.js.gz'
				}]
			},
			css: {
				files: [{
					expand: true,
					cwd: 'client/dist/',
					src: ['**/*.css'],
					dest: 'client/dist/',
					ext: '.css.gz'
				}]
			},
			html: {
				files: [{
					expand: true,
					cwd: 'client/dist/',
					src: ['**/*.html'],
					dest: 'client/dist/',
					ext: '.html.gz'
				}]
			},
			i18n: {
				files: [{
					expand: true,
					cwd: 'client/dist/',
					src: ['**/*.json'],
					dest: 'client/dist/',
					ext: '.json.gz'
				}]
			}
		},

		watch: {
			js: {
				files: 'client/src/**/*.js',
				tasks: ['requirejs', 'compress:js']
			},
			html: {
				files: 'client/index.html',
				tasks: ['htmlmin', 'compress:html']
			},
			css: {
				files: '<%= concat.css.src %>',
				tasks: ['concat:css', 'cssmin', 'compress:css']
			},
			i18n: {
				files: 'client/i18n/**/*.json',
				tasks: ['i18n', 'compress:i18n']
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
					grunt.log.writeln('----------------== WARNING ==------------------');
					grunt.log.writeln('Key "'+key+'" not found in locale "'+langs[i]+'"; create this key with value from default locale');
					grunt.log.writeln('-----------------------------------------------');
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
	grunt.loadNpmTasks('grunt-contrib-compress');
	//grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['htmlmin', 'requirejs', 'concat', 'cssmin', 'i18n']);

};
