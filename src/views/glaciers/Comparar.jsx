import React from 'react'
import ReMap from '../../components/Map/ReMap'
import ReMap2 from '../../components/Map/ReMap2'

function Comparar() {


  return (
    <div className="d-flex flex-row w-100">
      <div className='w-50 border-end border-4 border-dark'>
        <ReMap compare={true} />
      </div>
      <div className='w-50'>
        <ReMap2 compare={true} />
      </div>
    </div>
  )
}

export default Comparar