'use strcit'

const { ads } = require('./tables')

exports.addAd = async ({ source, picurl }) => {
    if (typeof source !== 'string' ||
        typeof picurl !== 'string') {
        return { error: 'Require source and picurl' }
    }

    let arr = source.split(/[\n\r]+/)
    let title = arr.shift()
    let dirlink = arr.pop()
    let link = arr.pop().match(/http.*$/)

    if (!link) {
        link = dirlink.match(/http.*$/)[0]
    } else {
        link = link[0]
    }
    let rowkey = link.match(/\w*$/)[0]
    return await ads.put(rowkey, { link, title, picurl })
}

exports.getAds = async () => {
    return { list: await ads.scan() }
}

exports.rmAd = async ({ id }) => {
    return await ads.remove(id)
}