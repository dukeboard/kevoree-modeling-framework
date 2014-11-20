module.exports = function (grunt) {
    grunt.initConfig({
        project: grunt.file.readJSON('package.json'),
        dir: {
            "source_ts": "target/js",
            "target": "target/classes"
        },
        typescript: {
            compile: {
                src: ['<%= dir.source_ts %>/**/*.ts'],
                dest: '<%= dir.target %>/<%= project.name %>.js',
                options: {
                    basePath: '<%= dir.source_ts %>',
                    target: 'es5',
                    declaration: true,
                    comments: true
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-typescript');
    grunt.registerTask('default', ['typescript:compile']);
};