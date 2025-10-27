import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import ExploreKitchen from '../../components/ExploreKitchen/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'

const Home = () => {

  const [kitchen, setKitchen] = useState("All")

  return (
    <>
      <Header />
      <ExploreKitchen setKitchen={setKitchen} kitchen={kitchen} />
      <FoodDisplay kitchen={kitchen} />
      <AppDownload />
    </>
  )
}

export default Home
