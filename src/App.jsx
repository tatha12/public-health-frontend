import CovidSearch from "./components/CovidSearch";

function App() {
    return (
	<div className="min-h-screen bg-gray-50 p-4">
	    <h1 className="text-3xl font-bold text-center mb-6">Public Health Dashboard</h1>
	    <CovidSearch />
	</div>
    );
}
export default App;
