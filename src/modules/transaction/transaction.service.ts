// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { StatusCodes } from "http-status-codes";
import AppError from "../../error/AppError";
import { listing } from "../listings/listings.schema";
import { Transaction } from "./transaction.schema";
import { transactionUtils } from "./transaction.utils";

interface ITransaction {
  itemID: string;
  sellerID: string;
  buyerID: string;
  transactionId: string;
  status: string;
  paymentStatus: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  email: string;
}

const createTransactionInDB = async (
  listingData: ITransaction,
  userId: string,
  client_ip: string
) => {
  const { itemID, sellerID, name, phone, address, city, postalCode } =
    listingData;

  if (!userId) {
    throw new AppError("User not found", StatusCodes.NOT_FOUND);
  }

  const foundItem = await listing.findById(itemID);
  if (!foundItem) {
    throw new AppError("Item not found", StatusCodes.NOT_FOUND);
  }

  // check if item is already sold
  if (foundItem.status === "sold") {
    throw new AppError("Item already sold", StatusCodes.BAD_REQUEST);
  }

  await listing.findByIdAndUpdate(foundItem._id, {
    $set: {
      status: "sold",
    },
  });

  const purchasesData = await Transaction.create({
    itemID,
    sellerID,
    buyerID: userId,
    name,
    phone,
    address,
    city,
    postalCode,
    transaction: {
      id: "",
      transactionStatus: "",
    },
  });

  // console.log("purchasesData ->", purchasesData);

  // payment gateway integration
  const shurjopayPayload = {
    amount: foundItem.price,
    order_id: purchasesData._id,
    currency: "BDT",
    customer_name: name,
    customer_phone: phone,
    customer_address: address,
    customer_city: city,
    customer_post_code: postalCode,
    client_ip,
  };

  const payment = await transactionUtils.makePaymentAsyn(shurjopayPayload);

  //   console.log("payment ->", payment);

  if (payment?.transactionStatus) {
    await Transaction.updateOne(
      { _id: purchasesData._id },
      {
        $set: {
          "transaction.id": payment.sp_order_id,
          "transaction.transactionStatus": payment.transactionStatus,
        },
      }
    );
  }

  return {
    checkout_url: payment?.checkout_url,
  };
};

const verifyWithUpdateStatusInDB = async (order_id: string) => {
  const verifyPayment = await transactionUtils.verifyPaymentAsync(order_id);

  if (verifyPayment.length) {
    await Transaction.findOneAndUpdate(
      {
        "transaction.id": order_id,
      },
      {
        "transaction.bank_status": verifyPayment[0].bank_status,
        "transaction.sp_code": verifyPayment[0].sp_code,
        "transaction.sp_message": verifyPayment[0].sp_message,
        "transaction.transactionStatus": verifyPayment[0]?.transactionStatus,
        "transaction.method": verifyPayment[0].method,
        "transaction.date_time": verifyPayment[0].date_time,
        paymentStatus:
          verifyPayment[0].bank_status === "Success"
            ? "Completed"
            : verifyPayment[0].bank_status === "Failed"
            ? "pending"
            : verifyPayment[0].bank_status === "Cancel"
            ? "Cancelled"
            : "pending",
      }
    );
  }

  return verifyPayment;
};

const getPaurchaseHistoryFromDB = async (
  userId: string,
  myUserId: string,
  query: Record<string, unknown>
) => {
  if (userId !== myUserId) {
    throw new AppError("User not found!", StatusCodes.NOT_FOUND);
  }

  const result = await Transaction.find(query)
    .populate("itemID")
    .populate("buyerID")
    .populate("sellerID");
  return result;
};

const getSalersHistoryFromDB = async (
  userId: string,
  myUserId: string
  //   query: string
) => {
  if (userId !== myUserId) {
    throw new AppError("User not found!", StatusCodes.NOT_FOUND);
  }
  const result = await Transaction.find({ sellerID: userId })
    .populate("itemID")
    .populate("buyerID")
    .populate("sellerID");
  return result;
};

const updateTransactionStatusInDB = async (
  TransactionId: string,
  status: string
) => {
  const transactionItem = await Transaction.findById(TransactionId);
  if (!transactionItem) {
    throw new AppError(" Transaction not found", StatusCodes.NOT_FOUND);
  }

  const listingItem = transactionItem.itemID;
  if (status === "pending") {
    await listing.findByIdAndUpdate(listingItem._id, {
      $set: {
        status: "available",
      },
    });
  }

  const result = await Transaction.updateOne(
    TransactionId,
    { status },
    { new: true }
  );

  return result;
};

export const transactionService = {
  createTransactionInDB,
  verifyWithUpdateStatusInDB,
  getPaurchaseHistoryFromDB,
  getSalersHistoryFromDB,
  updateTransactionStatusInDB,
};
