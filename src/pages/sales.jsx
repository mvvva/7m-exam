import React, { useState} from "react";
import ContactSection from "../components/Contact";
import Aside from "../components/aside/Aside"
import Main from "../components/main/Main"



function Sales() {
    const [sortBy, setSortBy] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedColor, setSelectedColor] = useState("");

  return (
    <main className="overflow-hidden">

        <ContactSection/>
        <div className="filter-wrap flex py-4 px-6 items-center justify-between bg-[#D5F8CF]">
            <div className="filter font-bold text-[#0BA42D]">Filter by:</div>
            <div className="sort-by">
            <select 
                name="price"
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)} 
                className="text-[#0BA42D] bg-transparent rounded-lg py-2 focus:outline-nofocus:ring-none"
            >
                <option value="">Sort by</option>
                <option value="cheap">Cheap</option>
                <option value="expensive">Expensive</option>
            </select>
            </div>
        </div>

        <div className="main-wrapper flex">
        <Aside
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
        />
        <Main
            selectedBrand={selectedBrand}
            selectedColor={selectedColor}
            sortBy={sortBy}
        />
        </div>
    </main>
  );
}

export default Sales;