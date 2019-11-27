import React from 'react'
import PicItem from './PicItem'
import { Context } from '../utils'

export default function ({ list, selects, type, update }) {
    return <Context.Consumer>{dispatch =>
        <div className="pic-list">
            {list.map((it, i) =>
                <PicItem data={it} key={it._key} update={update}
                    type={type} selects={selects} />
            )}
        </div>
    }</Context.Consumer>
}