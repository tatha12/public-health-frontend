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
	    {data.length > 0 && (
		<table className="w-full mt-4 border">
		    <thead>
			<tr className="bg-green-200">
			    <th className="p-2 border">Date</th>
			    <th className="p-2 border">AQI</th>
			    <th className="p-2 border">Category</th>
			    <th className="p-2 border">Pollutant</th>
			</tr>
		    </thead>
		    <tbody>
			{data.map((row, idx) => (
			    <tr key={idx} className="border-t">
				<td className="p-2 border">{row.date}</td>
				<td className="p-2 border">{row.aqi_value}</td>
				<td className="p-2 border">{row.aqi_category}</td>
				<td className="p-2 border">{row.pollutant}</td>
			    </tr>
			))}
		    </tbody>
		</table>
	    )}
	</div>
    );
};

export default AirQualitySearch;
