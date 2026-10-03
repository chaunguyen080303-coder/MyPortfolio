import { PortfolioHome } from "@/components/PortfolioHome";
import { getContent } from "@/data";

export default function HomePage() {
  return <PortfolioHome content={getContent("en")} />;
}
