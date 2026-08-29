import { test, expect } from "@playwright/test";
import AuthController from "../../controllers/AuthController";
import GarageController from "../../controllers/GarageController";
import { faker } from "@faker-js/faker";
import { beforeEach } from "node:test";

let authController: AuthController;
let garageController: GarageController;

test.beforeEach(async () => {
  authController = new AuthController();
  garageController = new GarageController();
});

test.describe("Get brands and models ", () => {
  test("Get Brands", async ({ request }) => {
    // const garageController = new GarageController();
    const response = await garageController.getbrands(request);
    const responseBody = await response.json();
    expect(response.status()).toBe(200);
    expect(responseBody.data).toBeDefined();
    console.log(responseBody.data);
  });
  test("Get Models", async ({ request }) => {
    // const garageController = new GarageController();
    const response = await garageController.getModels(request);
    const responseBody = await response.json();
    expect(response.status()).toBe(200);
    expect(responseBody.data).toBeDefined();
    console.log(responseBody.data);
  });
  //negative test
  test("Get incorrect Brand ", async ({ request }) => {
    const id = faker.number.int({ min: 1000, max: 999999 });
    const response = await request.get(`/api/cars/brands/${id}`);
    const responseBody = await response.json();
    expect(response.status()).toBe(404);
    expect(responseBody.message).toEqual("No car brands found with this id");
    console.log(responseBody.message);
  });
});
test.describe("Add and remove cars", () => {
  let sid: string;
  let cars: number[] = [];
  test.beforeAll(async ({ request }) => {
    authController = new AuthController();
    garageController = new GarageController();
    const response = await authController.signIn(
      request,
      process.env.TEST_USER_EMAIL!,
      process.env.TEST_USER_PASSWORD!,
    );
    const responseHeaders = response.headers();
    expect(response.status()).toBe(200);
    sid = responseHeaders["set-cookie"].split(";")[0].split("=")[1];
    console.log(sid);
  });

  test("Add car to garage", async ({ request }) => {
    const car = {
      carBrandId: 5,
      carModelId: 22,
      mileage: 987,
    };
    const response = await garageController.addCar(
      request,
      car.carBrandId,
      car.carModelId,
      car.mileage,
      sid,
    );
    const responseBody = await response.json();
    expect(response.status()).toBe(201);
    expect(responseBody.data.carBrandId).toEqual(car.carBrandId);
    const carId = await responseBody.data.id;

    cars.push(carId);

    console.log("Created car ID:", responseBody.data.id);
  });
  test("Add second car", async ({ request }) => {
    const car = { carBrandId: 1, carModelId: 1, mileage: 500 };
    const response = await garageController.addCar(
      request,
      car.carBrandId,
      car.carModelId,
      car.mileage,
      sid,
    );
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    const carId = await responseBody.data.id;
    cars.push(carId);
    console.log("Created car ID:", carId);
    console.log("Cars array:", cars);
  });
  test("Add third car", async ({ request }) => {
    const car = { carBrandId: 1, carModelId: 2, mileage: 509 };
    const response = await garageController.addCar(
      request,
      car.carBrandId,
      car.carModelId,
      car.mileage,
      sid,
    );
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    const carId = await responseBody.data.id;
    cars.push(carId);
    console.log("Created car ID:", carId);
  });
  //negative test
  test("Add invalid car", async ({ request }) => {
    const car = { carBrandId: 99, carModelId: 99, mileage: 509 };
    const response = await garageController.addCar(
      request,
      car.carBrandId,
      car.carModelId,
      car.mileage,
      sid,
    );
    const responseBody = await response.json();
    expect(response.status()).toBe(404);
    expect(responseBody.message).toEqual("Brand not found");
    console.log(responseBody);
  });

  test("Remove car", async ({ request }) => {
    const carId = cars[1];
    const response = await garageController.deleteCar(request, sid, carId);
    const responseBody = await response.json();
    expect(response.status()).toBe(200);
    expect(responseBody.status).toBe("ok");
    expect(responseBody.data.carId).toEqual(carId);
    cars.splice(1, 1);

    console.log("Remaining cars:", cars);
  });

  test.afterAll(async ({ request }) => {
    for (const carId of cars) {
      const response = await garageController.deleteCar(request, sid, carId);
      expect(response.status()).toBe(200);
    }
  });
});
