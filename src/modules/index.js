import { makeExecutableSchema } from "@graphql-tools/schema";

import userModule from "./user/index.js"
import foodModule from "./food/index.js"
import orderModule from "./order/index.js"

export const schema = makeExecutableSchema({
    typeDefs: [
        userModule.typeDefs,
        foodModule.typeDefs,
        orderModule.typeDefs
    ],
    resolvers: [
        userModule.resolvers,
        foodModule.resolvers,
        orderModule.resolvers,
    ]
})