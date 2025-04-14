import React from 'react'
import Header from '../components/Header'
import Steps from '../components/Steps'
import BgSlider from '../components/BgSlider'
import Testimonial from '../components/Testimonial'
import Uplode from '../components/Uplode'

export default function Home() {
  return (
    <div>
      <Header />
      <Steps />
      <BgSlider />
      <Testimonial/>
      <Uplode/>
    </div>
  )
}
