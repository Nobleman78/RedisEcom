import SearchProduct from "./SearchProduct";
interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const SearchPage = async ({ searchParams }: PageProps) => {
  const resolvedParams = await searchParams;
  const query = (resolvedParams.q as string) || "";

  return (
    <div>
      <h1>Search Results for: {query}</h1>
      <SearchProduct query={query} />
    </div>
  );
};

export default SearchPage;
