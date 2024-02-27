import React, { useState, useEffect } from 'react'
import useSWR, { Key } from 'swr';
import { getRestaurant, getShortMenu, getFullMenu } from '../../api/apiRoutes';
import { useParams, Link } from 'react-router-dom';
import Modal from '../../components/Modal/Modal'
import Menu from '../../components/Menu/Menu';
import MenuFull from '../../components/Menu/MenuFull';
import SpinLoading from '../../components/Icon/SpinLoading';

import './Restaurant.scss';

type RouteParams = {
  restaurantId: string;
};

interface ShortMenuType {
	name: string,
	id: string,
	thumbnailImage?: string,
	fullPrice: number,
	discountedPercent: number,
	discountedTimePeriod?: {
		begin: string,
		end: string,
	},
	sold: number,
	totalInStock: number,
};

// Fetching Functions
const fetchRestaurantDetail = async (id: number) => {
	if (!id) {
		throw new Error("Not Found Restaurant id");
	}

	try {
		const response = await getRestaurant(id);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const fetchFullMenu = async (restaurantId: number, menuNames: string) => {
	if (!menuNames) {
		throw new Error("Menu name are not provide");
	}

	try {
		const response = await getFullMenu(restaurantId, menuNames);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const fetchShortMenu = async ([restaurantId, menuNames]: [number, string[]]): Promise<ShortMenuType[]> => {
	if (!menuNames) {
		throw new Error("Menu name are not provide");
	}

	try {
		const req = menuNames.map(menu => getShortMenu(restaurantId, menu));
		const response = await Promise.all(req);
		return response.map(res => res.data);
	} catch (error) {
		throw error;
	}
};

const fetchedDataMenuInBatch = async ([restaurantId, menuNames]: [number, string[]]) => {
	const batchSize = 12;
	let fetchedData: Array<any> = [];

	for (let i = 0; i <= menuNames.length; i += batchSize) {
		const batch = menuNames.slice(i, i + batchSize);
		const batchData = await fetchShortMenu([restaurantId, batch]);
		fetchedData = [...fetchedData, ...batchData];
	}

	return fetchedData;
};

// Main Component
const Restaurant: React.FC = () => {
	const { restaurantId: restaurantIdString } = useParams<RouteParams>();
	const restaurantId = Number(restaurantIdString);
  const [currentRestaurantId, setCurrentRestaurantId] = useState<number | null>(null);
	const [openModal, setOpenModal] = useState(false);
  const [clickedMenu, setClickedMenu] = useState<string | null>(null);
  const [fullMenuData, setFullMenuData] = useState<any | null>(null);
	const [lastUniqueMenus, setLastUniqueMenus] = useState<string[]>([]);

	// Initial Setup
  useEffect(() => {
    if (restaurantId && restaurantId !== currentRestaurantId) {
      setCurrentRestaurantId(restaurantId);
    }
  }, [restaurantId]);

	// Data Fetching
	const { data: fetchedDataRestaurant, error: fetchedErrorRestaurant } = useSWR(
		restaurantId as unknown as Key,
		fetchRestaurantDetail,
		{ revalidateOnFocus: false, revalidateOnReconnect: false }
	);

	let uniqueMenus: string[] = [];
	if (fetchedDataRestaurant && fetchedDataRestaurant.menus) {
		uniqueMenus = fetchedDataRestaurant.menus.reduce((acc: string[], menu: any) => {
			return acc.includes(menu) ? acc : [...acc, menu];
		}, []);
	}

	useEffect(() => {
    if (JSON.stringify(lastUniqueMenus) !== JSON.stringify(uniqueMenus)) {
      setLastUniqueMenus(uniqueMenus);
    }
  }, [uniqueMenus]);

  const { data: fetchedDataMenu, error: fetchedErrorMenu } = useSWR([currentRestaurantId, lastUniqueMenus], fetchedDataMenuInBatch);

	// Additional Effects
	useEffect(() => {
    const fetchFullMenuData = async () => {
      if (clickedMenu) {
        const data = await fetchFullMenu(restaurantId, clickedMenu);
        setFullMenuData(data);
      }
    };
    fetchFullMenuData();
  }, [clickedMenu]);

	// Error Handling
	if (fetchedErrorRestaurant) return <div>เกิดข้อผิดพลาดในการโหลดข้อมูลร้าน</div>;
	if (fetchedErrorMenu) return <div>เกิดข้อผิดพลาดในการโหลดเมนู</div>;

	return (
		<div className="restaurant-page">
			<section className="main-container">

				<Link to="/" className='flex font-brand h3 mb-3'>
					<span className='mr-2'>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="1.5"
							stroke="currentColor"
							className="h-8 w-8"
						>
							<path
								d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</span>
					กลับไปหน้าหลัก
				</Link>

				{fetchedDataRestaurant ? (
					<>
						<div className="cover-images -restaurant">
							<span className="photo" style={{backgroundImage: `url(${fetchedDataRestaurant.coverImage})`}}></span>
						</div>
						<header className="header-title">
							<h1 className="h1 text-left">{fetchedDataRestaurant.name}</h1>
							<p className='time font-brand'>เปิด: {fetchedDataRestaurant.activeTimePeriod.open} - {fetchedDataRestaurant.activeTimePeriod.close}</p>
						</header>
					</>
				) : (
					<div className='flex items-center'>
						<SpinLoading /> กำลังโหลดชื่อร้านอาหาร
					</div>
				)}

				<div className='wrapper-menu'>
				{fetchedDataMenu ? (
					<ul className='list-menu grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 sm:gap-4 auto-rows-max'>
						{ Array.isArray(fetchedDataMenu) && fetchedDataMenu.map((menu, index) => (
							<li key={index}>
								<Menu
									menu={menu}
									onClick={() => {
										setClickedMenu(menu.name);
										setOpenModal((true));
									}}
								/>
							</li>
						))}
					</ul>
					) : (
						<div className='flex items-center'>
							<SpinLoading /> ใจเย็นๆ นะ กำลังโหลดเมนูอาหาร...
						</div>
					)}
				</div>
			</section>

			<Modal open={openModal} onClose={() => setOpenModal(false)}>
				<div className="modal-menu">
					<MenuFull menu={fullMenuData} />
				</div>
			</Modal>
		</div>
	)
}

export default Restaurant

