module.exports = (grunt) ->
    grunt.loadNpmTasks "grunt-contrib-stylus"
    grunt.loadNpmTasks "grunt-contrib-watch"

    grunt.registerTask "default", ["stylus", "watch"]

    grunt.initConfig
        stylus:
            compile:
                files:
                    "static/css/main.css": ["styl/main.styl"]

        watch:
            stylus:
                files: ["styl/**/*.styl"]
                tasks: ["stylus:compile"]
