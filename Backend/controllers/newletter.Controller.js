import Subscriber from "../model/subscriber.model";

export const subscribe = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "Please provide an email",
    });
  }

  const subscribedEmail = await Subscriber.findOne({ email });

  if (subscribedEmail) {
    return res.status(409).json({
      message: "Email is already subscribed.",
    });
  }

  const subscriber = await Subscriber.create({
    email,
  });

  return res.status(201).json({
    message: "Subscription successful.",
    subscriber,
  });
};
