"use client";

import BestSeller from '@/components/common/bestSeller';
import Location from '@/components/common/location'
import Slider from '@/components/common/slider'
import React from 'react'

const HomePage = () => {
  return (
    <div>
      <Slider />
      <BestSeller />
      <Location />
    </div>
  )
}

export default HomePage