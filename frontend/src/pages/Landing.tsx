import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="container mx-auto p-4">
      <section className="my-8">
        <h2 className="text-3xl font-bold mb-4">Welcome to DalVacation Home</h2>
        <p className="text-lg">
          Enjoy a luxurious stay at our vacation homes, equipped with all the
          amenities you need for a comfortable and memorable experience.
        </p>
      </section>

      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">Our Features</h2>
        <ul className="list-disc list-inside">
          <li>Spacious rooms with beautiful views</li>
          <li>Modern amenities and facilities</li>
          <li>24/7 customer service</li>
        </ul>
      </section>

      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">View and Book Rooms</h2>
        <Link to="/rooms" className="bg-blue-600 text-white px-4 py-2 rounded">
          View Rooms
        </Link>
      </section>
    </div>
  );
};

export default Landing;
