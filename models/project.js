'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ProjectSchema = Schema({
    name: String,
    picture: String,
    // price: { type: Number, default: 0},
    category: { type: String, enum: ['PHP', 'Vue', 'Wordpress', 'JavaScript']},
    description: String
})

module.exports = mongoose.model('Project', ProjectSchema);
