import Hero from './components/Hero'
import Popular from './components/Popular'

const LandingPage = ({ showNav, populars }) => {
  return (
    <main className='flex flex-col gap-2 snap-y snap-mandatory'>
      <Hero populars={populars} showNav={showNav} className='snap-start' />
      <Popular populars={populars} className='snap-start' />
    </main>
  )
}

export default LandingPage
