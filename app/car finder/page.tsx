import { useState, useEffect } from 'react';

const CarFinder = () => {
  const [cars, setCars] = useState([]);
  const [filters, setFilters] = useState({
    brand: '',
    fuelType: '',
    seating: '',
    minPrice: '',
    maxPrice: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCars, setTotalCars] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchCars = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        ...filters,
        page: currentPage.toString(),
      });
      const res = await fetch(`/api/cars?${queryParams}`);
      const data = await res.json();
      setCars(data.cars);
      setTotalCars(data.total);
    } catch (err) {
      console.error('Error fetching cars:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [filters, currentPage]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Search Filters */}
      <div className="mb-6 space-y-4 p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700">Search Filters</h2>
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Brand"
            className="input"
            value={filters.brand}
            onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
          />
          <input
            type="text"
            placeholder="Fuel Type"
            className="input"
            value={filters.fuelType}
            onChange={(e) =>
              setFilters({ ...filters, fuelType: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Seats"
            className="input"
            value={filters.seating}
            onChange={(e) =>
              setFilters({ ...filters, seating: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Min Price"
            className="input"
            value={filters.minPrice}
            onChange={(e) =>
              setFilters({ ...filters, minPrice: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Max Price"
            className="input"
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters({ ...filters, maxPrice: e.target.value })
            }
          />
        </div>
      </div>

      {/* Car Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {loading ? (
          <div className="text-center col-span-full text-lg">Loading...</div>
        ) : (
          cars.map((car) => (
            <div
              key={car.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={car.image}
                alt={car.model}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {car.brand} {car.model}
                </h3>
                <p className="text-gray-500">Price: ${car.price}</p>
                <p className="text-gray-500">Fuel: {car.fuelType}</p>
                <p className="text-gray-500">Seats: {car.seating}</p>
                <button
                  className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                  onClick={() => alert('Added to wishlist')}
                >
                  Add to Wishlist
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center items-center space-x-4">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg">{currentPage}</span>
        <button
          onClick={() =>
            setCurrentPage(Math.min(Math.ceil(totalCars / 10), currentPage + 1))
          }
          disabled={currentPage === Math.ceil(totalCars / 10)}
          className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CarFinder;
