const {
    concurrent,
    series
} = require('nps-utils')

module.exports = {
    scripts: {
        default: {
            description: 'run and watch the example',
            script: 'rollup -c rollup/es.js --watch',
        },
        commit: {
            description: 'commit using conventionnal changelog',
            script: 'git-cz',
        },
        coveralls: {
            description: 'upload coverage info to coverall.io',
            script: 'cat ./coverage/coverage.lcov | ./node_modules/coveralls/bin/coveralls.js',
        },
        clean: {
            description: 'clean useless temporary directories',
            script: concurrent({
                cleanTemp: 'rimraf .temp -rf',
                cleanBuild: 'rimraf dist -rf',
                cleanCoverage: 'rimraf coverage -rf'
            }),
        },
        lint: {
            description: 'lint the code with tslint',
            script: 'tslint "src/**/*.ts" -p tsconfig.json --fix',
        },
        prettier: {
            description: 'format the code using prettier',
            script: 'prettier --write \"src/**/*(*.ts|*.tsx)\"',
        },
        validate: {
            description: 'lint the code, run the test and build',
            script: concurrent.nps('lint', 'test.cover', 'build'),
        },
        build: {
            description: 'build the library',
            script: series(
                'rimraf dist -r',
                'mkdir dist',
                'NODE_ENV=production rollup -c rollup/cjs.js',
                'NODE_ENV=production rollup -c rollup/es.js'
            ),
        },
        test: {
            default: {
                description: 'run all the test once',
                script: 'NODE_ENV=test jest',
            },
            watch: {
                description: 'run in the amazingly intelligent Jest watch mode',
                script: 'NODE_ENV=test jest --watch',
            },
            cover: {
                description: 'run test with istanbul test coverage',
                script: series(
                    'NODE_ENV=test jest --coverage --updateSnapshot',
                    'node scripts/test/remap-coverage',
                    'rimraf .temp -r'
                ),
            },
        },
    },
}
