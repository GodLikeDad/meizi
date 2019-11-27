import React from 'react'
import ActionBar from './comp/ActionBar'
import AdList from './comp/AdList'
import { got, Context } from './utils'

async function getlist() {
    return (await got('getAds')).list || []
}

export default function ({ list }) {
    const dispatch = React.useContext(Context)
    const refresh = async () => {
        dispatch({ adList: await getlist() })
    }
    if (list === null) refresh()

    return <div className="page">
        <ActionBar refresh={refresh}>
            <div className="a-btn" onClick={() => {
                dispatch({ dialog: 'addAd' })
            }}>添加广告</div>
        </ActionBar>
        <AdList list={list || []} refresh={refresh} />
    </div>
}