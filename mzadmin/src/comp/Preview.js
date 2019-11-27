import React from 'react'
import closeIcon from '../assets/close.png'
import { Context } from '../utils'

export default function ({ url }) {
    return url ? <Context.Consumer>{dispatch =>
        <div className="preview-pic">
            <div className="preview-container">
                <img src={url} alt="url" className="p-img"
                    referrerPolicy="no-referrer"
                    referrer="no-referrer" />
                <img src={closeIcon} alt="关闭" onClick={() => {
                    dispatch({ previewUrl: null })
                }} className="close-btn" />
            </div>
        </div>
    }</Context.Consumer> : null
}