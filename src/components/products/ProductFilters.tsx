import { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { mockCategories } from '@/data/mockData';

interface ProductFiltersProps {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  inStockOnly: boolean;
  onInStockChange: (value: boolean) => void;
  onClearFilters: () => void;
}

export function ProductFilters({
  selectedCategories,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  inStockOnly,
  onInStockChange,
  onClearFilters,
}: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasFilters = selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 1000 || inStockOnly;

  const handleCategoryToggle = (categorySlug: string) => {
    if (selectedCategories.includes(categorySlug)) {
      onCategoryChange(selectedCategories.filter(c => c !== categorySlug));
    } else {
      onCategoryChange([...selectedCategories, categorySlug]);
    }
  };

  const FiltersContent = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium mb-4">Categories</h4>
        <div className="space-y-3">
          {mockCategories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.slug}
                checked={selectedCategories.includes(category.slug)}
                onCheckedChange={() => handleCategoryToggle(category.slug)}
              />
              <Label htmlFor={category.slug} className="text-sm font-normal cursor-pointer">
                {category.name}
                <span className="ml-1 text-muted-foreground">({category.productCount})</span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="font-medium mb-4">Price Range</h4>
        <Slider
          value={priceRange}
          onValueChange={(value) => onPriceRangeChange(value as [number, number])}
          min={0}
          max={1000}
          step={10}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="font-medium mb-4">Availability</h4>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="in-stock"
            checked={inStockOnly}
            onCheckedChange={(checked) => onInStockChange(checked as boolean)}
          />
          <Label htmlFor="in-stock" className="text-sm font-normal cursor-pointer">
            In stock only
          </Label>
        </div>
      </div>

      {hasFilters && (
        <>
          <Separator />
          <Button variant="outline" className="w-full" onClick={onClearFilters}>
            <X className="mr-2 h-4 w-4" />
            Clear all filters
          </Button>
        </>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24">
          <h3 className="text-lg font-semibold mb-6">Filters</h3>
          <FiltersContent />
        </div>
      </div>

      {/* Mobile Filters */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
              {hasFilters && (
                <span className="ml-2 rounded-full bg-accent px-2 py-0.5 text-xs text-accent-foreground">
                  Active
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FiltersContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
