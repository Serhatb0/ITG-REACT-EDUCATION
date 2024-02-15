import React, { useReducer, useState } from "react";
import { Country, countries } from "../data/countries";

const CountryPage = () => {
  interface CategoryItemProps {
    item: Country;
  }

  type State =
    | { type: "clear" }
    | { type: "allClear" }
    | { type: "selectedClear" }
    | { type: "handleCheckBox"; id: number };




  const [country, setCountry] = useState<Country[]>(countries);
  const [ids, setIds] = useState<number[]>([]);

  const handleOnClick = (action: State) => {
    switch (action.type) {
      case "clear":
        return setCountry(country.slice(1));
      case "allClear":
        return setCountry([]);
      case "selectedClear":
        return setCountry(country.filter((item) => !ids.includes(item.id)));
      case "handleCheckBox":
        if (ids.includes(action.id)) {
          setIds(ids.filter((item) => item !== action.id));
        } else {
          setIds([...ids, action.id]);
        }
        return;
      default:
        throw new Error("Unknown action");
    }
  };



  const CountryItem: React.FC<CategoryItemProps> = ({ item }) => {
    return (
      <>
        <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
          <td className="p-4 w-4">
            <div className="flex items-center">
              <input
                id="checkbox-table-4"
                onChange={() =>
                  handleOnClick({ type: "handleCheckBox", id: item.id })
                }
                checked={ids.includes(item.id)}
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="checkbox-table-4" className="sr-only">
                checkbox
              </label>
            </div>
          </td>
          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {item.name}
          </td>
          <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
            {item.code}
          </td>
          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {item.population}
          </td>
          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {item.capital}
          </td>
          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {item.currency}
          </td>
        </tr>
      </>
    );
  };

  return (
    <>
      <div className="mt-5 max-w-3xl mx-auto">
        <div className="mb-5">
          <button
            onClick={() => handleOnClick({ type: "clear" })}
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            CLEAR
          </button>

          <button
            onClick={() => handleOnClick({ type: "allClear" })}
            className="ml-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            ALL CLEAR
          </button>
          <button
            onClick={() => handleOnClick({ type: "selectedClear" })}
            className="ml-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            SELECTED CLEAR
          </button>
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden ">
                <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="p-4">
                        <div className="flex items-center"></div>
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        name
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        code
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        population
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        capital
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        currency
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {country.map((item) => (
                      <CountryItem key={item.id} item={item} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CountryPage;
