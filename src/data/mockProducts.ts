export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  inStock: boolean;
  rating: number;
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "کیف چرم دستی",
    price: 1250000,
    originalPrice: 1500000,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
    category: "کیف",
    description: "کیف چرم طبیعی با طراحی مینیمال",
    inStock: true,
    rating: 4.5
  },
  {
    id: "2",
    name: "ساعت مچی کلاسیک",
    price: 3200000,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    category: "ساعت",
    description: "ساعت مچی با بند چرمی مشکی",
    inStock: true,
    rating: 4.8
  },
  {
    id: "3",
    name: "هدفون بی‌سیم",
    price: 2800000,
    originalPrice: 3500000,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    category: "الکترونیک",
    description: "هدفون با کیفیت صدای عالی",
    inStock: true,
    rating: 4.6
  },
  {
    id: "4",
    name: "کفش اسپرت",
    price: 1800000,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    category: "کفش",
    description: "کفش راحت برای استفاده روزانه",
    inStock: false,
    rating: 4.3
  },
  {
    id: "5",
    name: "عینک آفتابی",
    price: 980000,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
    category: "اکسسوری",
    description: "عینک آفتابی با فریم مشکی",
    inStock: true,
    rating: 4.4
  },
  {
    id: "6",
    name: "کوله پشتی",
    price: 1450000,
    originalPrice: 1700000,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    category: "کیف",
    description: "کوله پشتی مناسب لپ‌تاپ",
    inStock: true,
    rating: 4.7
  },
  {
    id: "7",
    name: "ماگ سرامیکی",
    price: 320000,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop",
    category: "خانه",
    description: "ماگ دست‌ساز با طرح مینیمال",
    inStock: true,
    rating: 4.2
  },
  {
    id: "8",
    name: "دفترچه یادداشت",
    price: 180000,
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&h=400&fit=crop",
    category: "لوازم‌التحریر",
    description: "دفترچه با جلد چرمی",
    inStock: true,
    rating: 4.5
  }
];

export interface Order {
  id: string;
  date: string;
  status: "در انتظار" | "در حال پردازش" | "ارسال شده" | "تحویل داده شده";
  total: number;
  items: {
    product: Product;
    quantity: number;
  }[];
}

export const mockOrders: Order[] = [
  {
    id: "ORD-001",
    date: "۱۴۰۳/۰۹/۱۵",
    status: "تحویل داده شده",
    total: 4450000,
    items: [
      { product: mockProducts[0], quantity: 1 },
      { product: mockProducts[1], quantity: 1 }
    ]
  },
  {
    id: "ORD-002",
    date: "۱۴۰۳/۱۰/۰۲",
    status: "ارسال شده",
    total: 2800000,
    items: [
      { product: mockProducts[2], quantity: 1 }
    ]
  },
  {
    id: "ORD-003",
    date: "۱۴۰۳/۱۰/۰۸",
    status: "در حال پردازش",
    total: 500000,
    items: [
      { product: mockProducts[6], quantity: 1 },
      { product: mockProducts[7], quantity: 1 }
    ]
  }
];

export const mockUser = {
  name: "علی احمدی",
  email: "ali@example.com",
  phone: "۰۹۱۲۱۲۳۴۵۶۷",
  address: "تهران، خیابان ولیعصر، پلاک ۱۲۳",
  joinDate: "۱۴۰۲/۰۶/۱۵"
};
