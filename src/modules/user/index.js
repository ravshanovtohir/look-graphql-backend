import resolvers from "./resolver.js";
import { fileURLToPath } from "url";
import { gql } from "apollo-server";
import path from "path";
import fs from "fs"

const __dirname = path.dirname(fileURLToPath(
    import.meta.url
))

const typeDefs = fs.readFileSync(path.join(__dirname, "schema.gql"), "UTF-8")

export default {
    resolvers,
    typeDefs: gql `${typeDefs}`
}