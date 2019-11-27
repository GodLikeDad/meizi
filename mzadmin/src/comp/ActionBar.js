import React from 'react'
import refreshIcon from '../assets/refresh.png'

export default function ({ refresh, children }) {
    return <div className="action-bar">
        <img src={refreshIcon} alt="刷新" className="refresh-btn"
            onClick={refresh} />
        {children}
    </div>
}