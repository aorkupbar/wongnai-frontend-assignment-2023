import React from "react";
import {
  BrowserRouter as Router,
  Route,
	Routes
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Restaurant from "./pages/Restaurant/Restaurant";
import MainLayout from "./components/MainLayout";

import '../src/assets/css/font.scss';
import './App.scss';

const App: React.FC = () => {
  return (
    <Router>
			<MainLayout>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/restaurant/:restaurantId" element={<Restaurant />} />
				</Routes>
			</MainLayout>
		</Router>
  )
}

export default App