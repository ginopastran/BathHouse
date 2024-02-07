import React from 'react'
import ReactTyped from 'react-typed'

const Tiped = () => {
  return (
    <ReactTyped
className='md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2'
  strings={['BTB', 'BTC', 'SASS']}
  typeSpeed={120}
  backSpeed={140}
  loop
/>
  )
}

export default Tiped