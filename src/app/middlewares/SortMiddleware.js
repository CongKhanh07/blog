function sortMiddleware(req, res, next) {

    //Dùng res.locals để truyền object to view
    res.locals._sort = {
        enabled: false,
        type: 'default'
    }

    if(req.query.hasOwnProperty('_sort')) {
        Object.assign(res.locals._sort, {
            enabled: true,
            type: req.query.type,
            column: req.query.column
        })
    }

    next()
}

module.exports = sortMiddleware;