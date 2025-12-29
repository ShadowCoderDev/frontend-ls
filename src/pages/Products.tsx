import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { mockProducts, Product } from "@/data/mockProducts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Star, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
};

const ProductCard = ({ product, onClick }: { product: Product; onClick: () => void }) => {
  const { toast } = useToast();
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    toast({
      title: "افزوده شد",
      description: `${product.name} به سبد خرید اضافه شد`,
    });
  };

  return (
    <div 
      onClick={onClick}
      className="border-2 border-foreground bg-card group transition-all hover:shadow-md cursor-pointer"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden border-b-2 border-foreground">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <Badge variant="secondary" className="text-sm">
              ناموجود
            </Badge>
          </div>
        )}
        {product.originalPrice && product.inStock && (
          <Badge className="absolute top-2 left-2 bg-destructive">
            {Math.round((1 - product.price / product.originalPrice) * 100)}% تخفیف
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-xs">
            {product.category}
          </Badge>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-3 w-3 fill-current" />
            <span>{product.rating}</span>
          </div>
        </div>

        <h3 className="font-medium mb-2">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold">{formatPrice(product.price)}</p>
            {product.originalPrice && (
              <p className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </p>
            )}
          </div>
          <Button
            size="sm"
            disabled={!product.inStock}
            onClick={handleAddToCart}
            className="gap-1"
          >
            <ShoppingCart className="h-4 w-4" />
            خرید
          </Button>
        </div>
      </div>
    </div>
  );
};

const Products = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = new Set(mockProducts.map((p) => p.category));
    return Array.from(cats);
  }, []);

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const matchesSearch =
        product.name.includes(searchQuery) ||
        product.description.includes(searchQuery) ||
        product.category.includes(searchQuery);
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">محصولات</h1>
          <p className="text-muted-foreground">{filteredProducts.length} محصول</p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="جستجوی محصولات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory(null)}
        >
          همه
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={() => navigate(`/product/${product.id}`)} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed border-muted-foreground">
          <p className="text-muted-foreground">محصولی یافت نشد</p>
        </div>
      )}
    </div>
  );
};

export default Products;
