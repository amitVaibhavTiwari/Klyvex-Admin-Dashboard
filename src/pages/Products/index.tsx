import React, { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  Button,
  IconButton,
  Grid,
  Paper,
  InputAdornment,
  Collapse,
  Rating,
  Avatar,
  Badge,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Menu,
  Tooltip,
  Stack,
  Container
} from '@mui/material';
import {
  FiSearch,
  FiFilter,
  FiGrid,
  FiList,
  FiMoreVertical,
  FiEdit3,
  FiTrash2,
  FiEye,
  FiStar,
  FiPackage,
  FiDollarSign,
  FiTrendingUp,
  FiAlertTriangle,
  FiPlus,
  FiDownload,
  FiChevronUp,
  FiChevronDown,
  FiX,
  FiHeart,
  FiShare2,
  FiShoppingCart
} from 'react-icons/fi';
import ProductsListing from './Components/ProductListing';
import { useNavigate } from 'react-router-dom';

// Mock product data  [ye use na ho rha]
const mockProducts = [
  {
    id: 'PRD-001',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-canceling wireless headphones with 30-hour battery life',
    price: 199.99,
    category: 'Electronics',
    brand: 'AudioTech',
    stock: 45,
    status: 'active',
    rating: 4.8,
    reviews: 324,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    sku: 'AT-WBH-001',
    createdAt: '2024-01-15',
    tags: ['wireless', 'bluetooth', 'audio', 'premium']
  },
  {
    id: 'PRD-002',
    name: 'Smart Fitness Tracker',
    description: 'Advanced fitness tracker with heart rate monitoring and GPS',
    price: 149.99,
    category: 'Wearables',
    brand: 'FitTech',
    stock: 23,
    status: 'active',
    rating: 4.5,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=300&h=300&fit=crop',
    sku: 'FT-SFT-002',
    createdAt: '2024-02-10',
    tags: ['fitness', 'tracker', 'health', 'smart']
  },
  {
    id: 'PRD-003',
    name: 'Gaming Mechanical Keyboard',
    description: 'RGB backlit mechanical keyboard with customizable switches',
    price: 129.99,
    category: 'Gaming',
    brand: 'GameMaster',
    stock: 8,
    status: 'low_stock',
    rating: 4.7,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=300&fit=crop',
    sku: 'GM-MK-003',
    createdAt: '2024-03-05',
    tags: ['gaming', 'keyboard', 'mechanical', 'rgb']
  },
  {
    id: 'PRD-004',
    name: 'Smartphone Case',
    description: 'Durable protective case with wireless charging support',
    price: 29.99,
    category: 'Accessories',
    brand: 'ProtectPro',
    stock: 150,
    status: 'active',
    rating: 4.3,
    reviews: 421,
    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300&h=300&fit=crop',
    sku: 'PP-SC-004',
    createdAt: '2024-03-20',
    tags: ['case', 'protection', 'wireless', 'smartphone']
  },
  {
    id: 'PRD-005',
    name: 'Portable Power Bank',
    description: '20000mAh fast-charging power bank with USB-C and wireless charging',
    price: 59.99,
    category: 'Electronics',
    brand: 'PowerPlus',
    stock: 67,
    status: 'active',
    rating: 4.6,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=300&fit=crop',
    sku: 'PP-PB-005',
    createdAt: '2024-04-12',
    tags: ['power', 'bank', 'charging', 'portable']
  },
  {
    id: 'PRD-006',
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with adjustable DPI and long battery life',
    price: 49.99,
    category: 'Accessories',
    brand: 'TechFlow',
    stock: 0,
    status: 'out_of_stock',
    rating: 4.4,
    reviews: 167,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop',
    sku: 'TF-WM-006',
    createdAt: '2024-05-01',
    tags: ['mouse', 'wireless', 'ergonomic', 'gaming']
  }
];

type Product = typeof mockProducts[0];
type ViewMode = 'grid' | 'list';
type SortField = 'name' | 'price' | 'stock' | 'rating' | 'createdAt';
type SortOrder = 'asc' | 'desc';

