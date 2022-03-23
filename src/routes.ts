import { Express } from "express"
import { createBooking } from "./controllers/booking.controller"
import { addBrandHandler, getAllBrandsHandler, removeBrandHandler } from "./controllers/brand.controller"
import { addCarHandler, getAllCarsHandler, removeCarHandler } from "./controllers/car.controller"
import { createUserSessionHandler, deleteSessionsHandler, getUserSessionsHandler, } from "./controllers/session.controller"
import { createUserHandler, getAllUsersHandler, getUserByIdHandler, } from "./controllers/user.controller"
import requireAdmin from "./middlewares/requireAdmin"
import requireUser from "./middlewares/requireUser"
import validate from "./middlewares/validateResource"
import createSessionSchema from "./schemas/session.schema"

const routes = (app: Express) => {
  // users
  app.get("/api/users", requireAdmin, getAllUsersHandler)
  app.get("/api/users/:id", getUserByIdHandler)
  app.post("/api/users", createUserHandler)

  // sessions
  app.get("/api/sessions", requireUser, getUserSessionsHandler)
  app.post("/api/sessions", validate(createSessionSchema), createUserSessionHandler)
  app.delete("/api/sessions", requireUser, deleteSessionsHandler)

  // rentals
  app.post("/api/rent", requireUser, createBooking)

  // cars
  app.get("/api/cars", getAllCarsHandler)
  app.post("/api/cars", requireAdmin, addCarHandler)
  app.delete("/api/cars/:car_id", requireAdmin, removeCarHandler)

  // brands
  app.get("/api/brands", getAllBrandsHandler)
  app.post("/api/brands", requireAdmin, addBrandHandler)
  app.delete("/api/brands/:brand_id", requireAdmin, removeBrandHandler)
}

export default routes
