import React from 'react'
import { got, Context } from '../utils'

export default function ({ selects, type, source }) {
    const dispatch = React.useContext(Context)
    let list = Object.keys(selects).filter(i => {
        return selects[i]
    })
    function final() {
        let arr = source.filter(item => {
            return !list.includes(item._key)
        })
        dispatch(type === 'review' ?
            { uploadList: arr, uploadSelects: {} } :
            { picList: arr, picSelects: {} }
        )
    }
    const funA = async () => {
        if (type === 'review') {
            await got('review', { ref: true, list })
        }
        final()
    }

    const funB = async () => {
        if (type === 'review') {
            await got('review', { ref: false, list })
        } else {
            await got('removePictures', { list })
        }
        final()
    }
    return <div className="batch-form">
        <div className="total-title">已选择 {list.length} 项</div>
        <div className="btn green" onClick={funA}>发布</div>
        <div className="btn red" onClick={funB}>删除</div>
    </div>
}