'use strict'

const { createBTS } = require('btsc')
const { AK, SK, INSTANCE } = process.env

function table(name) {
    return createBTS(`${AK}:${SK}@gz:${INSTANCE}/${name}`)
}

exports.uploads = table('uploads')
exports.logs = table('logs')
exports.pictures = table('pictures')
exports.ads = table('ads')