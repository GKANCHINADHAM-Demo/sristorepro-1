import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : 0;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border bg-card shadow-card transition-all duration-300 hover:shadow-card-hover">
      <Link to={`/products/${product.slug}`} className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {hasDiscount && (
          <Badge className="absolute left-3 top-3 bg-destructive text-destructive-foreground">
            -{discountPercent}%
          </Badge>
        )}
        {product.inventory < 10 && product.inventory > 0 && (
          <Badge variant="secondary" className="absolute right-3 top-3">
            Low stock
          </Badge>
        )}
        {product.inventory === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <Badge variant="secondary">Out of stock</Badge>
          </div>
        )}
      </Link>
      
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 text-xs text-muted-foreground">{product.category}</div>
        <Link to={`/products/${product.slug}`}>
          <h3 className="font-medium line-clamp-2 hover:text-accent transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-auto pt-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-semibold">${product.price.toFixed(2)}</span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.compareAtPrice!.toFixed(2)}
              </span>
            )}
          </div>
          
          <Button
            variant="accent"
            size="sm"
            className="w-full"
            disabled={product.inventory === 0}
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
