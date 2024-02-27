import React from 'react'
import './Restaurant.scss'

interface RestaurantProps {
	restaurant: {
		name: string,
		id: number,
		coverImage: string,
		menus: string[],
		activeTimePeriod: {
			open: string,
			close: string,
		}
	}
};

const Restaurant: React.FC<RestaurantProps> = ({ restaurant }) => {
	return (
		<div className='card-item card-restaurant'>
			<div className='thumb-image'>
				<span className='photo' style={{backgroundImage: `url(${restaurant.coverImage})`}}></span>
			</div>
			<div className="info">
				<p className="name">{restaurant.name}</p>
				<p className='time'>เปิด: {restaurant.activeTimePeriod.open} - {restaurant.activeTimePeriod.close}</p>
			</div>
		</div>
	)
}

export default Restaurant