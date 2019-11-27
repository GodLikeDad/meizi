import { Context } from './index'
import { useContext } from 'preact/hooks'
import Pic from './comp/Pic'
import Preview from './comp/Preview'
import moreIcon from './assets/down.png'
import loadingIcon from './assets/loading.png'

export default function ({ state }) {
    const dispatch = useContext(Context)
    let list = state.list || null
    let previmg = state.preview || null
    let noMore = state.noMore || false
    async function getlist() {
        if (noMore && !state.loading) return
        let index = '0'
        if (list && list.length > 0) {
            index = list[list.length - 1]._key + 'v'
        }
        // dispatch({ loading: true })
        let res = await got('getPictures', { index })
        dispatch({
            list: list ? list.concat(res.list || []) : res.list,
            noMore: !res.list,
            loading: false
        })
    }

    window.onscroll = function () {
        let box = document.documentElement.getBoundingClientRect()
        let height = box.height - document.documentElement.clientHeight + box.y
        if (parseInt(height) === 0) getlist()
    }

    if (list === null) getlist()

    const morebtnicon = state.loading ? loadingIcon : moreIcon
    const moreclass = state.loading ? 'more-btn loading' : 'more-btn'

    return <div class="app">
        <div class="pic-list">{
            list && list.map(it =>
                <Pic key={it._key + Math.random() * Date.now()} data={it} />)
        }</div>

        <Preview url={previmg} />

        {!noMore && <img class={moreclass} src={morebtnicon}
            onClick={getlist} alt="点击加载更多" />}
    </div>
}

async function got(api, data) {
    let body = JSON.stringify({ api, ...data })
    let url = 'https://service-jqog7ilq-1256039828.gz.apigw.tencentcs.com/'
    url += 'release/'
    let res = await fetch(url, { method: 'POST', body })
    return await res.json()
}