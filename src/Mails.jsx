import { useState } from "react";
import Loading from "./Loading";
import MailRow from "./MailRow";
import PageControls from "./PageControls";
import { usePaginate } from "./usePaginate";
import { Search } from "react-bootstrap-icons";

export default function Mails() {
  const [limit, setLimit] = useState(20);
  const [search, setSearch] = useState("");

  const { data, loading, error, pagination } = usePaginate(
    "mails",
    limit,
    search
  );

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <PageControls pagination={pagination} />

      <div className="flex flex-col gap-5 mb-5 md:gap-10 md:flex-row">
        <div className="group relative flex flex-row gap-5 p-3 px-10 rounded-3xl border dark:bg-violet-900 dark:text-violet-200 dark:border-violet-200">
          <div className="group-hover:hidden">{limit}</div>

          <div className="hidden group-hover:flex flex-row gap-5">
            <button onClick={() => setLimit(20)}>20</button>
            <button onClick={() => setLimit(50)}>50</button>
            <button onClick={() => setLimit(100)}>100</button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 mb-5 md:gap-10 md:flex-row">
        <div className="group relative flex flex-row gap-5 p-3 px-10 rounded-3xl border dark:bg-violet-900 dark:text-violet-200 dark:border-violet-200">
          <div className="group-hover:hidden">
            <Search />
          </div>

          <div className="hidden group-hover:flex flex-row gap-5">
            <input
              className="bg-transparent h-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 w-1/2">
        {data.map((mail) => (
          <MailRow key={mail.id} mail={mail} />
        ))}
      </div>

      <PageControls pagination={pagination} />
    </>
  );
}
