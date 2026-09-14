import subscriptionService from "../services/subscription.service";
import AppError from "../utils/appError";

//get all subscribers
const getSubscribers = async (req, res) => {
  const users = await subscriptionService.getSubscribers();
  res.status(200).json({
    success: true,
    data: users,
  });
};
//get a subscription details
const subscriberDetails = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new AppError("Bad request", 400);
  }

  const details = await subscriptionService.getSubscribersDetails(id);

  res.status(200).json({
    success: true,
    data: details,
  });
};
//create a subscriber
const createSubscription = async (req, res) => {
  const body = req.body;
  if (!body) {
    throw new AppError("No details provided", 400);
  }

  const { id } = req.user;
  if (!id) {
    throw new AppError("Bad request", 400);
  }

  const newSubscription = await subscriptionService.createSubscriber({
    body,
    id,
  });

  res.status(200).json({
    success: true,
    data: newSubscription,
  });
};

//update a subscriber
const updateSubscription = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const updated = await subscriptionService.updateSubscription({ id, body });
};
//delete a subscriber
//get all user subscription
//cancle a subscriber
//reenewal a subscribe
