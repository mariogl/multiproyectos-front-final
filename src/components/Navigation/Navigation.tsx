import { Link } from "react-router-dom";

const Navigation = (): JSX.Element => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/challenges">Challenges</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
