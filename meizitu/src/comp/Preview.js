import { Context } from '../index'
import closeIcon from '../assets/close.png'

export default function ({ url }) {
    return url && <Context.Consumer>{dispatch => <div class="preview">
        <div class="prev-wrapper">
            <a href={url} target="_blank" rel="noopener noreferrer"
                title="点击查看原图">
                <img src={url} alt={url} class="p-img" />
            </a>

            <img src={closeIcon} alt="关闭预览"
                class="close-btn"
                onClick={e => dispatch({ preview: null })} />
        </div>
    </div>}</Context.Consumer>
}