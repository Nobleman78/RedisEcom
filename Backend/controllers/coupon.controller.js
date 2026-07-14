import Coupon from "../model/coupon.model";

// get coupon
export const getCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findOne({
      userId: req.user._id,
      isActive: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// validateCoupon
export const validateCoupon = async (req, res) => {
  try {
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
