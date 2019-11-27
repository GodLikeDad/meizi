import React from 'react'
import AdItem from './AdItem'

export default function ({ list, refresh }) {
    return <div className="ad-list">{
        list.map(it => <AdItem data={it} key={it._key} refresh={refresh} />)
    }</div>
}