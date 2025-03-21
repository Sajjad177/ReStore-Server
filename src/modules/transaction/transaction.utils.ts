import Shurjopay, { PaymentResponse, VerificationResponse } from "shurjopay";
import config from "../../config";

const shurjopay = new Shurjopay();

shurjopay.config(
  config.sp.sp_endpoint!,
  config.sp.sp_username!,
  config.sp.sp_password!,
  config.sp.sp_prefix!,
  config.sp.sp_return_url!
);

// console.log('shurjopay ->', shurjopay);

// make it forcefully async
const makePaymentAsyn = async (
  paymetPayload: any
): Promise<PaymentResponse> => {
  return new Promise((resolve, reject) => {
    shurjopay.makePayment(
      paymetPayload,
      (response: any) => {
        resolve(response);
      },
      (error : any) => {
        reject(error);
      }
    );
  });
};

const verifyPaymentAsync = (
  order_id: string
): Promise<VerificationResponse[]> => {
  return new Promise((resolve, reject) => {
    shurjopay.verifyPayment(
      order_id,
      (response :any) => resolve(response),
      (error :any) => reject(error)
    );
  });
};

export const transactionUtils = { makePaymentAsyn, verifyPaymentAsync };
