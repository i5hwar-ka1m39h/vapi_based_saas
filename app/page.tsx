import BotCards from "@/components/botCard";
import CtaCard from "@/components/ctaCard";
import Recents from "@/components/recents";

import { fetchSessionHistory, fetchUserSessionHistory, getAllBots } from "@/lib/actions/bot.actions";



export default async function Home() {
  const bots = await getAllBots({limit:3});
  const resentSessionbots = await fetchSessionHistory(10)
  return (
    <main>
      <h1 className=" text-2xl font-bold">Dashboard</h1>

      <section className="home-section">
        {bots.map((each)=>(
          <BotCards {...each} key={each.id}/>
        ))}
        <BotCards 
        id="123" topic="science" duration={30} name="babita" color="#faf981" subject="hstorererer"/>
      </section>

      <section className="home-section">
        <Recents
        title="Recently checked"
        bots={resentSessionbots}
        className="w-2/3 max-lg:w-full"
        />
        <CtaCard/>
      </section>
      
    </main>
  );
}
