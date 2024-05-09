# Install wdio
- 'npm init wdio .'

# package.json
- check "type": "module"

# tsconfig-ison
- check '"module": "ESNext"'
- check '"resolveJsonModule": true'
- add '"esModuleInterop": true,'
- change '"strict": false'

# wdio.conf.ts
- check 'project: "./tsconfig.json"'
- add '${process.cwd()}/test/features/**/*.feature'
- add './test/features/step-definitions/*.ts'