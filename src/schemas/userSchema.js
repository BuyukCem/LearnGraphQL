import { gql } from 'apollo-server';

export default gql`
    type User {
        id: ID!
        name: String!
        posts: [Post!]!
    }

    type Token {
        token: String!
    }
    
    # definitions des champs
    # Type de request possible donc chaque chmaps c'est une request possible lors est pas important
    extend type Query {
        # () declaration des parametres, c'est traité comme des objets 
        user(id: ID!): User!
        login(name: String!, password: String!): Token!
        
    }
    # Modofier les donnée 
    extend type Mutation {
        createUser(name: String!, password: String!): User!
    }
    # subsciption Donnée en temps reele  depuis serveur 
    extend type subsciption{
        
    }
`;
