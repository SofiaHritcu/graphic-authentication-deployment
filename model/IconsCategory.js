const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create the IconsCategory Schema
const IconsCategorySchema = new Schema({
    category: {
        type: String,
        required: true,
    },
});

module.exports = IconsCategory = mongoose.model('icons', IconsCategorySchema);
