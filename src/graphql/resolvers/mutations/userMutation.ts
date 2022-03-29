import { extendType, inputObjectType, nonNull } from 'nexus';
import { User } from '../../models';

export const UserMutation = extendType({
	type: 'Mutation',
	definition: (type) => {
		type.field('createUser', {
			type: User.name,
			args: {
				data: nonNull(UserInput),
			},
			resolve: (_root, args, context) => {
				const { data } = args;
				return context.db.user.create({
					data: {
						fullname: data.fullname,
						name: data.name,
						author_flair_type: data.author_flair_type,
						author_flair_template_id: data.author_flair_template_id,
						author_flair_richtext: data.author_flair_richtext,
						author_flair_text: data.author_flair_text,
						author_flair_background_color:
							data.author_flair_background_color,
					},
				});
			},
		});
	},
});

export const UserInput = inputObjectType({
	name: 'UserInput',
	definition: (t) => {
		t.nonNull.string('fullname');
		t.nonNull.string('name');
		t.string('author_flair_type');
		t.string('author_flair_template_id');
		t.string('author_flair_richtext');
		t.string('author_flair_text');
		t.string('author_flair_background_color');
	},
});
