import { useMemo, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Add01Icon,
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ChevronDown,
  ChevronRight,
  ClothesIcon,
  CrownIcon,
  DeliveryReturn01Icon,
  DeliveryTruck01Icon,
  FilterHorizontalIcon,
  Globe02Icon,
  HandBagIcon,
  HeadphonesIcon,
  Home01Icon,
  HoodieIcon,
  JoggerPantsIcon,
  LockIcon,
  Minus,
  PackageIcon,
  RunningShoesIcon,
  Search01Icon,
  ShoppingCart01Icon,
  StarIcon,
  TShirtIcon,
  UserGroupIcon,
  UserIcon,
  ZoomInAreaIcon
} from "@hugeicons/core-free-icons";

type Page = "home" | "shop" | "product";
type ProductTag = "NEW" | "BEST SELLER" | "LIMITED" | "ARTIST PICK";

type Product = {
  id: string;
  name: string;
  price: string;
  category: string;
  image: string;
  tag: ProductTag;
  colors: string[];
  rating: string;
  sold: string;
};

type Category = {
  key: string;
  label: string;
  icon?: unknown;
  burst?: boolean;
};

const PINK = "#ff1b98";
const BLUE = "#2334ff";

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

const products: Product[] = [
  {
    id: "starburst-hoodie",
    name: "Starburst Hoodie",
    price: "$89.00",
    category: "hoodies",
    image: assetUrl("assets/products/starburst-hoodie.png"),
    tag: "NEW",
    colors: ["#050505", PINK, BLUE],
    rating: "4.9 (320)",
    sold: "2.1K+"
  },
  {
    id: "electric-jacket",
    name: "Electric Jacket",
    price: "$129.00",
    category: "jackets",
    image: assetUrl("assets/products/electric-jacket.png"),
    tag: "BEST SELLER",
    colors: [PINK, BLUE, "#050505"],
    rating: "4.8 (210)",
    sold: "1.8K+"
  },
  {
    id: "bold-logo-tee",
    name: "Bold Logo Tee",
    price: "$45.00",
    category: "tees",
    image: assetUrl("assets/products/bold-logo-tee.png"),
    tag: "LIMITED",
    colors: ["#050505", PINK],
    rating: "4.7 (150)",
    sold: "1.2K+"
  },
  {
    id: "stage-ready-sneaker",
    name: "Stage Ready Sneaker",
    price: "$149.00",
    category: "footwear",
    image: assetUrl("assets/products/stage-ready-sneaker.png"),
    tag: "NEW",
    colors: ["#050505", PINK, BLUE],
    rating: "4.9 (185)",
    sold: "1.6K+"
  },
  {
    id: "crossbody-bag",
    name: "Crossbody Bag",
    price: "$49.00",
    category: "accessories",
    image: assetUrl("assets/products/crossbody-bag.png"),
    tag: "LIMITED",
    colors: ["#050505", PINK],
    rating: "4.8 (120)",
    sold: "980+"
  },
  {
    id: "sunkim-patch-cap",
    name: "Sunkim Patch Cap",
    price: "$35.00",
    category: "accessories",
    image: assetUrl("assets/products/sunkim-patch-cap.png"),
    tag: "NEW",
    colors: ["#050505", PINK, BLUE],
    rating: "4.7 (98)",
    sold: "820+"
  },
  {
    id: "starburst-pants",
    name: "Starburst Pants",
    price: "$79.00",
    category: "pants",
    image: assetUrl("assets/products/starburst-pants.png"),
    tag: "ARTIST PICK",
    colors: [BLUE, PINK, "#050505"],
    rating: "4.8 (88)",
    sold: "760+"
  },
  {
    id: "sunkim-beanie",
    name: "Sunkim Beanie",
    price: "$28.00",
    category: "accessories",
    image: assetUrl("assets/products/sunkim-beanie.png"),
    tag: "NEW",
    colors: ["#050505", PINK],
    rating: "4.6 (74)",
    sold: "640+"
  },
  {
    id: "sunkim-headphones",
    name: "Sunkim Headphones",
    price: "$79.00",
    category: "accessories",
    image: assetUrl("assets/products/sunkim-headphones.png"),
    tag: "LIMITED",
    colors: ["#050505", PINK],
    rating: "4.8 (94)",
    sold: "710+"
  },
  {
    id: "sunkim-jacket-patch",
    name: "Sunkim Jacket Patch",
    price: "$12.00",
    category: "accessories",
    image: assetUrl("assets/products/sunkim-jacket-patch.png"),
    tag: "NEW",
    colors: ["#050505", PINK],
    rating: "4.6 (65)",
    sold: "540+"
  }
];

