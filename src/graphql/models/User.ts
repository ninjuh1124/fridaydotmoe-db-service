import { objectType } from 'nexus';
import { Comment } from '.';

export const User = objectType({
	name: 'User',
	definition(t) {
		t.nonNull.string('fullname');
		t.nonNull.string('name');
		t.string('author_flair_type');
		t.string('author_flair_template_id');
		t.string('author_flair_richtext'); // stringified json array
		t.string('author_flair_text');
		t.string('author_flair_background_color');
		t.list.field('comments', {
			type: Comment,
			resolve: (root, _args, context) => {
				return context.db.comment.findMany({
					where: { author_fullname: root.fullname },
				});
			},
		});
	},
});
