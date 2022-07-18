import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import {
  Home,
  About,
  Events,
  Products,
  Contact,
  Whoops404,
  Services,
  History,
  Location,
} from "./pages";
const App = () => (
  <div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/home"
        element={
          // 引数にreplaceがある場合は「replace」, 無い場合は「push」
          <Navigate to="/" />
        }
      />
      <Route path="about" element={<About />}>
        <Route path="services" element={<Services />} />
        <Route path="history" element={<History />} />
        <Route path="location" element={<Location />} />
      </Route>
      <Route path="/events" element={<Events />} />
      <Route path="/products" element={<Products />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<Whoops404 />} />
    </Routes>
  </div>
);

export default App;
