'use strict'

const { get, save } = require('../scrape')

exports.callback = async function (url) {
    let html = await get(url)
    let list = html.match(
        /img-wrapper.*?(https:\/\/\S+?.sinaimg.cn\/orj\d+?\/\S+?\.jpg)/gm
    ).map(url => url.match(/http.*/)[0])
    return await save(list)
}

exports.pattern = /^https:\/\/oasis\.weibo\.cn\/v1\/h5\/share\?sid=\d+/