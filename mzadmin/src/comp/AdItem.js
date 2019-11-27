import React from 'react'
import { got } from '../utils'

export default function ({ data, refresh }) {
    const removeAd = async () => {
        await got('rmAd', { id: data._key })
        await refresh()
    }
    return <div className="ad-item">
        <img src={data.picurl} alt={data.title} className="ad-img" />
        <div className="title">
            <a href={data.link} rel="noopener noreferrer"
                target="_blank">{data.title}</a>
        </div>
        <div className="ad-footer">
            <span className="green">编辑</span>
            <span className="red" onClick={removeAd}>删除</span>
        </div>
    </div>
}