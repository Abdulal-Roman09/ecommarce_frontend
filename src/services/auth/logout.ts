"use server"

import { deleteCookie } from "./jwtHendeler";

export const logOutCustomer = async () => {
  await deleteCookie("accessToken");
  await deleteCookie("refreshToken");
};
