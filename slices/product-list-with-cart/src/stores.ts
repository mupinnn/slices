import { atom } from "nanostores";
import { type Menu } from "./types";

type Cart = Menu & { qty: number };

export const $cart = atom<Cart[]>([]);
export const $showConfirmOrderDialog = atom(false);
