module.exports = {
    mutipleMongooseToObject: function (arr) {
        return arr.map((element) => element.toObject());
    },

    mongooseToOject: function (element) {
        return element.toObject();
    },
};