const ProductsPage: React.FC = () => {
  const [products] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate()

  // Get unique categories and brands
  const categories = useMemo(() =>
    [...new Set(products.map(p => p.category))], [products]
  );

  const brands = useMemo(() =>
    [...new Set(products.map(p => p.brand))], [products]
  );

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;
      const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;

      const matchesPrice =
        (priceRange.min === '' || product.price >= parseFloat(priceRange.min)) &&
        (priceRange.max === '' || product.price <= parseFloat(priceRange.max));

      return matchesSearch && matchesCategory && matchesBrand && matchesStatus && matchesPrice;
    });

    // Sort products
    filtered.sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [products, searchTerm, selectedCategory, selectedBrand, selectedStatus, priceRange, sortField, sortOrder]);

  // Stats
  const stats = useMemo(() => {
    const totalProducts = products.length;
    const activeProducts = products.filter(p => p.status === 'active').length;
    const lowStockProducts = products.filter(p => p.status === 'low_stock').length;
    const outOfStockProducts = products.filter(p => p.status === 'out_of_stock').length;
    const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);

    return {
      totalProducts,
      activeProducts,
      lowStockProducts,
      outOfStockProducts,
      totalValue
    };
  }, [products]);
  ;

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSelectedStatus('all');
    setPriceRange({ min: '', max: '' });
  };


  return (
    <Container sx={{ py: 3, bgcolor: 'background.default' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Products
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<FiDownload size={16} />}
            >
              Export
            </Button>
            <Button
              onClick={() => navigate("/add-product")}
              variant="contained"
              startIcon={<FiPlus size={16} />}
            >
              Add Product
            </Button>
          </Stack>
        </Box>
        <Typography variant="body1" color="text.secondary">
          Manage your product inventory and catalog
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.light' }}>
                  <FiPackage size={20} />
                </Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Products
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {stats.totalProducts}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'success.light' }}>
                  <FiTrendingUp size={20} />
                </Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Active
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {stats.activeProducts}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'warning.light' }}>
                  <FiAlertTriangle size={20} />
                </Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Low Stock
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {stats.lowStockProducts}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'error.light' }}>
                  <FiX size={20} />
                </Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Out of Stock
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {stats.outOfStockProducts}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'secondary.light' }}>
                  <FiDollarSign size={20} />
                </Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Value
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    ${stats.totalValue.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search and Filters */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
          {/* Search */}
          <TextField
            fullWidth
            placeholder="Search products by name, SKU, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FiSearch size={20} />
                </InputAdornment>
              ),
            }}
          />

          {/* Filter Toggle */}
          <Button
            variant="outlined"
            onClick={() => setShowFilters(!showFilters)}
            startIcon={<FiFilter size={16} />}
            endIcon={showFilters ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
            sx={{ minWidth: 120 }}
          >
            Filters
          </Button>


        </Stack>

        {/* Filters Panel */}
        <Collapse in={showFilters}>
          <Divider sx={{ my: 3 }} />
          <Grid container spacing={3}>
            {/* Category Filter */}
            <Grid item xs={12} sm={6} md={2.4}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  label="Category"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  {categories.map(category => (
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Brand Filter */}
            <Grid item xs={12} sm={6} md={2.4}>
              <FormControl fullWidth>
                <InputLabel>Brand</InputLabel>
                <Select
                  value={selectedBrand}
                  label="Brand"
                  onChange={(e) => setSelectedBrand(e.target.value)}
                >
                  <MenuItem value="all">All Brands</MenuItem>
                  {brands.map(brand => (
                    <MenuItem key={brand} value={brand}>{brand}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Status Filter */}
            <Grid item xs={12} sm={6} md={2.4}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={selectedStatus}
                  label="Status"
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="low_stock">Low Stock</MenuItem>
                  <MenuItem value="out_of_stock">Out of Stock</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Price Range */}
            <Grid item xs={12} sm={6} md={2.4}>
              <TextField
                fullWidth
                label="Min Price"
                type="number"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                inputProps={{ min: 0 }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={2.4}>
              <TextField
                fullWidth
                label="Max Price"
                type="number"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                inputProps={{ min: 0 }}
              />
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
            <Button onClick={clearFilters} color="inherit">
              Clear all filters
            </Button>
            <Typography variant="body2" color="text.secondary">
              {filteredProducts.length} of {products.length} products
            </Typography>
          </Box>
        </Collapse>
      </Paper>

      {/* Sort and Results */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="body1" color="text.secondary">
          Showing {filteredProducts.length} products
        </Typography>

        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Sort by</InputLabel>
          <Select
            value={`${sortField}-${sortOrder}`}
            label="Sort by"
            onChange={(e) => {
              const [field, order] = e.target.value.split('-');
              setSortField(field as SortField);
              setSortOrder(order as SortOrder);
            }}
          >
            <MenuItem value="name-asc">Name (A-Z)</MenuItem>
            <MenuItem value="name-desc">Name (Z-A)</MenuItem>
            <MenuItem value="price-asc">Price (Low to High)</MenuItem>
            <MenuItem value="price-desc">Price (High to Low)</MenuItem>
            <MenuItem value="rating-desc">Rating (High to Low)</MenuItem>
            <MenuItem value="stock-desc">Stock (High to Low)</MenuItem>
            <MenuItem value="createdAt-desc">Newest First</MenuItem>
            <MenuItem value="createdAt-asc">Oldest First</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Products Grid/List */}
      <ProductsListing />
    </Container>
  );
};

export default ProductsPage;