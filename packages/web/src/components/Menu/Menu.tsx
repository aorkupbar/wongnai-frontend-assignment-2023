import React from 'react';
import './Menu.scss';

interface MenuProps {
	menu: {
    name: string,
    id: string,
    thumbnailImage: string,
    fullPrice: number,
    discountedPercent: number,
    sold: number,
    totalInStock: number,
  };
	onClick: () => void;
}

const Menu: React.FC<MenuProps> = ({ menu, onClick }) => {
	const discountedPrice = menu.fullPrice - (menu.fullPrice * menu.discountedPercent / 100);

	return (
		<div onClick={onClick} className="card-item card-menu">
			<div className='thumb-image'>
				<span
					className={`photo ${!menu.thumbnailImage ? '-non-found-image' : ''}`}
					style={{backgroundImage: `url(${menu.thumbnailImage})`}}
				></span>
			</div>
			<div className="info">
				<p className="name">{menu.name}</p>

				<div className="price">
					{menu.discountedPercent > 0 ? (
						<div>
							<p className="discounted-price"><del>฿ {menu.fullPrice}</del></p>
							<p className="full-price">฿ {discountedPrice}</p>
						</div>
					) : (
						<p className="full-price">
							฿ {menu.fullPrice}
						</p>
					)}
					<p>
						<span>ขายแล้ว: {menu.sold} | </span>
						<span>คงเหลือ: {menu.totalInStock}</span>
					</p>
				</div>
			</div>
		</div>
	)
};

export default Menu;