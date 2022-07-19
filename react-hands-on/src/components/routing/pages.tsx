import { Link, Outlet, useLocation } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <h1>[Company Website]</h1>
      <nav>
        <ul>
          <li>
            <Link to="about">About</Link>
          </li>
          <li>
            <Link to="events">Events</Link>
          </li>
          <li>
            <Link to="products">Products</Link>
          </li>
          <li>
            <Link to="contact">Contact Us</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
const About = () => {
  return (
    <div>
      <h1>[About]</h1>
      <ul>
        <li>
          <Link to="services">Services</Link>
        </li>
        <li>
          <Link to="history">History</Link>
        </li>
        <li>
          <Link to="location">Location</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};
const Events = () => {
  return (
    <div>
      <h1>[Events]</h1>
    </div>
  );
};
const Products = () => {
  return (
    <div>
      <h1>[Products]</h1>
    </div>
  );
};
const Contact = () => {
  return (
    <div>
      <h1>[Contact]</h1>
    </div>
  );
};

const Services = () => {
  return (
    <section>
      <h2>Our Services</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
        odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
        quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
        mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
        Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad
        litora torquent per conubia nostra, per inceptos himenaeos. Curabitur
        sodales ligula in libero.
      </p>
    </section>
  );
};

const History = () => {
  return (
    <section>
      <h2>Our History </h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
        odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
        quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
        mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
        Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad
        litora torquent per conubia nostra, per inceptos himenaeos. Curabitur
        sodales ligula in libero.
      </p>
    </section>
  );
};

const Location = () => {
  return (
    <section>
      <h2>Our Location</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
        odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
        quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
        mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
        Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad
        litora torquent per conubia nostra, per inceptos himenaeos. Curabitur
        sodales ligula in libero.
      </p>
    </section>
  );
};

// 404 handling
const Whoops404 = () => {
  const location = useLocation();
  console.log(location);
  return (
    <div>
      <h1>Resource not found at {location.pathname}</h1>
    </div>
  );
};

export {
  Home,
  About,
  Events,
  Products,
  Contact,
  Whoops404,
  Services,
  History,
  Location,
};
