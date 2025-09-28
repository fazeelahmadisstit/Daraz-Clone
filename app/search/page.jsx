import SearchClient from "./SearchClient";

export default function SearchPage({ searchParams }) {
  const query = searchParams?.query || "";
  return <SearchClient query={query} />;
}
