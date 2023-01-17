import { Combobox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

export default function MyCombobox({
  filteredByClients,
  clients,
  isFilter,
  className,
}) {
  const [selected, setSelected] = useState(isFilter ? "All" : "");
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? clients
      : clients.filter((person) =>
          person
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  useEffect(() => {
    // @ts-ignore
    if (selected) filteredByClients(selected);
  }, [selected]);

  //for case adding new client
  useEffect(() => {
    if (filteredPeople.length === 0) {
      setSelected(query);
    }
  }, [query]);
  return (
    <div className=" w-[267px]">
      <Combobox
        value={selected}
        onChange={(e) => {
          setSelected(e);
        }}
      >
        <div className="relative mt-1">
          <div className="relative w-full cursor-default   bg-[#F5F5F5] text-left  border-b-2 border-[#707070] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300  ">
            <Combobox.Input
              className={className}
              // @ts-ignore
              displayValue={(person) => person}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-[-25px] flex items-start mt-[6px]">
              <img src="/images/dropdown-icon.png" alt="" />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => {
              setQuery("");
            }}
          >
            <Combobox.Options className=" z-10 absolute mt-1 max-h-60 w-full overflow-auto   border-[1px] border-[#707070] bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredPeople.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  {isFilter ? "Nothing found." : "New Client ?"}
                </div>
              ) : (
                filteredPeople.map((person) => (
                  <Combobox.Option
                    key={person}
                    className={({ active }) =>
                      `relative cursor-default select-none py-3 pl-[18px] pr-4 ${
                        active ? "bg-[#B9B9B9] text-white" : "text-black"
                      }`
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-bold" : "font-bold"
                          }`}
                        >
                          {person}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          ></span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
