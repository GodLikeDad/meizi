'use strict'

const { js2xml } = require('xml-js')
const { pictures } = require('./tables')
const MAX = parseInt('vvvvvvv', 32)

module.exports = async function () {
    let entries = await getEntries()
    return js2xml({
        _declaration: {
            _attributes: {
                version: '1.0',
                encoding: 'utf8'
            }
        },
        feed: {
            _attributes: { xmlns: 'http://www.w3.org/2005/Atom' },
            title: { _text: '每日妹子图' },
            subtitle: { _text: '每天都会更新的妹子图' },
            id: { _text: 'https://mmm.orzv.ml/rss' },
            updated: { _text: entries[0].time },
            rights: { _text: '@ 2019 Orzv' },
            author: {
                name: { _text: 'orzv' },
                email: { _text: 'orzv@outlook.com' },
                uri: { _text: 'https://orzv.ml/' }
            },
            entry: entries.map(item => {
                let time = new Date(item.time)
                let title = time.getFullYear() + '-' + time.getMonth() + '-' +
                    time.getDate() + ' ' + (time.getHours() === 0 ? '上' : '下')
                return {
                    id: { _text: 'ORZVMEIZI:' + time.getTime() },
                    title: { _text: '妹子图' + title },
                    subtitle: { _text: item.html.match(/<img/g).length + '张妹子图' },
                    summary: { _text: item.html.match(/<img/g).length + '张妹子图' },
                    content: {
                        _attributes: { type: 'html' },
                        _text: item.html
                    },
                    updated: { _text: time.toISOString() },
                    author: {
                        name: { _text: 'orzv' }
                    }
                }
            })
        }
    }, { compact: true })
}

async function getEntries() {
    let now = new Date(Date.now() + 43200000)
    console.log(new Date)
    now.setHours(12, 0, 0, 0)
    if (now > Date.now()) now.setHours(0)
    now = parseInt(now / 1000)
    const start = MAX - (now - 11 * 43200)
    console.log(start, MAX - now)
    let list = await pictures.scan((MAX - now).toString(32), null, 30)
    list = list.map(item => {
        let time = new Date((MAX - parseInt(item._key.slice(0, 7), 32)) * 1000)
        let spliter = new Date(time.getTime())
        spliter.setHours(12, 0, 0, 0)
        if (spliter > time) spliter.setHours(0)
        return { time: spliter, url: item.url }
    }).reduce((all, cur) => {
        let index = cur.time.toISOString()
        if (!all[index]) all[index] = []
        all[index].push(cur.url)
        return all
    }, {})

    return Object.keys(list).map(time => {
        let html = list[time].map(item => {
            return js2xml({
                img: {
                    _attributes: {
                        src: item,
                        referrerPolicy: 'no-referrer'
                    }
                }
            }, { compact: true })
        }).join('')
        return { html, time }
    })
}