import { objectType } from 'nexus';
import { User } from '.';

export const Thread = objectType({
	name: 'Thread',
	definition: (t) => {
		t.nonNull.string('name');
		t.nonNull.string('author_fullname');
		t.nonNull.string('permalink');
		t.nonNull.string('url');
		t.nonNull.int('created');
		t.nonNull.int('created_utc');
		t.string('body');

		t.field('author', {
			type: User.name,
			resolve: (root, _args, context) => {
				return context.db.user.findUnique({
					where: { fullname: root.author_fullname },
				});
			},
		});
	},
});
