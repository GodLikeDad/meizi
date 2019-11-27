import React, { useContext } from 'react'
import PicList from './comp/PicList'
import { got, Context } from './utils'
import Preview from './comp/Preview'
import ActionBar from './comp/ActionBar'

async function getlist(index = '0') {
    let res = await got('getPictures', { index })
    return res.error ? [] : res.list || []
}

export default function ({ list, selects, preview }) {
    const dispatch = useContext(Context)
    const loadmore = async () => {
        dispatch({ picList: await getlist(list.pop()._key) })
    }

    const refresh = async () => dispatch({ picList: await getlist() })

    if (list === null) refresh()
    return <div className="page">
        <ActionBar refresh={refresh} />
        <PicList list={list || []} selects={selects} type="picture" />
        <Preview url={preview} />
        <div className="page-footer">
            <span className="load-more" onClick={loadmore}>加载更多</span>
        </div>
    </div>
}