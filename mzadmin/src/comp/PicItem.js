import React from 'react'
import { Context, got } from '../utils'

export default function ({ data, type, selects, update }) {
    return <Context.Consumer>{
        dispatch => <div className="pic-item">
            <img src={data.url.replace('/large/', '/orj480/')}
                alt="点击预览大图"
                onClick={() => dispatch({ previewUrl: data.url })}
            />
            {
                type === 'review' ? <div className="actions">
                    <span className="green" onClick={async () => {
                        await got('review', { list: [data._key], ref: true })
                        update([data._key])
                    }}>发布</span>
                    <span className="red" onClick={async () => {
                        await got('review', { list: [data._key], ref: false })
                        update([data._key])
                    }}>删除</span>
                </div> : <div className="actions">
                        <span className="green">置顶</span>
                        <span className="red" onClick={async () => {
                            await got('removePictures', { list: [data._key] })
                        }}>删除</span>
                    </div>
            }
            <div className={'select-img' + (selects[data._key] ? ' on' : '')}
                onClick={() => {
                    let newmap = Object.assign({}, selects)
                    newmap[data._key] = !selects[data._key]
                    dispatch(type === 'review' ?
                        { uploadSelects: newmap } :
                        { picSelects: newmap })
                }}></div>
        </div>
    }</Context.Consumer>
}