import CTA from '@/components/landing/CTA'
import Feature from '@/components/landing/Feature'
import Hero from '@/components/landing/Hero'
import Statistics from '@/components/landing/Statistics'
import React from 'react'

export default function page() {
  return (
    <div>
      <Hero/>
      <Feature/>
      <Statistics/>
      <CTA/>
    </div>
  )
}
