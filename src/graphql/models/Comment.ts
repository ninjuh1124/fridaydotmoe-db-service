import { objectType } from 'nexus';
import { User } from '.';

export const Comment = objectType({
	name: 'Comment',
	definition: (t) => {
		t.nonNull.string('link_id');
		t.nonNull.string('id');
		t.nonNull.string('author_fullname');
		t.nonNull.string('parent_id');
		t.nonNull.string('body');
		t.nonNull.boolean('edited');
		t.nonNull.string('permalink');
		t.nonNull.string('name');
		t.nonNull.int('created');
		t.nonNull.int('created_utc');
		t.nonNull.int('depth');
		t.field('author', {
			type: User,
			resolve: (root, _args, context) => {
				return context.db.user.findUnique({
					where: { fullname: root.author_fullname },
				});
			},
		});
	},
});
