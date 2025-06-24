import Recipe from "../models/recipe.model.js";
export const getAllRecipes = async (req, res, next) => {
    try {
        const _id = req.myUser ? req.myUser._id : null;
        const { search, limit, page } = req.query;
        let query = {};
        let conditions = [];
        if (_id) {
            conditions.push({
                $or: [
                    { isPrivate: false },
                    { isPrivate: true, "contributor._id": _id }
                ]
            });
        } else {
            conditions.push({ isPrivate: false });
        }
        if (search) {
            conditions.push({
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { ingredients: { $regex: search, $options: 'i' } },
                    { desc: { $regex: search, $options: 'i' } }
                ]
            })
        }
        if (conditions.length > 0) {
            query.$and = conditions
        }
        const recipes = await Recipe.find(query)
            .sort({ publicationDate: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        const total = await Recipe.countDocuments(query);
        res.status(200).json({
            recipes,
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / limit)
        });

    } catch (error) {
        next({ message: error.message });
    }
}

export const getMyRecipes = async (req, res, next) => {
    try {
        const _id = req.myUser.id;
        const query = { "contributor._id": _id }
        const recipes = await Recipe.find(query);
        const total = await Recipe.countDocuments(query);
        res.status(200).json({
            recipes,
            total,
        });
    } catch (error) {
        next({ message: error.message });
    }
}
//export const create