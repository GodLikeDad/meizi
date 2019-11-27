import { createContext } from 'react'

const Context = createContext()

export async function got(api, data) {
    let body = JSON.stringify({ api, ...data })
    let res = await fetch(
        'https://service-jqog7ilq-1256039828.gz.apigw.tencentcs.com/release/',
        { method: 'POST', body }
    )
    return await res.json()
}

/**
 * 格式化日期
 * @param {Date} date 日期
 */
export function formatDate(date) {
    date.setHours(date.getHours() + 8)
    return date.toISOString().replace(/T|Z|\.\d{3}/g, ' ').trim()
}

/**
 * 获取排除后的数组
 * @param {Array} arr 数组
 * @param {Array || string} excludes 要排除的项目
 * @return {Array}
 */
export function excludeList(arr, excludes) {
    if (typeof excludes === 'string') {
        excludes = [excludes]
    }

    return arr.filter(it => {
        return !excludes.includes(it._key)
    })
}

export { Context }