import { makeSchema } from 'nexus';
import { join } from 'path';
import * as types from './graphql';

export const schema = makeSchema({
	types,
	outputs: {
		typegen: join(__dirname, '__generated__', 'nexus-typegen.ts'),
		schema: join(__dirname, '__generated__', 'schema.graphql'),
	},
	contextType: {
		module: join(__dirname, './context.ts'),
		export: 'Context',
	},
});
