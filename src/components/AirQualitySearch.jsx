import { useState } from "react"

const AirQualitySearch = () => {
    const [state, setState] = useState("");
    const [date, setDate] = useState("");
    const [data, setData] = useState([]);
    const [error, setError] = useState("");

    const fetchAirQuality = async () => {
	setError("");

	let url = `http://18.118.128.230/api/v1/air-quality?state=${state}`;
	if (date) url += `&date=${date}`;

	try {
	    const res = await fetch(url);
	    if (!res.ok) throw new Error("API error");
	    const json = await res.json();
	    setData(json);
	} catch (err) {
	    setError("Failed to fetch data.");
	}
    };

    return (
	<div className="max-w-3xl mx-auto p-4">
	    <h2 className="text-2xl font-semibold mb-4">Air Quality Search</h2>
	    
	    <div className="flex flex-col gap-3 mb-4">
		<input
		    type="text"
		    placeholder="State Code (e.g., CA)"
		    value={state}
		    onChange={(e) => setState(e.target.value)}
		    className="border p-2 rounded"
		/>
		<input
		    type="date"
		    value={date}
		    onChange={(e) => setDate(e.target.value)}
		    className="border p-2 rounded"
		/>
		
		<button
		    onClick={fetchAirQuality}
		    className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
		>
		    Search
		</button>
		
		{error && <p className="text-red-600">{error}</p>}
	    </div>
	</div>
    );
};

export default AirQualitySearch;
