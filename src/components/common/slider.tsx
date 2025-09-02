import { Carousel } from 'antd'
import React from 'react'

const Slider = () => {
    return (
        <Carousel
            className='bg-white rounded-lg'
            autoplay={true}
            autoplaySpeed={5000}>
            <div className='h-80 slide-pho'></div>
            <div className='h-80 slide-bo-kho'></div>
            <div className='h-80 slide-bun-bo-hue'></div>
        </Carousel>
    )
}

export default Slider