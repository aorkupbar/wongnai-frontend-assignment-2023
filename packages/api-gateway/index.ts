import express, { Application } from "express";
import axios from "axios";
import cors from "cors";

const app: Application = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const baseURL = 'https://us-central1-wongnai-frontend-assignment.cloudfunctions.net/api/restaurants';

app.get("/api/restaurants/:restaurantId", async (req, res) => {
	try {
		const { restaurantId }  = req.params;
		const response = await axios.get(`${baseURL}/${restaurantId}.json`);

		res.json(response.data);
	} catch (error) {
		console.error(error);
		res.status(500).send('Error fetching restaurant data.');
	}
});

app.get("/api/restaurants/:restaurantId/menus/:menuName/short", async (req, res) => {
	try {
		const { restaurantId, menuName }  = req.params;
		const response = await axios.get(`${baseURL}/${restaurantId}/menus/${menuName}/short.json`);

		res.json(response.data);
	} catch (error) {
		console.error(error);
		res.status(500).send('Error fetching short menu data.');
	}
});

app.get("/api/restaurants/:restaurantId/menus/:menuName/full", async (req, res) => {
	try {
		const { restaurantId, menuName }  = req.params;
		const response = await axios.get(`${baseURL}/${restaurantId}/menus/${menuName}/full.json`);

		res.json(response.data);
	} catch (error) {
		console.error(error);
		res.status(500).send('Error fetching full menu data.');
	}
});

try {
	app.listen(port, (): void => {
		console.log(`Connected successfully on port ${port}`);
	});
} catch (error) {
	console.error(`Error occured: ${(error as Error).message}`);
}
