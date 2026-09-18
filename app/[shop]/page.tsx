import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";
import { buildMetadata } from "@/lib/build-metadata";
import { shopNameFromSlug } from "@/lib/personalize";

type Params = { shop: string };
type SearchParams = Record<string, string | string[] | undefined>;

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const { shop } = await params;
  const sp = await searchParams;
  const shopName = shopNameFromSlug(shop);
  const serviceId = typeof sp.service === "string" ? sp.service : undefined;
  // An invalid/garbled slug renders the same generic content as "/", so it
  // should canonicalize there too rather than to a nonsense URL of itself.
  const path = shopName ? `/${encodeURIComponent(shop)}` : "/";
  return buildMetadata(shopName, shopName ? shop : null, serviceId, path);
}

export default async function ShopLandingPage({ params }: { params: Promise<Params> }) {
  const { shop } = await params;
  const shopName = shopNameFromSlug(shop);
  return <LandingPage shopName={shopName} />;
}
