module.exports = function (req,res,next) {
    const role = req.user.role
    if(role !== "Student") return res.status(403).send('Access denied')

    next()
}

