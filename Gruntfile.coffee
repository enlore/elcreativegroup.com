module.exports = (grunt) ->
    grunt.loadNpmTasks "grunt-contrib-stylus"

    grunt.loadNpmTasks "grunt-contrib-watch"
    grunt.loadNpmTasks "grunt-nodemon"
    grunt.loadNpmTasks "grunt-concurrent"

    grunt.registerTask "default", ["stylus", "concurrent:dev"]

    grunt.initConfig
        stylus:
            compile:
                files:
                    "static/css/main.css": ["styl/main.styl"]

        watch:
            stylus:
                files: ["styl/**/*.styl"]
                tasks: ["stylus:compile"]

        nodemon:
            options:
                ignore: ["node_modules/**"]

            dev:
                script: "index.js"
                env:
                    PORT: process.env.PORT or 3000
                    HOST: process.env.HOST or "127.0.0.1"

        concurrent:
            options:
                logConcurrentOutput: true

            dev: ["watch", "nodemon"]
