import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  carMakes,
  transmissions,
  fuelTypes,
  bodyTypes,
  conditions,
  engineCapacities,
} from '@/data/mockData';

interface HeroSearchProps {
  onSearch?: (filters: any) => void;
}

export function HeroSearch({ onSearch }: HeroSearchProps) {
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [yearFrom, setYearFrom] = useState('');
  const [yearTo, setYearTo] = useState('');
  const [transmission, setTransmission] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [condition, setCondition] = useState('');
  const [engineCapacity, setEngineCapacity] = useState('');

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 25 }, (_, i) => currentYear - i);

  const handleSearch = () => {
    onSearch?.({
      search,
      minPrice: minPrice ? parseInt(minPrice) : 0,
      maxPrice: maxPrice ? parseInt(maxPrice) : 0,
      make: selectedMake,
      model: selectedModel,
      yearFrom: yearFrom ? parseInt(yearFrom) : 0,
      yearTo: yearTo ? parseInt(yearTo) : 0,
      transmission,
      fuelType,
      bodyType,
      condition,
      engineCapacity,
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Main Search Bar */}
      <div className="bg-card/90 backdrop-blur-sm border border-border/50 rounded-2xl p-5 md:p-8 shadow-[0_8px_40px_-12px_hsla(0,0%,0%,0.8)]">
        {/* Search Inputs Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search Input - Takes more space */}
          <div className="md:col-span-6 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search cars, bikes, keywords..."
              className="w-full h-14 bg-muted/80 border-0 rounded-xl pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Min Price */}
          <div className="md:col-span-3">
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Min Price (PKR)"
              className="w-full h-14 bg-muted/80 border-0 rounded-xl px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Max Price */}
          <div className="md:col-span-3">
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Max Price (PKR)"
              className="w-full h-14 bg-muted/80 border-0 rounded-xl px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        {/* Action Row */}
        <div className="flex items-center justify-between mt-5">
          <Link
            to="/advanced-filters"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Advanced Filters
            <ChevronRight className="h-4 w-4" />
          </Link>

          <Button onClick={handleSearch} size="lg" className="h-12 px-8 rounded-xl">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
