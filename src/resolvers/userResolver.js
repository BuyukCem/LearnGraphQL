import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';

export default {
    //Parent: This is the return value of the resolver for this field's parent
    // (the resolver for a parent field always executes before the resolvers for
    // that field's children).

    // args: This object contains all GraphQL arguments provided for this field.

    // context: This object is shared across all resolvers that execute for a particular
    // operation. Use this to share per-operation state, such as authentication
    // information and access to data sources.

    //info: This contains information about the execution state of the operation
    // (used only in advanced cases).

    Query: {
        user: async (parent, { id }, { models: { userModel }, me }, info) => {
            if (!me) {
                throw new AuthenticationError('You are not authenticated');
            }
            const user = await userModel.findById({ _id: id }).exec();
            return user;
        },
        login: async (parent, { name, password }, { models: { userModel } }, info) => {
            console.log("Parent: "+parent);
            const user = await userModel.findOne({ name }).exec();

            if (!user) {
                throw new AuthenticationError('Invalid credentials');
            }

            const matchPasswords = bcrypt.compareSync(password, user.password);

            if (!matchPasswords) {
                throw new AuthenticationError('Invalid credentials');
            }

            const token = jwt.sign({ id: user.id }, 'riddlemethis', { expiresIn: 24 * 10 * 50 });

            return {
                token,
            };
        },
    },
    Mutation: {
        createUser: async (parent, { name, password }, { models: { userModel } }, info) => {
            const user = await userModel.create({ name, password });
            return user;
        },
    },
    User: {
        posts: async ({ id }, args, { models: { postModel } }, info) => {
            const posts = await postModel.find({ author: id }).exec();
            return posts;
        },
    },
};
