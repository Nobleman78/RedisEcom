import User from "../model/user.model.js"

export const signup = async (req, res) => {
    const { email, password, name } = req.body
    try {
        const userExist = await User.findOne({ email })

        if (userExist) {
            return res.status(400).json({ message: "User already exits" })
        }
        const user = await User.create({ name, email, password })
        res.status(201).json({ user, message: "User create successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}
export const login = async (req, res) => {
    res.send("Login")
}
export const logout = async (req, res) => {
    res.send("Logout")
}