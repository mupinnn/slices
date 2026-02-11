import { useStore } from "@nanostores/react";
import CartIcon from "@/assets/assets/images/icon-add-to-cart.svg";
import PlusIcon from "@/assets/assets/images/icon-increment-quantity.svg";
import MinusIcon from "@/assets/assets/images/icon-decrement-quantity.svg";
import type { Menu } from "@/types";
import { $cart } from "@/stores";
import { Button } from "../ui/button";

export function MenuAddToCartButton({
  name,
  category,
  image,
  price,
  className,
}: Menu & { className: string }) {
  const cart = useStore($cart);
  const currentItem = cart.find(c => c.name === name);

  function addToCart() {
    const updatedCart = [...cart, { name, category, image, price, qty: 1 }];
    $cart.set(updatedCart);
  }

  function adjustQuantity(type: "min" | "add") {
    if (type === "min" && currentItem?.qty === 1) {
      $cart.set(cart.filter(c => c.name !== name));
      return;
    }

    const updatedCart = cart.map(c => {
      if (c.name === name) {
        if (type === "min") return { ...c, qty: c.qty - 1 };
        return { ...c, qty: c.qty + 1 };
      }

      return c;
    });

    $cart.set(updatedCart);
  }

  if (currentItem) {
    return (
      <Button asChild className={`w-3/5 justify-between ${className}`}>
        <div data-selected>
          <button
            className="flex size-5 cursor-pointer items-center justify-center rounded-full border"
            onClick={() => adjustQuantity("min")}
          >
            <img src={MinusIcon.src} alt="" />
          </button>
          {currentItem.qty}
          <button
            className="flex size-5 cursor-pointer items-center justify-center rounded-full border"
            onClick={() => adjustQuantity("add")}
          >
            <img src={PlusIcon.src} alt="" />
          </button>
        </div>
      </Button>
    );
  }

  return (
    <Button variant="secondary" className={className} onClick={addToCart}>
      <img src={CartIcon.src} alt="" />
      Add to Cart
    </Button>
  );
}
