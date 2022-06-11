const getPost = async (req, res, next) => {
    res.send({
        id: 1,
        title: 'My First Post',
        description: 'Yeah its my first post in my life'
    })
}


module.exports = {
    getPost
}