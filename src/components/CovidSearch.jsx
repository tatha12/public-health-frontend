import { useState } from "react";
import { API_BASE } from "../config";

const CovidSearch = () => {
    const [state, setState] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [data, setData] = useState([]);

    const fetchCovidData = async () => {
	setLoading(true);
	setError("");
	let url = `${API_BASE}/api/v1/covid/cases?state=${state}`;
	if (startDate) url += `&start=${startDate}`;
	if (endDate) url += `&end=${endDate}`;
	try {
	    const res = await fetch(url);
	    if (!res.ok) throw new Error("API error");
	    const json = await res.json();
	    setData(json);
	} catch (err) {
	    setError("Failed to fetch data.");
	    console.error(err);
	}	
	setLoading(false);
    };
    return (
	<div>
	    <h2>COVID Case Search</h2>
	    <input
		type="text"
		placeholder="State Code (e.g., CA)"
		value={state}
		onChange={(e) => setState(e.target.value)}
	    />
	    <input
		type="date"
		value={startDate}
		onChange={(e) => setStartDate(e.target.value)}
	    />

	    <input
		type="date"
		value={endDate}
		onChange={(e) => setEndDate(e.target.value)}
	    />

	    <button
		onClick={fetchCovidData}
		className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
	    >
		Search
	    </button>
	    {error && <p className="text-red-600">{error}</p>}
	    {data.length > 0 && (
		<table className="w-full mt-4 border">
		    <thead>
			<tr className="bg-gray-200">
			    <th className="p-2 border">Date</th>
			    <th className="p-2 border">Cases</th>
			    <th className="p-2 border">Deaths</th>
			</tr>
		    </thead>
		    <tbody>
			{data.map((row, idx) => (
			    <tr key={idx} className="border-t">
				<td className="p-2 border">{row.date}</td>
				<td className="p-2 border">{row.cases}</td>
				<td className="p-2 border">{row.deaths}</td>
			    </tr>
			))}
		    </tbody>
		</table>
	    )}
	    
	</div>
    );
};

export default CovidSearch;
