import { mockOrders, Order } from "@/data/mockProducts";
import { Badge } from "@/components/ui/badge";
import { Package, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
};

const getStatusColor = (status: Order["status"]) => {
  switch (status) {
    case "در انتظار":
      return "bg-muted text-muted-foreground";
    case "در حال پردازش":
      return "bg-accent text-accent-foreground";
    case "ارسال شده":
      return "bg-primary text-primary-foreground";
    case "تحویل داده شده":
      return "bg-foreground text-background";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const OrderCard = ({ order }: { order: Order }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-2 border-foreground bg-card">
      {/* Order Header */}
      <div
        className="p-4 cursor-pointer flex items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4">
          <div className="p-2 border-2 border-foreground">
            <Package className="h-5 w-5" />
          </div>
          <div>
            <p className="font-mono font-bold">{order.id}</p>
            <p className="text-sm text-muted-foreground">{order.date}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
          <p className="font-bold hidden sm:block">{formatPrice(order.total)}</p>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </div>
      </div>

      {/* Order Details */}
      {isExpanded && (
        <div className="border-t-2 border-foreground p-4">
          <p className="font-bold mb-3">آیتم‌های سفارش:</p>
          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 border-2 border-muted"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover border border-foreground"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    تعداد: {item.quantity}
                  </p>
                </div>
                <p className="font-bold">{formatPrice(item.product.price)}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t-2 border-dashed border-muted flex justify-between items-center">
            <span className="text-muted-foreground">جمع کل:</span>
            <span className="text-xl font-bold">{formatPrice(order.total)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

const Orders = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">سفارشات</h1>
        <p className="text-muted-foreground">{mockOrders.length} سفارش</p>
      </div>

      {/* Orders List */}
      {mockOrders.length > 0 ? (
        <div className="space-y-4">
          {mockOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed border-muted-foreground">
          <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">هنوز سفارشی ثبت نکرده‌اید</p>
        </div>
      )}
    </div>
  );
};

export default Orders;
