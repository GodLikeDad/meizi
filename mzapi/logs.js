'use strict'

const { logs } = require('./tables')
const { createHash } = require('crypto')
const md5 = s => createHash('md5').update(s).digest('hex')
const MAX = parseInt('vvvvvvv', 32)

exports.getLogs = async ({ index }) => {
    index = index || '0'
    return {
        list: (await logs.scan(index, null, 20)).map(item => {
            let time = parseInt(item._key.slice(0, 7), 32)
            time = new Date((MAX - time) * 1000)
            return { ...item, time }
        })
    }
}

exports.setLog = async event => {
    let rowkey = parseInt(Date.now() / 1000)
    rowkey = (MAX - rowkey).toString(32)
    delete event.api
    rowkey += md5(JSON.stringify(event)).slice(0, 4)
    return await logs.put(rowkey, event)
}

exports.test = async (event, headers) => {
    return headers
}