const { z } = require("zod")


function SignupValidation(req, res, next) {
    const validation = z.object({
        email: z.string().min(3,"email is required").max(50,"Email must be 50 characters or less").email("Invalid email formate"),
        password: z.string().min(4,"Password required").max(20,"Password should be 20 character or less"),
        name: z.string().min(3,"Name required").max(30,"Name characated should 30 or less"),
        mobile: z.number().min(1).max(20)
    })
    const parseValidation = validation.safeParse(req.body)
    return res.json({
        message: "incorect format",
        error: parseValidation.error
    })
    next()
}
function SigninValidation(req, res, next){
    const validation = z.object({
        email: z.string().min(3,"email is required").max(50,"Email must be 50 characters or less").email("Invalid email formate"),
        password: z.string().min(4,"Password required").max(20,"Password should be 20 character or less")
    })
    const parseValidation = validation.safeParse(req.body)
    return res.status(404).json({
        message: "incorect format",
        error: parseValidation.error
    })
    next()
}



module.exports = {
    SignupValidation,
    SigninValidation
}