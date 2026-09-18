import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";
import { buildMetadata } from "@/lib/build-metadata";

type SearchParams = Record<string, string | string[] | undefined>;

export async function generateMetadata({ searchParams }: { searchParams: Promise<SearchParams> }): Promise<Metadata> {
  const sp = await searchParams;
  const serviceId = typeof sp.service === "string" ? sp.service : undefined;
  return buildMetadata(null, serviceId);
}

export default function Home() {
  return <LandingPage shopName={null} />;
}
