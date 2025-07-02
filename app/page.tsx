import BotCards from "@/components/botCard";
import CtaCard from "@/components/ctaCard";
import Recents from "@/components/recents";
import { recentSessions } from "@/constants";

import Image from "next/image";

export default function Home() {
  return (
    <main>
      <h1 className=" text-2xl font-bold">Dashboard</h1>

      <section className="home-section">
        <BotCards 
        id="123" topic="science" duration={30} name="babita" color="#faf981" subject="hstorererer"/>
        <BotCards 
        id="123" topic="science" duration={30} name="babita" color="#faf981" subject="hstorererer"/>
        <BotCards 
        id="123" topic="science" duration={30} name="babita" color="#faf981" subject="hstorererer"/>
      </section>

      <section className="home-section">
        <Recents
        title="Recently checked"
        bots={recentSessions}
        className="w-2/3 max-lg:w-full"
        />
        <CtaCard/>
      </section>
      
    </main>
  );
}
