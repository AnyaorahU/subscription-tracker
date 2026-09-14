import { application } from "express";
import Subscription from "../model/subscription.model";
import AppError from "../utils/appError";

//get all subscribers
const getSubscribers = async () => {
  const users = await Subscription.find();
  if (!users) {
    throw new AppError("No subscribers Found", 404);
  }

  return users;
};

//get a subscription details
const getSubscribersDetails = async (id) => {
  const details = await Subscription.findById(id);
  if (!details) {
    throw new AppError("No Details Found", 404);
  }

  return details;
};

//create a subscriber
const createSubscription = async ({ body }) => {
  const allowedFields = [
    "name",
    "price",
    "currency",
    "frequency",
    "cartegory",
    "paymentMethod",
    "status",
  ];

  const datas = {};

  for (const field of allowedFields) {
    if (!field) {
      throw new AppError("Field cant be empty", 400);
    }
    if (body[field] !== undefined) {
      datas[field] = body[field];
    }
  }

  if (Object.keys(datas).length === 0) {
    throw new AppError("No valid details provided", 400);
  }

  const subscription = await Subscription.create(datas);

  return subscription;
};

//update a subscriber
const updateSubscription = async ({ id, body }) => {
  const allowedFields = [
    "name",
    "price",
    "currency",
    "frequency",
    "cartegory",
    "paymentMethod",
  ];

  const datas = {};

  for (const field of allowedFields) {
    if (!field) {
      throw new AppError("Field cant be empty", 400);
    }
    if (body[field] !== undefined) {
      datas[field] = body[field];
    }
  }

  if (Object.keys(datas).length === 0) {
    throw new AppError("No valid details provided", 400);
  }

  const updated = await Subscription.findByIdAndUpdate(id, datas, {
    returnDocument: true,
    runValidators: true,
  });

  if (!updated) {
    throw new AppError("Subscription NOt Found", 404);
  }

  return updated;
};

//delete a subscriber
const deleteSubscriber = async () => {};
//get all user subscription
const getUserSubscriptions = async () => {};

//cancle a subscriber
const cancleSubscription = async () => {};

//renewal a subscriber
const renewSubscription = async () => {};

export default {
  getSubscribers,
  getSubscribersDetails,
  createSubscription,
  updateSubscription,
  deleteSubscriber,
  getUserSubscriptions,
  cancleSubscription,
  renewSubscription,
};