const categories: Category[] = [
  { key: "all", label: "All", burst: true },
  { key: "hoodies", label: "Hoodies", icon: HoodieIcon },
  { key: "jackets", label: "Jackets", icon: ClothesIcon },
  { key: "tees", label: "Tees", icon: TShirtIcon },
  { key: "pants", label: "Pants", icon: JoggerPantsIcon },
  { key: "footwear", label: "Footwear", icon: RunningShoesIcon },
  { key: "accessories", label: "Accessories", icon: HandBagIcon },
  { key: "limited", label: "Limited Drop", burst: true }
];

const detailImages = [
  { src: assetUrl("assets/products/starburst-hoodie-detail.png"), label: "Back view" },
  { src: assetUrl("assets/products/starburst-hoodie-front.png"), label: "Front view" },
  { src: assetUrl("assets/products/starburst-hoodie-print.png"), label: "Logo print" },
  { src: assetUrl("assets/products/starburst-hoodie-cuff.png"), label: "Cuff detail" }
];

function App() {
  const [page, setPage] = useState<Page>("home");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [selectedThumb, setSelectedThumb] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("#050505");
  const [quantity, setQuantity] = useState(1);
  const [cartCount, setCartCount] = useState(2);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") return products;
    if (selectedCategory === "limited") return products.filter((product) => product.tag === "LIMITED");
    return products.filter((product) => product.category === selectedCategory);
  }, [selectedCategory]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  const openHome = () => {
    setPage("home");
    scrollToTop();
  };

  const openShop = () => {
    setPage("shop");
    scrollToTop();
  };

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setSelectedThumb(0);
    setPage("product");
    scrollToTop();
  };

  const addToCart = () => {
    setCartCount((count) => count + quantity);
  };

  return (
    <main className="site-shell">
      <div className="page-frame">
        <Header page={page} cartCount={cartCount} onHome={openHome} onShop={openShop} />
        {page === "home" && <HomePage onShop={openShop} onProduct={openProduct} onAddToCart={() => setCartCount((count) => count + 1)} />}
        {page === "shop" && (
          <ShopPage
            products={filteredProducts}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onProduct={openProduct}
            onAddToCart={() => setCartCount((count) => count + 1)}
          />
        )}
        {page === "product" && (
          <ProductPage
            product={selectedProduct}
            selectedThumb={selectedThumb}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
            quantity={quantity}
            onThumb={setSelectedThumb}
            onSize={setSelectedSize}
            onColor={setSelectedColor}
            onQuantity={setQuantity}
            onAddToCart={addToCart}
            onQuickAdd={() => setCartCount((count) => count + 1)}
            onProduct={openProduct}
            onShop={openShop}
          />
        )}
      </div>
    </main>
  );
}

function Header({
  page,
  cartCount,
  onHome,
  onShop
}: {
  page: Page;
  cartCount: number;
  onHome: () => void;
  onShop: () => void;
}) {
  return (
    <header className="topbar">
      <nav className="nav-left" aria-label="Primary navigation">
        <button className="nav-link" type="button" onClick={onHome}>
          New In <span className="nav-dot" />
        </button>
        <button className={`nav-link ${page === "shop" ? "is-active" : ""}`} type="button" onClick={onShop}>
          Shop
        </button>
        <button className="nav-link" type="button">
          Collections
        </button>
        <button className="nav-link" type="button">
          Artists
        </button>
        <button className="nav-link" type="button">
          About
        </button>
      </nav>
      <button className="logo" type="button" onClick={onHome} aria-label="SUNKIM home">
        SUNKIM
        <span className="logo-burst" />
        <sup>R</sup>
      </button>
      <div className="nav-actions">
        <IconButton icon={Search01Icon} label="Search" />
        <IconButton icon={UserIcon} label="Account" />
        <IconButton icon={ShoppingCart01Icon} label="Cart" badge={cartCount} />
      </div>
    </header>
  );
}

