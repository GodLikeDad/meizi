import { createContext } from 'preact'
import { useReducer } from 'preact/hooks'
import './style.css'

import App from './App'

const Context = createContext()

export default function () {
    const [state, dispatch] = useReducer(
        (s, a) => Object.assign({}, s, a),
        { loading: true }
    )
    return <Context.Provider value={dispatch}>
        <App state={state} />
    </Context.Provider>
}

export { Context }