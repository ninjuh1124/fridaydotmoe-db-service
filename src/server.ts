import { ApolloServer } from 'apollo-server';
import { GraphQLSchema } from 'graphql';
import { context } from './context';
import { schema } from './schema';

export const server = new ApolloServer({
	schema: schema as unknown as GraphQLSchema,
	context: context,
});
