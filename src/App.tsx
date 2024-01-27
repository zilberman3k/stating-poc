import { Routes, Route, Outlet, Link } from "react-router-dom";
import { Signals } from "./states/signals/Signals";
import { Mobx } from "./states/mobx/Mobx";
import { Valtio } from "./states/valtio/Valtio";

export default function App() {
  return (
    <div className="m-2">
      <h1 className="text-center border border-2 rounded border-blue-950">Seraphic State Mgmt Options</h1>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Signals" element={<Signals />} />
          <Route path="mobx" element={<Mobx />} />
          <Route path="valtio" element={<Valtio />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div>
      <nav className="m-2">
        <ul className="flex gap-4">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/Signals">Signals</Link>
          </li>
          <li>
            <Link to="/mobx">Mobx</Link>
          </li>
          <li>
            <Link to="/valtio">Valtio</Link>
          </li>
          <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li>
        </ul>
      </nav>

      <hr />
      <Outlet />
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}