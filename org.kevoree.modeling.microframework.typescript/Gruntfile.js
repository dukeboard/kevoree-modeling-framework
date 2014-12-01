module.exports = function(grunt) {
    grunt.initConfig({
        project: grunt.file.readJSON('package.json'),
        dir: {
            "source_ts": "src/main/ts",
            "source_test_ts": "src/test/ts",
            "target_js": "src/main/resources",
            "target_test_js": "target/test-classes",
            "target_report": "target/report"
        },
        typescript: {
            compile: {
                src: ['<%= dir.source_ts %>/**/*.ts'],
                dest: '<%= dir.target_js %>/<%= project.name %>.js',
                options: {
                    basePath: '<%= dir.source_ts %>',
                    target: 'es5',
                    declaration: true,
                    comments: true
                }
            },
            compile_test: {
                src: ['<%= dir.source_test_ts %>/**/*.ts','<%= dir.target_js %>/<%= project.name %>.d.ts'],
                dest: '<%= dir.target_test_js %>',
                options: {
                    basePath: '<%= dir.source_test_ts %>',
                    target: 'es5'
                }
            }
        }
    });
    // ----- Setup tasks
    grunt.loadNpmTasks('grunt-typescript');
    grunt.registerTask('default', ['typescript:compile','typescript:compile_test']);
};