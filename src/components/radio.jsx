import { useState } from "react";

function RadioGroup({ setFilter, className = "" }) {
    const [selectedValue, setSelectedValue] = useState("all");

    return (
        <div className={className}>
            <div className="flex gap-3">
                <div >
                    <input
                        type="radio"
                        id="all"
                        name="filter"
                        value="all"
                        checked={selectedValue === "all"}
                        onChange={(e) => {
                            setSelectedValue(e.target.value);
                            setFilter(e.target.value);
                        }}
                    />
                    <label className="ml-[2px]" htmlFor="all">All</label>
                </div>

                <div>
                    <input
                        type="radio"
                        id="alive"
                        name="filter"
                        value="alive"
                        checked={selectedValue === "alive"}
                        onChange={(e) => {
                            setSelectedValue(e.target.value);
                            setFilter(e.target.value);
                        }}
                    />
                    <label className="ml-[2px]" htmlFor="alive">Alive</label>
                </div>

                <div>
                    <input
                        type="radio"
                        id="dead"
                        name="filter"
                        value="dead"
                        checked={selectedValue === "dead"}
                        onChange={(e) => {
                            setSelectedValue(e.target.value);
                            setFilter(e.target.value);
                        }}
                    />
                    <label className="ml-[2px]" htmlFor="dead">Dead</label>
                </div>
            </div>
        </div>
    );
}

export default RadioGroup;
