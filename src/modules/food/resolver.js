export default {
    Query: {
        foods: (_, { foodId }, { read }) => {
            return read("foods").filter(food => foodId ? food.foodId == foodId : true)
        }
    },

    //for mutations
    Mutation: {
        //mutation Adding new food
        addFood: (_, { foodname, foodImg }, { read, write }) => {
            const foods = read("foods")

            const newFood = {
                foodId: foods.length ? +foods.at(-1).foodId + 1 : 1,
                foodname,
                foodImg: foodImg ? foodImg : null
            }

            foods.push(newFood)
            write("foods", foods)

            return {
                status: 201,
                message: "The food created successfully!",
                data: newFood
            }
        },
        //mutation editing food
        editFood: (_, { foodId, foodname }, { read, write }) => {
            const foods = read("foods")
            const food = foods.find(el => el.foodId == foodId)

            if (food) {
                food.foodname = foodname
            }

            write("foods", foods)

            return {
                status: 201,
                message: "The food successfully edited",
                data: food
            }

        },

        //mutation deleting food
        deleteFood: (_, { foodId }, { read, write }) => {
            const foods = read("foods")
            const addingFoods = foods.filter(food => food.foodId != foodId)

            write("foods", addingFoods)

            return {
                status: 201,
                message: "The food successfully deleted",
            }
        }
    }

}