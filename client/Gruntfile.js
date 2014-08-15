module.exports = function(grunt) {
	grunt.initConfig({
		concat: {
			jsUser: {
				src: [
					'client/user/app.js',
					'client/common/**/*.js',
					'client/user/services/**/*.js',
					'client/user/controllers/**/*.js',
					'client/user/modules/**/*.js'
				],
				dest: 'client/build/src/scripts.js'
			},
			jsHome: {
				src: [
					'client/home/app.js',
					'client/common/**/*.js',
					'client/home/services/**/*.js',
					'client/home/controllers/**/*.js',
					'client/home/modules/**/*.js'
				],
				dest: 'client/build/home/scripts.js'
			}
		},
		autoprefixer: {
			user: {
				src: [
					'client/common/**/*.css',
					'client/user/style.css',
					'client/user/styles/**/*.css',
					'client/user/modules/**/*.css'
				],
				dest: 'client/build/src/styles.css'
			},
			home: {
				src: [
					'client/common/**/*.css',
					'client/home/style.css',
					'client/home/styles/**/*.css',
					'client/home/modules/**/*.css'
				],
				dest: 'client/build/home/styles.css'
			}
		},
		cssmin: {
			user: {
				src: '<%= autoprefixer.user.dest %>',
				dest: 'client/build/src/styles.min.css'
			},
			home: {
				src: '<%= autoprefixer.home.dest %>',
				dest: 'client/build/home/styles.min.css'
			}
		},
		uglify: {
			user: {
				options: {
					sourceMap: 'client/build/src/source-map.js'
				},
				files: {
					'client/build/src/scripts.min.js': [
						'<%= concat.jsUser.src %>'
					]
				}
			},
			home: {
				options: {
					sourceMap: 'client/build/home/source-map.js'
				},
				files: {
					'client/build/home/scripts.min.js': [
						'<%= concat.jsHome.src %>'
					]
				}
			}
		},
		jade: {
			user: {
				src: 'client/user/index.jade',
				dest: 'client/build/src/index.html'
			},
			home: {
				src: 'client/home/index.jade',
				dest: 'client/build/home/index.html'
			}
		},
		watch: {
			jsUser: {
				files: '<%= concat.jsUser.src %>',
				tasks: 'concat:jsUser'
			},
			jsHome: {
				files: '<%= concat.jsHome.src %>',
				tasks: 'concat:jsHome'
			},
			cssUser: {
				files: '<%= autoprefixer.user.src %>',
				tasks: ['autoprefixer:user', 'cssmin:user']
			},
			cssHome: {
				files: '<%= autoprefixer.home.src %>',
				tasks: ['autoprefixer:home', 'cssmin:home']
			},
			jadeUser: {
				files: [
					'client/common/**/*.jade',
					'client/user/index.jade',
					'client/user/modules/**/*.jade'
				],
				tasks: 'jade:user'
			},
			jadeHome: {
				files: [
					'client/common/**/*.jade',
					'client/home/index.jade',
					'client/home/modules/**/*.jade'
				],
				tasks: 'jade:home'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-css');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-autoprefixer');

	grunt.registerTask('default', ['concat', 'uglify', 'autoprefixer', 'cssmin', 'jade']);
};
