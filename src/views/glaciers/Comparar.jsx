import React from 'react'
import ReMap from '../../components/Map/ReMap'

function Comparar() {
  return (
    <div className="d-flex flex-row">
      <div className='w-50 border-end border-2 border-dark '>
        <ReMap/>
      </div>
      <div className='w-50'>
        <ReMap/>
      </div>
      {/* 
       */}
    </div>
  )
}

export default Comparar