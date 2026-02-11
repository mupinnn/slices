import { useRef } from "react";
import { useStore } from "@nanostores/react";
import { $cart, $showConfirmOrderDialog } from "@/stores";
import IllustrationEmpty from "@/assets/assets/images/illustration-empty-cart.svg";
import RemoveIcon from "@/assets/assets/images/icon-remove-item.svg";
import CarboNeutralIcon from "@/assets/assets/images/icon-carbon-neutral.svg";
import CheckIcon from "@/assets/assets/images/icon-order-confirmed.svg";
import { formatCurrency } from "@/utils";
import { Button } from "../ui/button";

export function CartCard() {
  const cart = useStore($cart);
  const orderConfirmationDialogRef = useRef<HTMLDialogElement>(null);

  const total = cart.reduce((acc, curr) => acc + curr.qty * curr.price, 0);

  function removeItem(name: string) {
    $cart.set(cart.filter(c => c.name !== name));
  }

  function confirmOrder() {
    $showConfirmOrderDialog.set(true);
    orderConfirmationDialogRef.current?.showModal();
  }

  function clearOrder() {
    $cart.set([]);
    $showConfirmOrderDialog.set(false);
    orderConfirmationDialogRef.current?.close();
  }

  return (
    <section className="flex h-fit flex-col rounded-[10px] bg-white px-6 py-8.5 sm:pt-5 sm:pb-[38px]">
      <h2 className="text-red text-[24px] font-bold">Your Cart ({cart.length})</h2>
      {cart.length === 0 ? (
        <div className="mt-7 flex flex-col items-center justify-center gap-4 text-center sm:mt-[35px]">
          <img src={IllustrationEmpty.src} alt="" />
          <p className="text-sm font-semibold text-rose-500">Your added items will appear here</p>
        </div>
      ) : (
        <>
          <div className="mt-4 flex flex-col">
            {cart.map(c => (
              <div className="flex items-center justify-between gap-1 border-b border-rose-100 py-4">
                <div className="flex flex-col">
                  <p className="text-sm font-semibold text-rose-900">{c.name}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-red font-semibold">{c.qty}x</span>
                    <span className="ml-4 text-rose-500">@ {formatCurrency(c.price)}</span>
                    <span className="ml-2 font-semibold">{formatCurrency(c.qty * c.price)}</span>
                  </div>
                </div>
                <button
                  className="flex size-5 cursor-pointer items-center justify-center rounded-full border border-rose-100"
                  onClick={() => removeItem(c.name)}
                >
                  <img src={RemoveIcon.src} alt="" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-rose-500">Order Total</p>
            <p className="text-2xl font-bold">{formatCurrency(total)}</p>
          </div>

          <div className="mt-4 flex items-center justify-center gap-1 rounded-[10px] bg-rose-50 px-3 py-4">
            <img src={CarboNeutralIcon.src} alt="" />
            <p className="text-sm text-rose-900">
              This is a <span className="font-bold">carbon-neutral</span> delivery
            </p>
          </div>

          <Button className="mt-4" onClick={confirmOrder}>
            Confirm Order
          </Button>
        </>
      )}

      <dialog
        ref={orderConfirmationDialogRef}
        className="bottom-0 mt-auto max-w-[580px] rounded-t-[10px] backdrop:bg-black/35 sm:m-auto sm:w-[calc(100%-2rem)] sm:rounded-[10px]"
      >
        <div className="bg-white p-8">
          <img src={CheckIcon.src} alt="" />
          <div className="mt-6 flex flex-col gap-1">
            <p className="text-4xl font-bold text-rose-900">Order Confirmed</p>
            <p className="text-rose-500">We hope you enjoy your food!</p>
          </div>
          <div className="mt-6 flex flex-col bg-rose-50 px-6 py-2">
            {cart.map(c => (
              <div className="flex items-center justify-between gap-1 border-b border-rose-100 py-4">
                <div className="flex flex-col">
                  <p className="text-sm font-semibold text-rose-900">{c.name}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-red font-semibold">{c.qty}x</span>
                    <span className="ml-4 text-rose-500">@ {formatCurrency(c.price)}</span>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-6 flex items-center justify-between pb-4">
              <p className="text-sm font-semibold text-rose-500">Order Total</p>
              <p className="text-2xl font-bold">{formatCurrency(total)}</p>
            </div>
          </div>

          <Button className="mt-6 w-full" onClick={clearOrder}>
            Start New Order
          </Button>
        </div>
      </dialog>
    </section>
  );
}
