import { Context } from '../index'

export default function ({ data }) {
    let thumb = data.url ?
        data.url.replace('/large/', '/orj480/') :
        data.picurl
    return <Context.Consumer>{dispatch => <div class="pic-item">
        {data.url ? <img src={thumb} alt={data.url} class="main-p"
            onClick={e => dispatch({ preview: data.url })} /> :
            <img src={data.picurl} alt={data.title} class="main-p"
                onClick={() => window.open(data.link)} />}
    </div>}</Context.Consumer>
}