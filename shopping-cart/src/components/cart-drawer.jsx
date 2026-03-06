import React from "react";
import { useCartStore } from "../store/cart-store";
import { IndianRupee, ShoppingCart, Trash } from "lucide-react";

const CartDrawer = () => {
  const {
    cart,
    addToCart,
    increaseQty,
    decreaseQty,
    removeItem,
    clearCart,
    getTotal,
  } = useCartStore();

  console.log(cart);

  return (
    <div className="col-span-2 bg-gray-100 rounded-lg p-2.5 border border-gray-300 space-y-2.5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Shopping Cart {cart.length > 0 && <span>({cart.length})</span>}
        </h2>

        {cart.length > 0 && (
          <button className="cursor-pointer" type="button" onClick={clearCart}>
            Clear Cart
          </button>
        )}
      </div>

      {cart.length === 0 && (
        <div className="flex-1 w-full flex flex-col gap-4 items-center justify-center min-h-40">
          <ShoppingCart size={24} className="text-neutral-600" />
          <h2>Your cart is empty</h2>
        </div>
      )}

      <div className="space-y-2.5">
        {cart.map((item) => (
          <div
            key={item.id}
            className="w-full bg-white p-2.5 rounded-lg hover:shadow-lg transition-all duration-150 ease-in-out flex items-start gap-2"
          >
            <img
              className="aspect-square object-contain w-24"
              src={item.thumbnail ?? "https://via.placeholder.com/150"}
              alt={item.title}
            />

            <div className="space-y-2.5 flex flex-col items-start">
              <h2>{item.title}</h2>
              <div className="flex items-center justify-center gap-1.5">
                <button
                  type="button"
                  onClick={() => decreaseQty(item.id)}
                  className="border border-gray-200 w-8 h-8 min-w-8 min-h-8 flex items-center justify-center rounded-md cursor-pointer hover:shadow-lg transition-all duration-150 ease-in-out active:scale-95"
                >
                  -
                </button>
                <button className="border border-gray-200 w-8 h-8 min-w-8 min-h-8 flex items-center justify-center rounded-md cursor-pointer hover:shadow-lg transition-all duration-150 ease-in-out active:scale-95">
                  {item.quantity}
                </button>
                <button
                  type="button"
                  onClick={() => increaseQty(item.id)}
                  className="border border-gray-200 w-8 h-8 min-w-8 min-h-8 flex items-center justify-center rounded-md cursor-pointer hover:shadow-lg transition-all duration-150 ease-in-out active:scale-95"
                >
                  +
                </button>
              </div>

              <h2>
                Price :{" "}
                <span className="flex items-center gap-1.5 ">
                  <IndianRupee size={14} /> {item?.price * item.quantity}
                </span>
              </h2>
            </div>

            <button
              type="button"
              onClick={() => removeItem(item.id)}
              className="w-8 h-8 min-w-8 min-h-8 flex items-center justify-center rounded-md cursor-pointer transition-all duration-150 ease-in-out active:scale-95 ml-auto group"
            >
              <Trash
                size={16}
                className="group-hover:text-red-700 group-hover:fill-red-300"
              />
            </button>
          </div>
        ))}
      </div>
      {cart.length > 0 && (
        <div className="w-full flex items-center justify-end">
          <h2 className="flex items-center gap-2 text-2xl">
            Total :{" "}
            <span className="flex items-center gap-1.5 ">
              <IndianRupee size={14} /> {getTotal()}
            </span>
          </h2>
        </div>
      )}
    </div>
  );
};

export default CartDrawer;
