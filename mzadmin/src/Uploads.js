import React from 'react'
import PicList from './comp/PicList'
import { got, Context } from './utils'
import Preview from './comp/Preview'
import ActionBar from './comp/ActionBar'
import BatchForm from './comp/BatchForm'

async function getlist(index = '0') {
    let res = await got('getUploads', { index })
    return res.error ? [] : res.list || []
}

export default function ({ list, selects, preview }) {
    const dispatch = React.useContext(Context)

    const refresh = async () => {
        dispatch({ uploadList: await getlist() })
    }

    const update = arr => {
        let after = list.filter(i => !arr.includes(i._key))
        dispatch({ uploadList: after })
    }

    if (list === null) refresh()

    return <div className="page">
        <ActionBar refresh={refresh} />
        <BatchForm selects={selects} type="review" source={list || []} />
        <PicList list={list || []} selects={selects} type="review"
            update={update} />
        <Preview url={preview} />
        <div className="page-footer">
            <span className="load-more" onClick={async () => {
                dispatch({
                    uploadList: list.concat(await getlist(list.pop()._key))
                })
            }}>加载更多</span>
        </div>
    </div>
}