import path from "path"
import fs, { write } from "fs"

export default {
    read: (fileName) => {
        const data = fs.readFileSync(path.join(process.cwd(), "src", "database", fileName + ".json"), "UTF-8")
        return JSON.parse(data) || []
    },
    write: (fileName, data) => {
        fs.writeFileSync(path.join(process.cwd(), "src", "database", fileName + ".json"), JSON.stringify(data, null, 4))
    }
}