function HomePage({
  onShop,
  onProduct,
  onAddToCart
}: {
  onShop: () => void;
  onProduct: (product: Product) => void;
  onAddToCart: () => void;
}) {
  return (
    <>
      <section className="hero hero-home">
        <div className="hero-copy">
          <p className="eyebrow">
            <Burst size="small" /> New wave. Bold looks. <span>Louder you.</span>
          </p>
          <h1>
            <span>Born To</span>
            <strong>Stand Out</strong>
          </h1>
          <h2>Streetwear for artists & performers</h2>
          <p className="lede">
            Stage ready. Artist minded. Designed to break the ordinary and built for those who move different.
          </p>
          <div className="hero-actions">
            <button className="btn btn-dark" type="button" onClick={onShop}>
              Shop New Drop <Icon icon={ArrowRight01Icon} />
            </button>
            <button className="btn btn-outline" type="button" onClick={onShop}>
              Explore Collection
            </button>
          </div>
          <p className="micro-slogan">
            <Burst size="tiny" /> Be seen. Be heard. <span>Be you.</span>
          </p>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="halftone halftone-blue" />
          <div className="halftone halftone-pink" />
          <div className="stroke stroke-a" />
          <div className="stroke stroke-b" />
          <Burst className="hero-burst hero-burst-top" />
          <Burst className="hero-burst hero-burst-small" />
          <ProductFloat product={products[0]} className="float-card float-hoodie" onProduct={onProduct} />
          <ProductFloat product={products[1]} className="float-card float-jacket" onProduct={onProduct} label="New drop" />
          <ProductFloat product={products[3]} className="float-card float-sneaker" onProduct={onProduct} />
          <img className="mascot mascot-front" src={assetUrl("assets/mascot/sunkim-front.png")} alt="" />
          <div className="shout-badge">
            <span>Be Seen.</span>
            <span>Be Heard.</span>
            <strong>Be You.</strong>
          </div>
        </div>
      </section>
      <StatsStrip />
      <CategoryRail selected="none" onSelect={() => undefined} />
      <SectionHeader title="Featured" action="View all products" />
      <ProductGrid products={products.slice(0, 6)} onProduct={onProduct} onAddToCart={onAddToCart} columns="six" />
      <TopSellers />
      <DiscoverRail />
    </>
  );
}

