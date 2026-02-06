import React from 'react'

const HighlightText = ({text}) => {
  return (
    <span className='bg-gradient-to-r from-richblue-300 to-richblue-100 text-transparent bg-clip-text'>
      {"" + text + ""}
    </span>
  )
}

export default HighlightText
