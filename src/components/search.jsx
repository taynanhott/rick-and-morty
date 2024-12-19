export default function Search({handleSearch, setSearch, search}) {
    return (
        <form
            className="flex justify-center items-center"
            onSubmit={handleSearch}
        >
            <input
                type="text"
                placeholder="Search name..."
                className="px-4 py-2 rounded-l-lg focus:outline-none text-emerald-400 w-40 md:w-56 lg:w-64"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <button
                type="submit"
                className="bg-emerald-500 px-4 py-2 rounded-r-lg hover:bg-emerald-700 text-white font-semibold"
            >
                Search
            </button>
        </form>
    );
}