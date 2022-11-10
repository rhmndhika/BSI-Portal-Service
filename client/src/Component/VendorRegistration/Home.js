import { Button } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Link to="/inputdatavendor">
        <Button>Input</Button>
      </Link>
      <Link to="/registrationhistory">
        <Button>History</Button>
      </Link>
    </div>
  )
}

export default Home