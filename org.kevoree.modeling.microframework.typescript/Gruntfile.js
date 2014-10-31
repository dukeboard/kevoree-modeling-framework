module.exports = function(grunt) {
    grunt.initConfig({
        // ----- Environment
        // read in some metadata from project descriptor
        project: grunt.file.readJSON('package.json'),
        // define some directories to be used during build
        dir: {
            // location where TypeScript source files are located
            "source_ts": "src/main/ts",
            // location where TypeScript/Jasmine test files are located
            "source_test_ts": "src/test/ts",
            // location where all build files shall be placed
            "target": "target",
            // location to place (compiled) javascript files
            "target_js": "target/js",
            // location to place (compiles) javascript test files
            "target_test_js": "target/js-test",
            // location to place documentation, etc.
            "target_report": "target/report"
        },
        // ----- TypeScript compilation
        //  See https://npmjs.org/package/grunt-typescript
        typescript: {
            // Compiles the code into a single file. Also generates a typescript declaration file
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
            // Compiles the tests.
            compile_test: {
                src: ['<%= dir.source_test_ts %>/**/*.ts'],
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