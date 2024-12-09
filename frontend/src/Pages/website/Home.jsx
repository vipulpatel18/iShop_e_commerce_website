import React from 'react'
import MainImg from '../../components/website/mainImg'
import BestSeller from '../../components/website/BestSeller'
import TrendingProduct from '../../components/website/TrendingProduct'
import FeaturedProductsSlider from '../../components/website/FeaturedProductsSlider'

export default function Home() {
  return (
    <div>
      <MainImg/>
      <BestSeller/>
      <TrendingProduct/>
      <FeaturedProductsSlider/>
    </div>
  )
}
