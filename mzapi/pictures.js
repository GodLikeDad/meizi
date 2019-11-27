'use strict'

const { uploads, pictures, ads } = require('./tables')
const { parse } = require('path')
const { createHash } = require('crypto')
const md5 = s => createHash('md5').update(s).digest('hex')
const MAX = parseInt('vvvvvvv', 32)

exports.getUploads = async ({ index }) => {
    index = index || '0'
    return { list: await uploads.scan(index, null, 20) }
}

exports.getPictures = async ({ index }, headers) => {
    index = index || '0'

    let list = await pictures.scan(index, null, 20)
    console.log(headers)
    if (headers.origin) {
        let referrer = headers.origin
        console.log('referrer', referrer)
        if (referrer.match(/localhost|nimda\.orzv\.ml/)) return { list }
    }
    let adlist = await ads.scan()
    adlist = randomArray(adlist, 3)

    adlist.forEach(item => {
        let index = Math.floor(list.length * Math.random())
        console.log(index)
        list = [
            ...list.slice(0, index),
            item,
            ...list.slice(index)
        ]
    })

    return { list }
}

exports.removePictures = async ({ list }) => {
    await pictures.remove(list)
    return { count: list.length }
}

exports.review = async ({ ref, list }) => {
    if (!ref) {
        await uploads.remove(list)
        return { count: list.length }
    }
    let arr = await uploads.get(list)
    arr = arr.map(i => parseRow(i.url))
    await pictures.put(arr)
    await uploads.remove(list)
    return { count: arr.length }
}

exports.randReview = async () => {
    let list = await uploads.scan(null, null, 50)
    return list[Math.floor(list.length * Math.random())]
}

function parseRow(url) {
    let pid = parse(url).name.slice(8)
    let rowkey = parseInt(Date.now() / 1000)
    rowkey = (MAX - rowkey).toString(32)
    rowkey += md5(pid).slice(0, 4)
    return { _key: rowkey, url }
}

function randomArray(arr, count) {
    let list = []
    while (list.length < count) {
        list = list.concat(
            arr.splice(
                Math.floor(arr.length * Math.random()),
                1
            )
        )
    }
    return list
}