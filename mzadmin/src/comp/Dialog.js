import React, { useState } from 'react'
import { Context, got } from '../utils'

const AddAd = function () {
    const [source, setSource] = useState('')
    const [picurl, setPicurl] = useState('')
    return <Context.Consumer>{dispatch => <>
        <div className="dialog-title">添加广告</div>
        <textarea placeholder="请在此粘贴淘口令" defaultValue={source}
            onInput={e => setSource(e.currentTarget.value)}></textarea>
        <div className="label">图片地址</div>
        <input type="text" placeholder="商品图片地址" defaultValue={picurl}
            onInput={e => setPicurl(e.currentTarget.value)} />

        <div className="btn-group">
            <div className="confirm-btn" onClick={async () => {
                await got('addAd', { source, picurl })
                setSource('')
                setPicurl('')
                dispatch({
                    dialog: null,
                    adList: (await got('getAds')).list || []
                })
            }}>添加</div>
            <div className="cancel-btn" onClick={() => {
                dispatch({ dialog: null })
            }}>取消</div>
        </div>
    </>}</Context.Consumer>
}

export default function ({ type }) {
    return type ? <div className="dialog-mask">
        <div className="dialog-wrapper">
            {type === 'addAd' && <AddAd />}
        </div>
    </div> : null
}