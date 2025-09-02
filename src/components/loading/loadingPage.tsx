import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import React from 'react'

interface IData {
    message: string
}

const LoadingPage = ({ message }: IData) => {
    return (
        <div className='min-h-[80vh] main-layout flex flex-col items-center justify-center'>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
            <span>{message}</span>
        </div>
    )
}

export default LoadingPage