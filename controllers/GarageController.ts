import { request } from "node:http";
import { addUncaughtExceptionCaptureCallback } from "node:process";

export default class GarageController {
  async getbrands(request: any) {
    const response = await request.get("/api/cars/brands");
    return response;
  }

  async getModels(request: any) {
    const response = await request.get("/api/cars/models");
    return response;
  }

  async addCar(
    request: any,
    carBrandId: number,
    carModelId: number,
    mileage: number,
    sid: string,
  ) {
    const car = {
      carBrandId,
      carModelId,
      mileage,
    };

    const response = await request.post("/api/cars", {
      data: car,
      headers: {
        Cookie: `sid=${sid}`,
      },
    });
    return response;
  }

  async deleteCar(request: any, sid: string, carId: number) {
    const response = await request.delete(`/api/cars/${carId}`, {
      headers: {
        Cookie: `sid=${sid}`,
      },
    });
    return response;
  }
  async updateCar(request: any, sid: string, carId: number, car: string) {
    const response = await request.put(`/api/cars/${carId}`, {
      headers: {
        Cookie: `sid=${sid}`,
      },
    });
    return response;
  }
}
