import Stripe from "stripe";

export const enum routes {
  HOME = "/",

  PRODUCTS = "/products",
  ORDERS = "/orders",

  PURCHASE = "/purchase",
  PURCHASE_SUCCESS = "/stripe/purchase-success",

  ADMIN = "/admin",
  ADMIN_PRODUCTS = "/admin/products",
  ADMIN_CUSTOMERS = "/admin/users",
  ADMIN_SALES = "/admin/orders",

  NEW_PRODUCT = "/admin/products/new",
  DOWNLOAD = "/download",
  DOWNLOAD_EXPIRES = "/products/download/expired",
  EDIT = "/edit",
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
