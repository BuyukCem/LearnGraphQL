import {makeExecutableSchema} from "graphql-tools";

describe('My Test Cases', () => {
    // array of all test cases, just 1 for now
    const cases = [allMoviesTestCase]
    // reading the actual schema
    const typeDefs = fs.readFileSync('../models/postModel', 'utf8')
    // make the actual schema and resolvers executable
    const schema = makeExecutableSchema({ typeDefs, resolvers })

    // running the test for each case in the cases array
    cases.forEach(obj => {
        const { id, query, variables, context, expected } = obj

        test(`query: ${id}`, async () =>
            const result = await graphql(schema, query, null, context, variables)
            return expect(result).toEqual(expected)
        })
    })
})