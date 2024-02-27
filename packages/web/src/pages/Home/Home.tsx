import React from 'react';
import useSWR from 'swr';
import { getRestaurant } from '../../api/apiRoutes';
import RestaurantCard from '../../components/Restaurant/Restaurant';
import SpinLoading from '../../components/Icon/SpinLoading';

import { Link } from 'react-router-dom'
import './Home.scss';

interface RestaurantType {
	id: number,
	name: string,
	coverImage: string,
	menus: string[],
	activeTimePeriod: {
		open: string,
		close: string,
	}
};

const fetchRestaurants = async (ids: number[]): Promise<RestaurantType[]> => {
	try {
		const req = ids.map((id) => getRestaurant(id));
		const response = await Promise.all(req);
		return response.map(res => res.data);
	} catch (error) {
		throw error;
	}
};

const Home: React.FC = () => {
	const restaurantId = [567051, 227018];
	const { data, error, isLoading } = useSWR(restaurantId, fetchRestaurants);
	return (
    <div className="home-page">
			<div className="logo text-center">
				<img src="https://static2.wongnai.com/static2/images/HTZaHLM.png" alt="Wongnai, No.1 Restaurant Review Website and Application in Thailand"/>
			</div>

			<div className="main-container">
				<section className="section-restaurant">
					<header className="header-title">
						<h1 className="h1 text-left">แนะนำร้านสำหรับคุณ</h1>
					</header>
					<div className="listing">
						{ error ? (
							<div>เกิดข้อผิดพลาดในการโหลดข้อมูล</div>
						) : !data || isLoading ? (
							<div className='flex items-center'><SpinLoading /> กำลังโหลดชื่อร้านอาหาร..</div>
						) :(
							<ul className='list-restaurant grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
								{data.map((restaurant) => (
									<li key={restaurant.id}>
										<Link to={`/restaurant/${restaurant.id}`}>
											<RestaurantCard restaurant={restaurant} />
										</Link>
									</li>
								))}
							</ul>
						)}
					</div>
				</section>
			</div>
    </div>
	)
}

export default Home