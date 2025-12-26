import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, SlidersHorizontal, ChevronRight, ChevronLeft, ChevronDown,
  FileText, Users, Zap, Shield, CheckCircle, MapPin, Star, BadgeCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

// Mock data
const cities = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala', 'Hyderabad', 'Bahawalpur'];
const allCities = [...cities, 'Sargodha', 'Sukkur', 'Larkana', 'Sheikhupura', 'Rahim Yar Khan', 'Jhang', 'Dera Ghazi Khan', 'Gujrat', 'Sahiwal', 'Wah Cantonment', 'Mardan', 'Kasur'];

const featuredCars = [
  { id: 1, title: 'Toyota Corolla 2022', price: 5200000, city: 'Lahore', image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400', featured: true },
  { id: 2, title: 'Honda Civic 2021', price: 6500000, city: 'Karachi', image: 'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=400', featured: true },
  { id: 3, title: 'Suzuki Alto 2023', price: 2800000, city: 'Islamabad', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400', featured: true },
  { id: 4, title: 'Toyota Yaris 2022', price: 4500000, city: 'Rawalpindi', image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400', featured: true },
  { id: 5, title: 'Honda City 2020', price: 4200000, city: 'Faisalabad', image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=400', featured: true },
];

const managedCars = [
  { id: 6, title: 'Mercedes C-Class 2021', price: 12500000, city: 'Lahore', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400', managed: true },
  { id: 7, title: 'BMW 3 Series 2020', price: 11000000, city: 'Karachi', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400', managed: true },
  { id: 8, title: 'Audi A4 2022', price: 13500000, city: 'Islamabad', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400', managed: true },
  { id: 9, title: 'Toyota Land Cruiser 2019', price: 25000000, city: 'Lahore', image: 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?w=400', managed: true },
];

const brands = {
  Suzuki: ['Mehran', 'Alto', 'Cultus', 'Swift', 'Wagon R', 'Bolan'],
  Toyota: ['Corolla', 'Yaris', 'Camry', 'Fortuner', 'Land Cruiser', 'Prado'],
  Honda: ['Civic', 'City', 'BR-V', 'HR-V', 'Accord', 'Vezel'],
  Daihatsu: ['Cuore', 'Mira', 'Move', 'Hijet', 'Charade'],
  Nissan: ['Dayz', 'Sunny', 'Juke', 'Note', 'X-Trail'],
  Hyundai: ['Tucson', 'Elantra', 'Sonata', 'Santro', 'Porter'],
};

const categories = ['Automatic Cars', 'Family Cars', 'Small Cars', 'Big Cars', 'Imported Cars', 'Japanese Cars', 'Hybrid Cars', 'Electric Cars'];
const budgets = ['Under 5 Lakhs', 'Under 10 Lakhs', 'Under 20 Lakhs', 'Under 30 Lakhs', 'Under 50 Lakhs', 'Under 1 Crore', 'Above 1 Crore'];
const bodyTypes = ['Hatchback', 'Sedan', 'SUV', 'Crossover', 'Pickup', 'Van', 'MPV', 'Coupe'];
const years = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015];

const dealers = [
  { id: 1, name: 'Premium Auto Gallery', verified: true, inventory: 45 },
  { id: 2, name: 'City Motors Lahore', verified: true, inventory: 32 },
  { id: 3, name: 'Elite Car House', verified: true, inventory: 28 },
  { id: 4, name: 'AutoMax Karachi', verified: false, inventory: 18 },
];

const blogPosts = [
  { id: 1, title: 'Top 10 Fuel Efficient Cars in Pakistan 2024', excerpt: 'Discover the most economical cars for daily commute...' },
  { id: 2, title: 'How to Inspect a Used Car Before Buying', excerpt: 'Essential checklist for smart car buyers...' },
  { id: 3, title: 'Best Family Cars Under 50 Lakhs', excerpt: 'Spacious and safe options for your family...' },
];

const inspectionItems = ['Engine', 'Suspension', 'Exterior', 'Interior'];

// Horizontal Carousel Component
function HorizontalCarousel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="relative group">
      {canScrollLeft && (
        <button onClick={() => scroll('left')} className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-secondary/90 border border-border rounded-full items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all -translate-x-4">
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      <div ref={scrollRef} onScroll={checkScroll} className={`flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory ${className}`}>
        {children}
      </div>
      {canScrollRight && (
        <button onClick={() => scroll('right')} className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-secondary/90 border border-border rounded-full items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all translate-x-4">
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

// Car Card Component
function CarCard({ car, badge }: { car: { id: number; title: string; price: number; city: string; image: string }; badge?: string }) {
  return (
    <div className="min-w-[280px] md:min-w-[300px] snap-start listing-card group">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={car.image} alt={car.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        {badge && <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">{badge}</span>}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-1 truncate">{car.title}</h3>
        <p className="price-tag mb-2">PKR {(car.price / 100000).toFixed(1)} Lacs</p>
        <div className="flex items-center text-muted-foreground text-sm">
          <MapPin className="w-4 h-4 mr-1" />
          {car.city}
        </div>
      </div>
    </div>
  );
}

export default function UsedCars() {
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showAllCities, setShowAllCities] = useState(false);
  const [activeInspection, setActiveInspection] = useState(0);

  // Animate inspection items
  useState(() => {
    const interval = setInterval(() => {
      setActiveInspection((prev) => (prev + 1) % inspectionItems.length);
    }, 2000);
    return () => clearInterval(interval);
  });

  const displayedCities = showAllCities ? allCities : cities;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Find Used Cars in Pakistan</h1>
            <p className="text-muted-foreground text-lg">Thousands of verified listings — find the right ride for you.</p>
          </motion.div>

          {/* Search Bar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="max-w-4xl mx-auto">
            <div className="bg-card/95 backdrop-blur-sm border border-border/80 rounded-2xl p-4 md:p-6 shadow-card">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Car Make or Model" className="input-field w-full pl-12" />
                </div>
                <select value={city} onChange={(e) => setCity(e.target.value)} className="input-field">
                  <option value="">Select City</option>
                  {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <div className="flex gap-2">
                  <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="Min PKR" className="input-field w-full" />
                  <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Max PKR" className="input-field w-full" />
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                <Link to="/advanced-filters" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <SlidersHorizontal className="h-4 w-4" /> Advanced Filters <ChevronRight className="h-4 w-4" />
                </Link>
                <Button size="lg"><Search className="h-4 w-4 mr-2" /> Search</Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Strip */}
      <section className="py-8 bg-secondary">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[{ icon: FileText, title: 'Free Ad', desc: 'Post your car in seconds' }, { icon: Users, title: 'Genuine Buyers', desc: 'Verified user system' }, { icon: Zap, title: 'Sell Faster', desc: 'Better visibility & reach' }].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary"><item.icon className="w-6 h-6" /></div>
                <div><h4 className="font-semibold text-foreground">{item.title}</h4><p className="text-sm text-muted-foreground">{item.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Used Cars */}
      <section className="py-12 bg-background">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title mb-0">Featured Used Cars for Sale</h2>
            <Link to="#" className="text-primary hover:underline text-sm">View all featured used cars</Link>
          </div>
          <HorizontalCarousel>
            {featuredCars.map((car) => <CarCard key={car.id} car={car} badge="Featured" />)}
          </HorizontalCarousel>
        </div>
      </section>

      {/* Managed by RideZone */}
      <section className="py-12 bg-secondary">
        <div className="container">
          <h2 className="section-title">Managed by RideZone</h2>
          <HorizontalCarousel>
            {managedCars.map((car) => <CarCard key={car.id} car={car} badge="Managed" />)}
          </HorizontalCarousel>
        </div>
      </section>

      {/* Car Inspection Promotion */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">Never buy a used car without RideZone Inspection</h2>
              <p className="text-muted-foreground text-lg mb-6">200+ inspection checkpoints</p>
              <Button size="lg">Learn More</Button>
            </div>
            <div className="space-y-4">
              {inspectionItems.map((item, i) => (
                <motion.div key={item} animate={{ opacity: activeInspection === i ? 1 : 0.5, x: activeInspection === i ? 10 : 0 }} className="flex items-center gap-4 p-4 bg-secondary rounded-xl border border-border">
                  <CheckCircle className={`w-6 h-6 ${activeInspection === i ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className={`font-medium ${activeInspection === i ? 'text-foreground' : 'text-muted-foreground'}`}>{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Browse by City */}
      <section className="py-12 bg-secondary">
        <div className="container">
          <h2 className="section-title">Browse Used Cars by City</h2>
          <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            <AnimatePresence>
              {displayedCities.map((c) => (
                <motion.div key={c} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                  <Link to={`/used-cars/${c.toLowerCase()}`} className="block p-4 bg-card rounded-xl border border-border text-center hover:border-primary/50 hover:bg-muted transition-all">
                    <MapPin className="w-5 h-5 mx-auto mb-2 text-primary" />
                    <span className="text-sm font-medium text-foreground">{c}</span>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          <div className="text-center mt-6">
            <Button variant="outline" onClick={() => setShowAllCities(!showAllCities)}>
              {showAllCities ? 'Show Less' : 'View All Cities'} <ChevronDown className={`ml-2 w-4 h-4 transition-transform ${showAllCities ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Makes & Models */}
      <section className="py-12 bg-background">
        <div className="container">
          <h2 className="section-title">Used Cars by Popular Makes & Models</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(brands).map(([brand, models]) => (
              <div key={brand} className="bg-card rounded-xl border border-border p-5">
                <h3 className="font-bold text-foreground mb-3">{brand}</h3>
                <div className="flex flex-wrap gap-2">
                  {models.map((model) => (
                    <Link key={model} to={`/used-cars/${brand.toLowerCase()}/${model.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">{model}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By Category */}
      <section className="py-12 bg-secondary">
        <div className="container">
          <h2 className="section-title">Used Cars by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link key={cat} to={`/used-cars/category/${cat.toLowerCase().replace(' ', '-')}`} className="p-5 bg-card rounded-xl border border-border text-center hover:border-primary/50 hover:bg-muted transition-all">
                <span className="font-medium text-foreground">{cat}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* By Budget */}
      <section className="py-12 bg-background">
        <div className="container">
          <h2 className="section-title">Used Cars by Budget</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {budgets.map((b) => (
              <Link key={b} to={`/used-cars/budget/${b.toLowerCase().replace(/ /g, '-')}`} className="p-4 bg-card rounded-xl border border-border text-center hover:border-primary/50 hover:bg-muted transition-all">
                <span className="text-sm font-medium text-foreground">{b}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* By Body Type */}
      <section className="py-12 bg-secondary">
        <div className="container">
          <h2 className="section-title">Used Cars by Body Type</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
            {bodyTypes.map((type) => (
              <Link key={type} to={`/used-cars/body/${type.toLowerCase()}`} className="p-4 bg-card rounded-xl border border-border text-center hover:border-primary/50 hover:bg-muted transition-all">
                <span className="text-sm font-medium text-foreground">{type}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* By Year */}
      <section className="py-12 bg-background">
        <div className="container">
          <h2 className="section-title">Used Cars by Year</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-3">
            {years.map((year) => (
              <Link key={year} to={`/used-cars/year/${year}`} className="p-4 bg-card rounded-xl border border-border text-center hover:border-primary/50 hover:bg-muted transition-all">
                <span className="text-sm font-medium text-foreground">{year}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Dealers */}
      <section className="py-12 bg-secondary">
        <div className="container">
          <h2 className="section-title">Featured Dealers</h2>
          <HorizontalCarousel>
            {dealers.map((dealer) => (
              <div key={dealer.id} className="min-w-[280px] snap-start bg-card rounded-xl border border-border p-6 hover:border-primary/30 transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="font-semibold text-foreground">{dealer.name}</h3>
                  {dealer.verified && <BadgeCheck className="w-5 h-5 text-primary" />}
                </div>
                <p className="text-sm text-muted-foreground mb-4">{dealer.inventory} vehicles in inventory</p>
                <Button variant="outline" size="sm" className="w-full">View Inventory</Button>
              </div>
            ))}
          </HorizontalCarousel>
        </div>
      </section>

      {/* Blog / Tips */}
      <section className="py-12 bg-background">
        <div className="container">
          <h2 className="section-title">Used Car Advice & Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-card rounded-xl border border-border p-6 hover:border-primary/30 transition-all">
                <h3 className="font-semibold text-foreground mb-2">{post.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
                <Link to={`/blog/${post.id}`} className="text-primary text-sm hover:underline">Read More</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
