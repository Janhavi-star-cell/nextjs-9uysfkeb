import { cars } from '@/data/car';
import Image from 'next/image';

interface Props {
  params: {
    model: string;
  };
}

const CarDetailsPage = ({ params }: Props) => {
  const { model } = params;

  // Find the car by model name (case-insensitive)
  const car = cars.find((c) => c.model.toLowerCase() === model.toLowerCase());

  if (!car) {
    return (
      <h2 style={{ textAlign: 'center', marginTop: '50px' }}>
        Car not found 😕
      </h2>
    );
  }

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>
        🚗 {car.brand} {car.model}
      </h1>
      <img
        src={car.image}
        alt={`${car.brand} ${car.model}`}
        style={{
          width: '400px',
          height: '250px',
          objectFit: 'cover',
          borderRadius: '12px',
          margin: '20px auto',
        }}
      />
      <p>
        <strong>Fuel Type:</strong> {car.fuelType}
      </p>
      <p>
        <strong>Seating:</strong> {car.seating}
      </p>
      <p>
        <strong>Price:</strong> {car.price}
      </p>

      <a
        href="/"
        style={{
          marginTop: '20px',
          display: 'inline-block',
          padding: '10px 16px',
          backgroundColor: '#0070f3',
          color: '#fff',
          borderRadius: '8px',
          textDecoration: 'none',
        }}
      >
        ⬅ Back to Home
      </a>
    </div>
  );
};

export default CarDetailsPage;
