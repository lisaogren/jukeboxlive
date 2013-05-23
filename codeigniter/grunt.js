/*global module:false*/
module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		meta: {
			version: '0.1.0',
			banner: '/*! JukeBox Live - v<%= meta.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
				'* http://jukeboxlive.com/\n' +
				'* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
				'Carl Ogren; Free Beer License */'
		},
		qunit: {
			files: ['tests/**/.html']
		},
		lint: {
			files: [
				'grunt.js',

				// main app
				'static/js/app.js',
				// 'static/js/common.js',

				// band app module
				'static/js/modules/band-app/band-app.js'
			]
		},
		concat: {
			dist: {
				src: [
					'<banner:meta.banner>',
					// '<file_strip_banner:static/js/app.js>',
					'static/js/app.js',
					'static/js/common.js',
					'static/js/modules/band-app/band-app.js'
				],
				dest: 'static/js/build.js'
			}
		},
		min: {
			dist: {
				src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
				dest: 'static/js/build.min.js'
			}
		},
		watch: {
			files: '<config:lint.files>',
			tasks: 'lint qunit'
		},
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				immed: false,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				browser: true,
				devel: true
			},
			globals: {
				jQuery: true,
				JBL: true,
				Backbone: true,
				log: true
			}
		},
		uglify: {}
	});

	// Default task.
	grunt.registerTask('default', 'lint concat min');

};
