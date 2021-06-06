const shell = require('shelljs')
shell.cp('-R', 'devops/_redirects', 'dist/_redirects') // netlify not working for dynamic urls

shell.exec(
  'netlify deploy --prod --dir dist --site d4e77195-ef61-4e2a-8b66-c78ae0eb3dde --open'
)
