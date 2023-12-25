const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Import plugin mongoose-slug-generator
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)

//Import plugin soft-delete
var mongooseDelete = require('mongoose-delete');

const Course = new Schema({
    name: { type: String },
    description: { type: String },
    image: { type: String },
    videoId: {type: String},
    level: {type: String},
    slug: {type: String, slug: 'name', unique: true},
}, {
    timestamps: true
});

Course.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true })

module.exports = mongoose.model('Course', Course);
