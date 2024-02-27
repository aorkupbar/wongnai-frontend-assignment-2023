import apiClient from "./apiClient";

export const getRestaurant = (restaurantId: number) => {
	return apiClient.get(`/restaurants/${restaurantId}`);
};

export const getShortMenu = (restaurantId: number, menuName: string) => {
	return apiClient.get(`/restaurants/${restaurantId}/menus/${menuName}/short`);
};

export const getFullMenu = (restaurantId: number, menuName: string) => {
	return apiClient.get(`/restaurants/${restaurantId}/menus/${menuName}/full`);
};