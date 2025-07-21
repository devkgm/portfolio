import { portfolioDb } from "@/db";
import PortfolioCard from "./PortfolioCard";

export default async function PortfolioList() {
  const items = await portfolioDb.getAll();

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((portfolio) => (
        <PortfolioCard
          key={portfolio.id}
          id={portfolio.id}
          title={portfolio.title}
          description={portfolio.description}
          thumbnail={portfolio.thumbnail}
          tags={JSON.parse(portfolio.tags)}
        />
      ))}
    </div>
  );
}
