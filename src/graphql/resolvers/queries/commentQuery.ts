import { extendType, nonNull, stringArg } from 'nexus';
import { Comment } from '../../models';

export const CommentQuery = extendType({
	type: 'Query',
	definition: (type) => {
		type.nonNull.list.nonNull.field('listComments', {
			type: Comment.name,
			resolve(_root, _args, context) {
				return context.db.comment.findMany();
			},
		});
	},
});
