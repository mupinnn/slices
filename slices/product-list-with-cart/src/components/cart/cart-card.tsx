import { useStore } from "@nanostores/react";
import { $cart } from "@/stores";
import IllustrationEmpty from "@/assets/assets/images/illustration-empty-cart.svg";
import RemoveIcon from "@/assets/assets/images/icon-remove-item.svg";
import CarboNeutralIcon from "@/assets/assets/images/icon-carbon-neutral.svg";
import { formatCurrency } from "@/utils";
import { Button } from "../ui/button";

export function CartCard() {
  const cart = useStore($cart);
  const total = cart.reduce((acc, curr) => acc + curr.qty * curr.price, 0);

  function removeItem(name: string) {
    $cart.set(cart.filter(c => c.name !== name));
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

          <Button className="mt-4">Confirm Order</Button>
        </>
      )}
    </section>
  );
}
