import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const Swr = () => {
  const {
    data: countries,
    error,
    isValidating,
  } = useSWR("https://restcountries.com/v2/all", fetcher);
  // Handling the error
  if (error) return <div className="text-red-500">Failed to load</div>;
  if (isValidating) return <div className="cursor-wait">Loading...</div>;
  return (
    <div>
      {countries &&
        countries.map((country, index) => (
          <div key={index} className="w-full ">
            <img src={country.flags.png} alt="flag" width={100} />
          </div>
        ))}
    </div>
  );
};

//https://jsonplaceholder.typicode.com/todos
