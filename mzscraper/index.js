'use strict'

const assert = require('assert')
const { reducer } = require('./provider')
const { setLog } = require('./scrape')

exports.handler = async (event, ctx, callback) => {
    let data = eventTransform(event)
    Object.keys(data).forEach(key => {
        if (data[key] instanceof Array) {
            data[key] = data[key].join(';')
        }
    })
    if (typeof data.url !== 'string') {
        callback(new Error('Invalid url'))
    }
    let now = Date.now()
    try {
        let result = await reducer(data.url)
        await setLog({
            used: Date.now() - now,
            message: `从${data.url}采集了${result.count}条图片`
        })
        callback(null, Object.assign({ used: Date.now() - now }, result))
    } catch (error) {
        callback(error)
    }
}

function eventTransform(event) {
    if (typeof event.httpMethod === 'string') {
        if (event.httpMethod === 'GET') {
            return event.queryString
        }
        return typeof event.body === 'string' ?
            JSON.parse(event.body) :
            event.body
    } else {
        return event
    }
}

if (require.main.filename === __filename) {
    exports.handler({
        url: 'https://oasis.weibo.cn/v1/h5/share?sid=4432734397036137'
    }, {}, (err, res) => {
        console.log('%j', res)
    })
}