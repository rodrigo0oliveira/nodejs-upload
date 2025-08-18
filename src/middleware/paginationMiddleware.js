const paginationMiddleware = async (req,res,next) => {
    var { limit = 10, page = 1, sort = "_id:-1"} = req.query;

    limit = Number(limit);
    page = Number(page);

    const fieldsSort = sort.split(":");

    const field = fieldsSort[0];
    const order = Number(fieldsSort[1]);

    const result = req.resultado;

    const paginationResult =  await result.find({})
        .limit(limit)
        .skip((limit *(page - 1)))
        .sort({[field]:order});

    res.status(200).send({data:paginationResult});

    next();
}

module.exports = paginationMiddleware;