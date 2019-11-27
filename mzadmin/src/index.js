import React, { useReducer } from 'react'
import ReactDOM from 'react-dom'
import { Router } from '@reach/router'
import Header from './comp/Header'
import Home from './Home'
import Uploads from './Uploads'
import Logs from './Logs'
import Pictures from './Pictures'
import Ads from './Ads'
import Dialog from './comp/Dialog'
import { Context } from './utils'

import './style.css'

function Main() {
    const [state, dispatch] = useReducer((s, a) => Object.assign({}, s, a), {})
    return <Context.Provider value={dispatch}>
        <Header />
        <Router>
            <Home path="/" />
            <Uploads path="/uploads" list={state.uploadList || null}
                selects={state.uploadSelects || {}}
                preview={state.previewUrl || null} />
            <Logs path="/logs" list={state.logList || null} />
            <Pictures path="/pictures" list={state.picList || null}
                preview={state.previewUrl || null}
                selects={state.picSelects || {}} />
            <Ads path="/ads" list={state.adList || null} />
        </Router>
        <Dialog type={state.dialog || null} />
    </Context.Provider>
}

ReactDOM.render(
    <Main />,
    document.getElementById('root')
)