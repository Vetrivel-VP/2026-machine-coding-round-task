import React from "react";
import { IndianRupee, ShoppingCart } from "lucide-react";
import { useCartStore } from "../store/cart-store";
import { useSearchParams } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = React.useState([]);
  const [searchParams] = useSearchParams();

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const searchQuery = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const price = searchParams.get("price") || "";

  const filteredProducts = products.filter((item) => {
    let valid = true;

    if (searchQuery) {
      valid =
        valid && item.title.toLowerCase().includes(searchQuery.toLowerCase());
    }

    if (category) {
      valid = valid && item.category === category;
    }

    if (price) {
      valid = valid && item.price <= Number(price);
    }

    return valid;
  });

  return (
    <div className="col-span-3 bg-gray-50 flex-1 grid grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

const ProductCard = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  return (
    <div className="p-2.5 rounded-lg shadow-md relative space-y-4 h-50">
      <img
        className="aspect-video object-cover"
        src={product?.thumbnail ?? "https://via.placeholder.com/150"}
        alt={product?.title}
      />

      <div className="w-full flex items-center justify-between">
        <h2>{product?.title}</h2>
        <span className="flex items-center gap-1.5 ">
          <IndianRupee size={14} /> {product?.price}
        </span>
      </div>

      <button
        onClick={() => addToCart(product)}
        type="button"
        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-400 cursor-pointer flex items-center justify-center absolute top-3 right-3 hover:shadow-lg transition-all duration-150 ease-in-out group active:scale-95"
      >
        <ShoppingCart size={16} className="group-hover:text-white" />
      </button>
    </div>
  );
};

export default ProductList;
