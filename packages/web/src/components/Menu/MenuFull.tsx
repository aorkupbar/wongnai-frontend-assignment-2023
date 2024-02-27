import React from 'react';
import './Menu.scss';
import SpinLoading from '../Icon/SpinLoading';

interface MenuFullProps {
	menu: {
		name: string,
		id: string,
		thumbnailImage: string,
		fullPrice: number,
		discountedPercent: number,
		discountedTimePeriod?: {
			begin: string
			end: string
		}
		sold: number,
		totalInStock: number,
		largeImage?: string
		options: {
			label: string
			choices: {
				label: string
			}[]
		}[]
	};
}

const MenuFull: React.FC<MenuFullProps> = ({menu}) => {

  if (!menu) {
    return <div className='flex items-center p-4'> <SpinLoading /> เมนูไม่พร้อม </div>
  }

	if (menu.fullPrice === undefined || menu.fullPrice === null) {
    return <div>ข้อมูลไม่ครบถ้วน!</div>;
  }

	const discountedPrice = menu.fullPrice - (menu.fullPrice * menu.discountedPercent / 100);

	return (
		<section className='card-full-menu font-brand'>
      {menu.largeImage ? (
        <div className="cover-images -menu">
          <span className="photo" style={{ backgroundImage: `url(${menu.largeImage})` }}></span>
        </div>
      ) : (
        <div className="cover-images -menu">
          <span className="photo" style={{ backgroundImage: `url(https://fakeimg.pl/720x405/dddddd/999999?text=No+image&font=bebas)` }}></span>
        </div>
      )}
			<header className="header">
				<div className="primary">
					<h3 className='h2'>{menu.name}</h3>
					<div className='price text-right'>
						{menu.discountedPercent > 0 ? (
							<>
								<p className="discounted-price"><del>฿ {menu.fullPrice}</del></p>
								<p className="full-price">฿ {discountedPrice}</p>
							</>
						) : (
							<p className="full-price">
								฿ {menu.fullPrice}
							</p>
						)}
					</div>
				</div>
				<div className="secondary">
					<p>
						<span>ขายแล้ว: {menu.sold} | </span>
						<span>คงเหลือ: {menu.totalInStock}</span>
					</p>
				</div>
			</header>
      <div className="body">
        {menu.options && (
          <ul className='list-menu'>
						{Array.isArray(menu.options) && menu.options.map((option, index) => (
              <li key={index}>
                <h4 className='font-bold'>สำหรับเมนู: {option.label}</h4>
									{option.choices && (
										<ul className='list-option-menu'>
											{option.choices.map((choice, choiceIndex) => (
												<li key={choiceIndex}>
													<input type="checkbox" id={choice.label} name={choice.label} />
													<label htmlFor={choice.label} className='label'> {choice.label}</label>
												</li>
											))}
										</ul>
									)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
	)
};

export default MenuFull;