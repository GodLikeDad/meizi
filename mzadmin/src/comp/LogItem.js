import React from 'react'
import { formatDate } from '../utils'

export default function ({ data }) {
    return <tr>
        <td>{formatDate(new Date(data.time))}</td>
        <td>{data.used}ms</td>
        <td className="left">{data.message}</td>
    </tr>
}