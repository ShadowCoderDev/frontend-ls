import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
};

const CartDrawer = () => {
  const navigate = useNavigate();
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const [open, setOpen] = useState(false);

  const handleCheckout = () => {
    setOpen(false);
    navigate("/checkout");
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="border-b-2 border-foreground pb-4">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            سبد خرید
            {totalItems > 0 && (
              <Badge variant="secondary">{totalItems} محصول</Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">سبد خرید شما خالی است</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto py-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 border-2 border-foreground p-3"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover border-2 border-foreground"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{item.product.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {formatPrice(item.product.price)}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border-2 border-foreground">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t-2 border-foreground pt-4 space-y-4">
              <div className="flex items-center justify-between font-bold text-lg">
                <span>جمع کل:</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={clearCart} className="flex-1">
                  پاک کردن
                </Button>
                <Button className="flex-1" onClick={handleCheckout}>
                  تکمیل سفارش
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
