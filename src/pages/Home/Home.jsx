import Hero from '../../components/Hero/Hero'
import ImpactStats from '../../components/ImpactStats/ImpactStats'
import PopularStreams from '../../components/PopularStreams/PopularStreams'
import FeaturedColleges from '../../components/FeaturedColleges/FeaturedColleges'
import Services from '../../components/Services/Services'
import Testimonials from '../../components/Testimonials/Testimonials'
import CTA from '../../components/CTA/CTA'

export default function Home() {
  return (
    <>
      <Hero />
      <ImpactStats />
      <PopularStreams />
      <FeaturedColleges />
      <Services />
      <Testimonials />
      <CTA />
    </>
  )
}
