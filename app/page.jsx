import Feed from "@components/Feed"


const Home = () => {
  return (
  <section className="w-full flex-center flex-col">
<h1 className="head_text text_center">Discover & Share</h1>
<br className="max-md:hidden"/>
<span className="orange_gradient text-center">Prompts By People</span>
<p className="desc text-center">This app is built to discover,create and share prompts</p>
<Feed/>
  </section>
  )

}

export default Home