function ShopPage({
  products: visibleProducts,
  selectedCategory,
  onCategoryChange,
  onProduct,
  onAddToCart
}: {
  products: Product[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onProduct: (product: Product) => void;
  onAddToCart: () => void;
}) {
  return (
    <>
      <section className="shop-hero">
        <div className="shop-copy">
          <span className="pill-label">New Drop</span>
          <h1>
            New Drop
            <strong>Collection</strong>
          </h1>
          <h2>Bold threads. Louder vibes.</h2>
          <p>Fresh fits for artists, performers and rule breakers. Designed to stand out. Built to move different.</p>
        </div>
        <div className="shop-visual" aria-hidden="true">
          <div className="halftone halftone-blue" />
          <div className="halftone halftone-pink" />
          <ProductFloat product={products[3]} className="float-card shop-sneaker-card" onProduct={onProduct} />
          <img className="mascot shop-mascot" src={assetUrl("assets/mascot/sunkim-front.png")} alt="" />
          <div className="shout-badge shop-badge">
            <span>Be Seen.</span>
            <span>Be Heard.</span>
            <strong>Be You.</strong>
          </div>
          <Burst className="shop-burst-a" />
          <Burst className="shop-burst-b" tone="blue" />
        </div>
      </section>
      <CategoryRail selected={selectedCategory} onSelect={onCategoryChange} />
      <FilterBar />
      <ProductGrid products={visibleProducts} onProduct={onProduct} onAddToCart={onAddToCart} columns="five" />
      <CampaignBand onProduct={onProduct} />
      <Pagination />
      <GuaranteeStrip />
    </>
  );
}

function ProductPage({
  product,
  selectedThumb,
  selectedSize,
  selectedColor,
  quantity,
  onThumb,
  onSize,
  onColor,
  onQuantity,
  onAddToCart,
  onQuickAdd,
  onProduct,
  onShop
}: {
  product: Product;
  selectedThumb: number;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
  onThumb: (index: number) => void;
  onSize: (size: string) => void;
  onColor: (color: string) => void;
  onQuantity: (quantity: number) => void;
  onAddToCart: () => void;
  onQuickAdd: () => void;
  onProduct: (product: Product) => void;
  onShop: () => void;
}) {
  const related = products.filter((item) => item.id !== product.id).slice(3, 8);
  const detailProduct = products[0];

  return (
    <>
      <div className="breadcrumbs">
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          Home
        </button>
        <Icon icon={ChevronRight} size={14} />
        <button type="button" onClick={onShop}>
          Shop
        </button>
        <Icon icon={ChevronRight} size={14} />
        <span>Hoodies</span>
        <Icon icon={ChevronRight} size={14} />
        <strong>Starburst Hoodie</strong>
      </div>
      <section className="product-layout">
        <div className="gallery-column">
          <div className="thumb-rail">
            <button className="thumb-arrow" type="button" aria-label="Previous image">
              <Icon icon={ArrowDown01Icon} />
            </button>
            {detailImages.map((image, index) => (
              <button
                className={`thumb ${selectedThumb === index ? "is-selected" : ""}`}
                type="button"
                aria-pressed={selectedThumb === index}
                aria-label={image.label}
                onClick={() => onThumb(index)}
                key={image.label}
              >
                <img src={image.src} alt="" />
              </button>
            ))}
            <button className="thumb-arrow thumb-arrow-down" type="button" aria-label="Next image">
              <Icon icon={ArrowDown01Icon} />
            </button>
          </div>
          <div className="product-stage">
            <button className="zoom-btn" type="button" aria-label="Zoom product image">
              <Icon icon={ZoomInAreaIcon} />
            </button>
            <img src={detailImages[selectedThumb].src} alt="Starburst Hoodie" />
          </div>
          <SpecCards />
        </div>
        <aside className="product-info">
          <span className="pill-label">New Drop</span>
          <h1>Starburst Hoodie</h1>
          <p className="price">$89.00</p>
          <div className="rating-row">
            <span className="rating-stars" aria-label="4.9 out of 5">
              {Array.from({ length: 5 }).map((_, index) => (
                <Icon key={index} icon={StarIcon} size={18} />
              ))}
            </span>
            <strong>4.9 (320 reviews)</strong>
            <span className="stock">In Stock</span>
          </div>
          <p className="product-description">
            Make a statement. The Starburst Hoodie features bold neon graphics, premium heavyweight cotton, and an
            oversized streetwear fit. Designed for those who were born to stand out.
          </p>
          <FeatureList />
          <div className="choice-block">
            <div className="choice-title">Color: Black</div>
            <div className="swatches">
              {detailProduct.colors.map((color) => (
                <button
                  key={color}
                  className={`swatch ${selectedColor === color ? "is-selected" : ""}`}
                  type="button"
                  aria-pressed={selectedColor === color}
                  aria-label={`Select color ${color}`}
                  style={{ "--swatch": color } as React.CSSProperties}
                  onClick={() => onColor(color)}
                />
              ))}
              <button
                className={`swatch swatch-white ${selectedColor === "#ffffff" ? "is-selected" : ""}`}
                type="button"
                aria-pressed={selectedColor === "#ffffff"}
                aria-label="Select color white"
                onClick={() => onColor("#ffffff")}
              />
            </div>
          </div>
          <div className="choice-block">
            <div className="choice-title choice-title-row">
              Size:
              <button type="button" className="text-link">
                Size Guide
              </button>
            </div>
            <div className="sizes">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <button
                  key={size}
                  className={selectedSize === size ? "is-selected" : ""}
                  type="button"
                  aria-pressed={selectedSize === size}
                  onClick={() => onSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="choice-block">
            <div className="choice-title">Quantity:</div>
            <div className="quantity-stepper">
              <button
                type="button"
                aria-label="Decrease quantity"
                disabled={quantity === 1}
                onClick={() => onQuantity(Math.max(1, quantity - 1))}
              >
                <Icon icon={Minus} size={16} />
              </button>
              <output aria-label="Quantity">{quantity}</output>
              <button type="button" aria-label="Increase quantity" onClick={() => onQuantity(quantity + 1)}>
                <Icon icon={Add01Icon} size={16} />
              </button>
            </div>
          </div>
          <button className="btn btn-dark product-cta" type="button" onClick={onAddToCart}>
            Add To Cart <Icon icon={ShoppingCart01Icon} />
          </button>
          <button className="btn btn-pink product-cta" type="button">
            Buy Now
          </button>
          <p className="micro-slogan product-slogan">
            <Burst size="tiny" /> Be seen. Be heard. <span>Be you.</span>
          </p>
          <PromoCard />
        </aside>
      </section>
      <GuaranteeStrip compact />
      <SectionHeader title="Complete The Look" action="View all accessories" />
      <ProductGrid products={related} onProduct={onProduct} onAddToCart={onQuickAdd} columns="five" />
    </>
  );
}

function ProductGrid({
  products: gridProducts,
  onProduct,
  onAddToCart,
  columns
}: {
  products: Product[];
  onProduct: (product: Product) => void;
  onAddToCart: () => void;
  columns: "five" | "six";
}) {
  return (
    <div className={`product-grid product-grid-${columns}`}>
      {gridProducts.map((product) => (
        <ProductCard key={product.id} product={product} onProduct={onProduct} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}

function ProductCard({
  product,
  onProduct,
  onAddToCart
}: {
  product: Product;
  onProduct: (product: Product) => void;
  onAddToCart: () => void;
}) {
  return (
    <article className="product-card">
      <span className={`tag tag-${product.tag.toLowerCase().replaceAll(" ", "-")}`}>{product.tag}</span>
      <button className="product-view" type="button" aria-label={`View ${product.name}`} onClick={() => onProduct(product)}>
        <span className="product-image-shell">
          <img src={product.image} alt="" />
        </span>
        <span className="product-meta">
          <strong>{product.name}</strong>
          <span>{product.price}</span>
        </span>
      </button>
      <div className="product-card-footer">
        <ColorDots colors={product.colors} />
        <button className="round-add" type="button" aria-label={`Add ${product.name} to cart`} onClick={onAddToCart}>
          <Icon icon={Add01Icon} size={16} />
        </button>
      </div>
    </article>
  );
}

function ProductFloat({
  product,
  className,
  label,
  onProduct
}: {
  product: Product;
  className: string;
  label?: string;
  onProduct: (product: Product) => void;
}) {
  return (
    <button className={`product-float ${className}`} type="button" onClick={() => onProduct(product)}>
      {label && <span className="float-label">{label}</span>}
      <img src={product.image} alt="" />
      <span>
        <strong>{product.name}</strong>
        <em>{product.price}</em>
      </span>
      <i>
        <Icon icon={ArrowRight01Icon} size={16} />
      </i>
    </button>
  );
}

function CategoryRail({ selected, onSelect }: { selected: string; onSelect: (category: string) => void }) {
  return (
    <div className="category-rail" role="list" aria-label="Product categories">
      {categories.map((category) => (
        <button
          className={`chip ${selected === category.key ? "is-selected" : ""}`}
          key={category.key}
          type="button"
          aria-pressed={selected === category.key}
          onClick={() => onSelect(category.key)}
        >
          {category.burst ? <Burst size="tiny" /> : <Icon icon={category.icon} />}
          {category.label}
        </button>
      ))}
    </div>
  );
}

function FilterBar() {
  return (
    <div className="filter-bar" aria-label="Collection filters">
      <button className="filter-button filter-main" type="button">
        <Icon icon={FilterHorizontalIcon} /> Filters
      </button>
      {["Size", "Color", "Price", "Type"].map((filter) => (
        <button className="filter-button" type="button" key={filter}>
          {filter} <Icon icon={ChevronDown} size={15} />
        </button>
      ))}
      <div className="sort-control">
        <span>Sort By</span>
        <button className="select-button" type="button">
          Newest <Icon icon={ChevronDown} size={15} />
        </button>
      </div>
    </div>
  );
}

function StatsStrip() {
  const stats = [
    { icon: null, label: "Limited Drops", value: "12+", detail: "Exclusive releases", burst: true },
    { icon: Globe02Icon, label: "Products", value: "500+", detail: "Bold streetwear pieces" },
    { icon: CrownIcon, label: "Artist Collabs", value: "48+", detail: "Independent creators" },
    { icon: UserGroupIcon, label: "Global Community", value: "100K+", detail: "Creators worldwide" }
  ];

  return (
    <section className="stats-strip">
      {stats.map((stat) => (
        <div className="stat" key={stat.label}>
          {stat.burst ? <Burst /> : <Icon icon={stat.icon} size={42} />}
          <div>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
            <small>{stat.detail}</small>
          </div>
        </div>
      ))}
    </section>
  );
}

function TopSellers() {
  const sellers = products.slice(0, 6);
  return (
    <section className="top-sellers">
      <SectionHeader title="Top Sellers" action="View all" />
      <div className="seller-grid">
        {[sellers.slice(0, 3), sellers.slice(3, 6)].map((group, groupIndex) => (
          <div className="seller-table" key={groupIndex}>
            {group.map((product, index) => (
              <div className="seller-row" key={product.id}>
                <span className="seller-index">{String(groupIndex * 3 + index + 1).padStart(2, "0")}</span>
                <img src={product.image} alt="" />
                <strong>
                  {product.name}
                  <small>{product.price}</small>
                </strong>
                <span className="seller-rating">
                  <Icon icon={StarIcon} size={15} /> {product.rating}
                </span>
                <em>
                  {product.sold}
                  <small>Sold</small>
                </em>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function CampaignBand({ onProduct }: { onProduct: (product: Product) => void }) {
  return (
    <section className="campaign-band">
      <img src={assetUrl("assets/mascot/sunkim-point.png")} alt="" />
      <h2>
        Be Seen.
        <span>Be Heard.</span>
        <strong>Be You.</strong>
      </h2>
      <div>
        <Burst />
        <h3>Built For The Bold</h3>
        <p>Every piece is a statement. Every detail is intentional. This is more than streetwear - it is creative armor.</p>
        <button className="btn btn-dark" type="button" onClick={() => onProduct(products[0])}>
          Explore The Drop <Icon icon={ArrowRight01Icon} />
        </button>
      </div>
      <div className="stroke stroke-c" />
    </section>
  );
}

function PromoCard() {
  return (
    <aside className="promo-card">
      <div>
        <h2>
          Join The
          <strong>Movement</strong>
        </h2>
        <p>Be bold. Be fearless. Be SUNKIM.</p>
        <button className="btn btn-pink" type="button">
          Explore Now <Icon icon={ArrowRight01Icon} />
        </button>
      </div>
      <img src={assetUrl("assets/mascot/sunkim-point.png")} alt="" />
      <div className="halftone halftone-pink" />
    </aside>
  );
}

function SpecCards() {
  const specs = [
    { icon: PackageIcon, label: "Material", value: "100% Cotton Fleece" },
    { icon: TShirtIcon, label: "Fit", value: "Oversized Fit" },
    { icon: CrownIcon, label: "Weight", value: "420 GSM" },
    { icon: LockIcon, label: "Care", value: "Machine Wash Cold" }
  ];
  return (
    <div className="spec-cards">
      {specs.map((spec) => (
        <div key={spec.label}>
          <Icon icon={spec.icon} size={31} />
          <strong>{spec.label}</strong>
          <span>{spec.value}</span>
        </div>
      ))}
    </div>
  );
}

function FeatureList() {
  const features = [
    "Premium 100% Cotton Fleece",
    "Heavyweight 420 GSM",
    "Oversized Streetwear Fit",
    "Ribbed Cuffs & Hem",
    "Bold Neon Starburst Graphics",
    "Limited Edition Drop"
  ];
  const icons = [PackageIcon, StarIcon, HoodieIcon, ClothesIcon, StarIcon, CrownIcon];
  return (
    <div className="feature-list">
      {features.map((feature, index) => (
        <span key={feature}>
          <Icon icon={icons[index]} size={20} /> {feature}
        </span>
      ))}
    </div>
  );
}

function GuaranteeStrip({ compact = false }: { compact?: boolean }) {
  const items = [
    { icon: compact ? Globe02Icon : DeliveryTruck01Icon, label: compact ? "Worldwide Shipping" : "Worldwide Shipping", value: "Fast & reliable delivery" },
    { icon: compact ? DeliveryReturn01Icon : Globe02Icon, label: compact ? "Easy Returns" : "Secure Checkout", value: compact ? "30-day return policy" : "100% Secure Payments." },
    { icon: compact ? LockIcon : CrownIcon, label: compact ? "Secure Checkout" : "Artist Approved", value: compact ? "SSL encrypted payments" : "Created by creators." },
    { icon: null, label: "Easy Returns", value: "30-day returns & exchanges.", burst: true }
  ];
  const visible = compact ? items.slice(0, 3) : items;

  return (
    <section className={`guarantee-strip ${compact ? "is-compact" : ""}`}>
      {visible.map((item) => (
        <div key={item.label}>
          {item.burst ? <Burst /> : <Icon icon={item.icon} size={32} />}
          <strong>{item.label}</strong>
          <span>{item.value}</span>
        </div>
      ))}
    </section>
  );
}

function DiscoverRail() {
  const items = [
    { label: "Stage Ready", icon: null, tone: "blue" },
    { label: "Artist Minded", icon: CrownIcon },
    { label: "Limited Drop", icon: Globe02Icon, tone: "pink" },
    { label: "Bold Design", icon: null, tone: "blue" },
    { label: "Footwear", icon: RunningShoesIcon },
    { label: "Accessories", icon: HandBagIcon }
  ];

  return (
    <section className="discover-section">
      <SectionHeader title="Discover Your Style" action="Explore all" />
      <div className="category-rail discover-rail">
        {items.map((item) => (
          <button className="chip" type="button" key={item.label}>
            {item.icon ? <Icon icon={item.icon} /> : <Burst size="tiny" tone={item.tone === "blue" ? "blue" : "pink"} />}
            {item.label}
          </button>
        ))}
      </div>
    </section>
  );
}

function Pagination() {
  return (
    <div className="pagination">
      <span>Showing 1-10 of 42 products</span>
      <div>
        {[1, 2, 3, 4, 5].map((page) => (
          <button className={page === 1 ? "is-selected" : ""} type="button" aria-current={page === 1 ? "page" : undefined} key={page}>
            {page}
          </button>
        ))}
        <button type="button" aria-label="Next page">
          <Icon icon={ArrowRight01Icon} />
        </button>
      </div>
      <button className="btn btn-outline load-more" type="button">
        Load More <Icon icon={ArrowDown01Icon} />
      </button>
    </div>
  );
}

function SectionHeader({ title, action }: { title: string; action: string }) {
  return (
    <div className="section-header">
      <h2>
        <Burst size="tiny" /> {title}
      </h2>
      <button type="button">
        {action} <Icon icon={ArrowRight01Icon} />
      </button>
    </div>
  );
}

function ColorDots({ colors }: { colors: string[] }) {
  return (
    <span className="color-dots">
      {colors.map((color) => (
        <i key={color} style={{ "--dot": color } as React.CSSProperties} />
      ))}
    </span>
  );
}

function IconButton({ icon, label, badge }: { icon: unknown; label: string; badge?: number }) {
  return (
    <button className="icon-label-button" type="button" aria-label={label}>
      <Icon icon={icon} />
      <span>{label}</span>
      {badge !== undefined && <em>{badge}</em>}
    </button>
  );
}

function Icon({ icon, size = 22, className }: { icon: unknown; size?: number; className?: string }) {
  return <HugeiconsIcon icon={icon as never} size={size} strokeWidth={2} className={className} aria-hidden="true" />;
}

function Burst({
  className = "",
  size = "medium",
  tone = "pink"
}: {
  className?: string;
  size?: "tiny" | "small" | "medium";
  tone?: "pink" | "blue";
}) {
  return <span className={`burst burst-${size} burst-${tone} ${className}`} aria-hidden="true" />;
}

export default App;
