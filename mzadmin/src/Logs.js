import React from 'react'
import LogItem from './comp/LogItem'
import { got, Context } from './utils'
import ActionBar from './comp/ActionBar'

async function getlist(index = '0') {
    let res = await got('getLogs', { index })
    return res.list || []
}

export default function ({ list }) {
    const dispatch = React.useContext(Context)

    if (list === null) getlist().then(arr => {
        dispatch({ logList: arr })
    })
    return <div className="page">
        <ActionBar refresh={async () => dispatch({ logList: await getlist() })} />
        <div className="log-table">
            <table>
                <thead>
                    <tr>
                        <th width="25%">时间</th>
                        <th width="15%">耗时</th>
                        <th>消息</th>
                    </tr>
                </thead>
                <tbody>{
                    list && list.map(it => <LogItem data={it} key={it._key} />)
                }</tbody>
            </table>
        </div>
        <div className="page-footer">
            <span className="load-more" onClick={() => {
                getlist(list ? list[list.length - 1]._key + 'v' : '0').then(arr => {
                    dispatch({ logList: list.concat(arr) })
                })
            }}>加载更多</span>
        </div>
    </div>
}