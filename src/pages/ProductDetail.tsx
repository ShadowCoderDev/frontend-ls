import { useParams, useNavigate } from "react-router-dom";
import { mockProducts } from "@/data/mockProducts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, ShoppingCart, Minus, Plus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">محصول یافت نشد</p>
        <Button onClick={() => navigate("/products")}>بازگشت به محصولات</Button>
      </div>
    );
  }

  const similarProducts = mockProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast({
      title: "افزوده شد",
      description: `${quantity} عدد ${product.name} به سبد خرید اضافه شد`,
    });
  };

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => navigate("/products")} className="gap-2">
        <ArrowRight className="h-4 w-4" />
        بازگشت به محصولات
      </Button>

      {/* Product Detail */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="border-2 border-foreground overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full aspect-square object-cover"
          />
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <Badge variant="outline" className="mb-3">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Star className="h-4 w-4 fill-current" />
              <span>{product.rating}</span>
            </div>
          </div>

          <p className="text-muted-foreground text-lg">{product.description}</p>

          <div>
            <p className="text-3xl font-bold">{formatPrice(product.price)}</p>
            {product.originalPrice && (
              <p className="text-lg text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </p>
            )}
          </div>

          {product.inStock ? (
            <Badge variant="secondary" className="text-sm">
              موجود در انبار
            </Badge>
          ) : (
            <Badge variant="destructive" className="text-sm">
              ناموجود
            </Badge>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <span className="font-medium">تعداد:</span>
            <div className="flex items-center border-2 border-foreground">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-none"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-none"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button
            size="lg"
            disabled={!product.inStock}
            onClick={handleAddToCart}
            className="w-full gap-2"
          >
            <ShoppingCart className="h-5 w-5" />
            افزودن به سبد خرید
          </Button>
        </div>
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div className="space-y-4 pt-8 border-t-2 border-foreground">
          <h2 className="text-xl font-bold">محصولات مشابه</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {similarProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => navigate(`/product/${p.id}`)}
                className="border-2 border-foreground p-3 cursor-pointer hover:shadow-md transition-shadow"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full aspect-square object-cover border-2 border-foreground mb-3"
                />
                <h3 className="font-medium text-sm truncate">{p.name}</h3>
                <p className="text-sm font-bold">{formatPrice(p.price)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
