import React from 'react'
import ReMap from '../../components/Map/ReMap'

function Comparar() {
  return (
    <div className="d-flex flex-row w-100">
      <div className='w-50 border-end border-3 border-dark'>
        <ReMap/>
      </div>
      <div className='w-50 border-3 border-dark'>
        <ReMap/>
      </div>
    </div>
  )
}

export default Comparar