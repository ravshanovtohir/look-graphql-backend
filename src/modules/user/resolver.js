export default {
    Query: {
        users: (_, { userId }, { read }) => {
            return read("users").filter(user => userId ? user.userId == userId : true)
        }
    },

    //for mutations
    Mutation: {

        //mutation Adding new user
        addUser: (_, { username, contact }, { read, write }) => {
            const users = read("users")

            const newUser = {
                userId: users.length ? +users.at(-1).userId + 1 : 1,
                username,
                contact
            }

            users.push(newUser)
            write("users", users)

            return {
                status: 201,
                message: "The user created successfully!",
                data: newUser
            }

        },

        //mutation editing user
        editUser: (_, { userId, username }, { read, write }) => {
            const users = read("users")
            const user = users.find(el => el.userId == userId)

            if (user) {
                user.username = username
            }

            write("users", users)

            return {
                status: 201,
                message: "The user successfully edited",
                data: user
            }

        },

        //mutation deleting user
        deleteUser: (_, { userId }, { read, write }) => {
            const users = read("users")
            const addingUsers = users.filter(user => user.userId != userId)

            write("users", addingUsers)

            return {
                status: 201,
                message: "The user successfully deleted",
            }
        }
    }
}