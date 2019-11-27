'use strict'

const { get } = require('https')
const { createHash } = require('crypto')
const { createBTS } = require('btsc')
const { parse } = require('path')
const { AK, SK, INSTANCE } = process.env
const table = name => createBTS(`${AK}:${SK}@gz:${INSTANCE}/${name}`)
const uploads = table('uploads')
const logs = table('logs')
const pictures = table('pictures')
const hashes = table('hashes')
const MAX = parseInt('vvvvvvv', 32)

/**
 * 生成md5
 * @param {string} s 要生成的字符串
 * @return {string}
 */
const md5 = s => createHash('md5').update(s).digest('hex')

/**
 * 发起GET请求
 * @param {string} url URL
 * @return {Promise<object | string>}
 */
exports.get = async function (url) {
    return new Promise(callback => {
        get(url, res => {
            res.setEncoding('utf8')
            let str = ''
            res.on('data', s => str += s)
            res.on('end', () => {
                try {
                    callback(JSON.parse(str))
                } catch (err) {
                    callback(str)
                }
            })
        })
    })
}

/**
 * 保存图片
 * @param {Array} data 图片数组
 */
exports.save = async data => {
    const time = parseInt(Date.now() / 1000)
    if (data instanceof Array) {
        let list = data.map(url => {
            return {
                _key: rowkeyTransform(url),
                url: picUrlTransform(url),
                time
            }
        })
        let blocks = await hashes.get(
            list.map(i => i._key)
        )
        blocks = blocks ? blocks.map(i => i._key) : []
        list = list.filter(i => !blocks.includes(i._key))
        let hlist = list.map(i => ({ ...i }))

        if (hlist.length === 1) {
            await hashes.put(hlist)
            await pictures.put(parseRow(list[0].url))
            return { count: 1 }
        }
        await uploads.put(list)
        await hashes.put(hlist)
        return { count: list.length }
    }
}

/**
 * 根据图片URL生成rowkey
 * @param {string} url 图片URL
 * @return {string}
 */
function rowkeyTransform(url) {
    if (/sinaimg\.cn/.test(url)) {
        let [u, pid] = url.match(/\/(\w+?)\.(?:jpg|gif)$/)
        return md5(pid.slice(8)).slice(0, 8)
    }
}

/**
 * 转换图片URL
 * @param {string} url URL
 * @return {string}
 */
function picUrlTransform(url) {
    if (/sinaimg\.cn/.test(url)) {
        return url.replace(/\/orj\d+\//g, '/large/')
    }
}

function parseRow(url) {
    let pid = parse(url).name.slice(8)
    let rowkey = parseInt(Date.now() / 1000)
    rowkey = (MAX - rowkey).toString(32)
    rowkey += md5(pid).slice(0, 4)
    return { _key: rowkey, url }
}

exports.setLog = async function (data) {
    let time = parseInt(Date.now() / 1000)
    time = (MAX - time).toString(32)
    time = time + md5(JSON.stringify(data)).slice(0, 4)
    await logs.put(time, data)
}