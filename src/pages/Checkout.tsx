import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, CreditCard, Wallet, Truck, ShoppingBag } from "lucide-react";

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
};

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shippingCost = 50000;
  const finalTotal = totalPrice + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      clearCart();
      toast({
        title: "سفارش ثبت شد",
        description: "سفارش شما با موفقیت ثبت شد و در حال پردازش است",
      });
      navigate("/orders");
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12 space-y-4">
        <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground" />
        <p className="text-muted-foreground">سبد خرید شما خالی است</p>
        <Button onClick={() => navigate("/products")}>مشاهده محصولات</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => navigate("/products")} className="gap-2">
        <ArrowRight className="h-4 w-4" />
        بازگشت به فروشگاه
      </Button>

      <h1 className="text-2xl font-bold">تکمیل سفارش</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Address Section */}
            <div className="border-2 border-foreground p-6 space-y-4">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Truck className="h-5 w-5" />
                آدرس تحویل
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">نام و نام خانوادگی</Label>
                  <Input id="fullName" placeholder="نام کامل" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">شماره تماس</Label>
                  <Input id="phone" placeholder="۰۹۱۲۱۲۳۴۵۶۷" required />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="province">استان</Label>
                  <Input id="province" placeholder="تهران" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">شهر</Label>
                  <Input id="city" placeholder="تهران" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">آدرس کامل</Label>
                <Textarea
                  id="address"
                  placeholder="خیابان، کوچه، پلاک، واحد..."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="postalCode">کد پستی</Label>
                <Input id="postalCode" placeholder="۱۲۳۴۵۶۷۸۹۰" required />
              </div>
            </div>

            {/* Payment Section */}
            <div className="border-2 border-foreground p-6 space-y-4">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                روش پرداخت
              </h2>

              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2 space-x-reverse border-2 border-foreground p-4 cursor-pointer">
                  <RadioGroupItem value="online" id="online" />
                  <Label htmlFor="online" className="flex items-center gap-2 cursor-pointer flex-1">
                    <CreditCard className="h-4 w-4" />
                    پرداخت آنلاین (درگاه بانکی)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse border-2 border-foreground p-4 cursor-pointer">
                  <RadioGroupItem value="wallet" id="wallet" />
                  <Label htmlFor="wallet" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Wallet className="h-4 w-4" />
                    کیف پول
                  </Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse border-2 border-foreground p-4 cursor-pointer">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Truck className="h-4 w-4" />
                    پرداخت در محل
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "در حال ثبت سفارش..." : "ثبت سفارش"}
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="border-2 border-foreground p-6 sticky top-24 space-y-4">
            <h2 className="text-lg font-bold">خلاصه سفارش</h2>

            <div className="space-y-3 max-h-64 overflow-auto">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover border-2 border-foreground"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.quantity} عدد
                    </p>
                    <p className="text-sm font-bold">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t-2 border-foreground pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>جمع محصولات:</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>هزینه ارسال:</span>
                <span>{formatPrice(shippingCost)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t-2 border-foreground">
                <span>مبلغ قابل پرداخت:</span>
                <span>{formatPrice(finalTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
