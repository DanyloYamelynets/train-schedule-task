import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Train Schedule Application</h1>
      <Link to="/schedules">View Schedules</Link>
    </div>
  );
};

export default Home;
