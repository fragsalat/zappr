import nconf from 'nconf'
import yaml from 'js-yaml'
import fs from 'fs'

export default nconf.use('memory')
                    .argv()
                    .env()
                    .add('system', {type: 'literal', store: yaml.safeLoad(fs.readFileSync('./status-page/config.yaml', 'utf8'))})
