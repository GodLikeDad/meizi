'use strict'

const { readdirSync } = require('fs')
const { join } = require('path')

/**
 * 获取脚本列表
 * @return {Array}
 */
function readScripts() {
    let arr = readdirSync('./libs')
    return arr.map(item => join('libs', item))
}

/**
 * 获取脚本路由
 * @return {Array}
 */
function mapProviders() {
    return readScripts().map(item => {
        return require('./' + item)
    })
}

/**
 * 根据URL分发路由
 * @param {string} url URL
 * @return {Promise<any>}
 */
exports.reducer = async function (url) {
    const providers = [
        require('./libs/oasis'),
        require('./libs/oasistimeline')
    ]
    let found = providers.find(i => i.pattern.test(url))
    if (!found) throw 'Not found provider'

    return await found.callback(url)
}