import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgetPasswordController,
  updateProfileController,
  getOrderController,
  getAllOrderController,
  orderStatusController,
} from "../controllers/authController.js";
import { requireSiggnIn, isAdmin } from "../middlewares/authMiddleware.js";
// import { productFiltersController } from '../controllers/productcontroller.js';
//router object
const router = express.Router();

//routing
//register\\ method post
router.post("/register", registerController);

//login Router
router.post("/login", loginController);

// forgot passsword controller
router.post("/forget-password", forgetPasswordController);

//test router
router.get("/test", requireSiggnIn, isAdmin, testController);

//protected route auth
router.get("/user-auth", requireSiggnIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//route for admin
router.get("/admin-auth", requireSiggnIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//filter product

// router.post("/product-filters",productFiltersController)

//update profile

router.put('/profile',requireSiggnIn,updateProfileController);

//orders

router.get('/orders',requireSiggnIn,getOrderController)

//all orders 


router.get('/all-orders',requireSiggnIn,getAllOrderController)

//order status route

router.put("/order-status/:orderId",requireSiggnIn,isAdmin, orderStatusController)
export default router;
