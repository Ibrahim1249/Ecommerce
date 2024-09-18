import { Navbar } from "./navbar"
import { Hero } from "./hero"
import { Carousel } from "./Carousel"

function Home() {
  return (
    <>
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Navbar />
      {/* <Hero /> */}
      <Carousel/>
    </div>
    </>
  )
}

export default Home