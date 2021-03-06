/**
 * init run json2ts to generate schemas/config.ts
 */

import { Json2ts } from '../json2ts/runner';
import { ToolsLoader } from './loader';

const loaderConfig = require('./json2ts.config.json');
const runner = new ToolsLoader(loaderConfig);

runner.ajv.addSchema(require('../schemas/arukas'));
runner.ajv.addSchema(require('../schemas/city-mobile-sections'));
runner.ajv.addSchema(require('../schemas/go-const-ts'));
runner.ajv.addSchema(require('../schemas/go-tag-apis'));
runner.ajv.addSchema(require('../schemas/kuaidi100'));
runner.ajv.addSchema(require('../schemas/svg-patterns'));
runner.ajv.addSchema(require('../schemas/to-mpeg4'));
runner.ajv.addSchema(require('../schemas/ts-trans'));

runner.registry(Json2ts.forLoader());

const validate = runner.ajv.getSchema('tools-loader');
const valid = validate(loaderConfig);
if (!valid) {
  console.error(validate.errors);
  process.exit(1);
}

runner.run().catch(err => console.error(err));
