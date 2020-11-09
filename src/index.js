import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';

import schemas from './schemas';
import resolvers from './resolvers';

import userModel from './models/userModel';
import postModel from './models/postModel';

import auth from './utils/jwt'

const app = express();
app.use(cors());

const server = new ApolloServer({
    typeDefs: schemas,
    resolvers,
    context: async ({ req }) => {
        if (req) {
            const me = await auth(req)

            return {
                me,
                models: {
                    userModel,
                    postModel,
                },
            };
        }
    },
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen(process.env.PORT, () => {
    mongoose.connect(process.env.MONGODB_URI);
    console.log(`🚀 Server listening on port ${process.env.PORT}`);
});
