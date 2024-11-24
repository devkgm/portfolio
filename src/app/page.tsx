import Profile from "@/components/Profile";
import AboutMe from "@/components/AboutMe";
import Career from "@/components/Career";
import PortfolioList from "@/components/PortfolioList";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Profile />
      <AboutMe />
      <Career />
      <PortfolioList />
    </div>
  );
} 