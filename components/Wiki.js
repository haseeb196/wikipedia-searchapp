import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import Wkit from "./Wkit";

const Wiki = () => {
  const [input, setInput] = useState("");
  const [searcher, setSearcher] = useState(true);
  const [seacrhcheck, setSearchcheck] = useState(false);
  const [result, setResult] = useState(undefined);
  const [loader, setLoader] = useState(false);
  const [progress, setProgress] = useState(Number);
  useEffect(() => {
    if (searcher) {
      setInput("");
      setResult(undefined);
    }
    if (result === undefined) {
      setLoader(true);
    } else {
      setLoader(false);
    }
  }, [searcher, result]);

  const Search = async (e) => {
    e.preventDefault();

    if (input === "") {
      alert("Search Pls...");
    } else {
      let api = "https://en.wikipedia.org/w/rest.php/v1/search/page?q=";
      let cb = "&limit=10";

      setSearchcheck(true);

      let res = await fetch(api + input + cb);

      setInput("");
      setLoader(true);

      let data = await res.json();

      let pagedata = await data.pages;

      if (pagedata.length <= 0) {
        setSearchcheck(false);
        alert("Nothing found");
      }
      setResult(pagedata);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className={`search__bar flex flex-col items-center ${
          !seacrhcheck && "mt-72"
        }`}
      >
        <a
          className="text-white capitalize text-[18px] font-semibold text-center"
          target="_blank"
          rel="noreferrer"
          href="https://en.wikipedia.org/wiki/Special:Random"
        >
          Click here for a random article
        </a>
        {searcher ? (
          <button onClick={() => setSearcher(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-16 h-16 my-4 text-[#FFA500]"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        ) : (
          <form className="border-[#FFA500] border-[6px] p-[3px] px-1 rounded-3xl flex flex-row justify-between my-4 w-64">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-transparent text-white outline-[0] text-[15px] pl-1 flex-1"
            />
            <button className="hidden" type="submit" onClick={Search}>
              hidden button
            </button>
            <button
              onClick={() => {
                setSearcher(true), setSearchcheck(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-[#FFA500]"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </form>
        )}
        {seacrhcheck ? (
          <></>
        ) : (
          <p className="text-white capitalize text-[18px] font-semibold">
            click here for search
          </p>
        )}
      </div>

      <div className="mt-[60px]">
        {!searcher && seacrhcheck && loader ? (
          <CircularProgress />
        ) : (
          result &&
          result?.map((data) => {
            return (
              <Wkit
                key={data?.key}
                page={
                  `https://en.wikipedia.org/?curid=${data?.id.toString()}` || ""
                }
                title={data?.title || ""}
                desc={data?.description || ""}
                image={data?.thumbnail?.url || ""}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Wiki;
