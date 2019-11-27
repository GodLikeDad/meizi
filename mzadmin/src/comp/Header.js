import React from 'react'
import { Link } from '@reach/router'

export default function () {
    return <nav>
        <Link to="/">首页</Link>
        <Link to="/pictures">图片</Link>
        <Link to="/uploads">审稿</Link>
        <Link to="/ads">广告</Link>
        <Link to="/logs">日志</Link>
    </nav>
}