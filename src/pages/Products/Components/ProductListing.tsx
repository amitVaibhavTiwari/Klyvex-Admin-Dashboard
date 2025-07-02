// import React, { useState } from 'react';
// import {
//     Box,
//     Card,
//     CardContent,
//     CardMedia,
//     Typography,
//     Grid,
//     Pagination,
//     Chip,
//     IconButton,
//     Menu,
//     MenuItem,
//     useTheme,
//     useMediaQuery,
// } from '@mui/material';
// import {
//     FiMoreVertical,
//     FiEdit,
//     FiTrash2,
//     FiEye,
//     FiDollarSign
// } from 'react-icons/fi';

// // Product interface
// interface Product {
//     id: number;
//     name: string;
//     description: string;
//     price: number;
//     image: string;
//     category: string;
//     stock: number;
//     status: 'active' | 'inactive' | 'out_of_stock';
// }

// // Mock data - replace with your actual data
// const mockProducts: Product[] = [
//     {
//         id: 1,
//         name: 'Wireless Headphones',
//         description: 'High-quality wireless headphones with noise cancellation',
//         price: 199.99,
//         image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop',
//         category: 'Electronics',
//         stock: 45,
//         status: 'active'
//     },
//     {
//         id: 2,
//         name: 'Smart Watch',
//         description: 'Advanced fitness tracking and notifications',
//         price: 299.99,
//         image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop',
//         category: 'Electronics',
//         stock: 23,
//         status: 'active'
//     },
//     {
//         id: 3,
//         name: 'Coffee Maker',
//         description: 'Premium automatic coffee brewing system',
//         price: 149.99,
//         image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop',
//         category: 'Appliances',
//         stock: 0,
//         status: 'out_of_stock'
//     },
//     {
//         id: 4,
//         name: 'Desk Lamp',
//         description: 'Modern LED desk lamp with adjustable brightness',
//         price: 79.99,
//         image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
//         category: 'Furniture',
//         stock: 12,
//         status: 'active'
//     },
//     {
//         id: 5,
//         name: 'Bluetooth Speaker',
//         description: 'Portable speaker with excellent sound quality',
//         price: 89.99,
//         image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=200&fit=crop',
//         category: 'Electronics',
//         stock: 8,
//         status: 'inactive'
//     },
//     {
//         id: 6,
//         name: 'Ergonomic Chair',
//         description: 'Comfortable office chair with lumbar support',
//         price: 299.99,
//         image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop',
//         category: 'Furniture',
//         stock: 15,
//         status: 'active'
//     }
// ];

// interface ProductsListingProps {
//     products?: Product[];
//     onEdit?: (product: Product) => void;
//     onDelete?: (productId: number) => void;
//     onView?: (product: Product) => void;
// }

// const ProductsListing: React.FC<ProductsListingProps> = ({
//     products = mockProducts,
//     onEdit,
//     onDelete,
//     onView
// }) => {
//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//     const [page, setPage] = useState(1);
//     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//     const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

//     const itemsPerPage = 2;
//     const totalPages = Math.ceil(products.length / itemsPerPage);

//     const currentProducts = products.slice(
//         (page - 1) * itemsPerPage,
//         page * itemsPerPage
//     );

//     const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
//         setPage(value);
//     };

//     const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, product: Product) => {
//         setAnchorEl(event.currentTarget);
//         setSelectedProduct(product);
//     };

//     const handleMenuClose = () => {
//         setAnchorEl(null);
//         setSelectedProduct(null);
//     };

//     const getStatusColor = (status: Product['status']) => {
//         switch (status) {
//             case 'active':
//                 return 'success';
//             case 'inactive':
//                 return 'default';
//             case 'out_of_stock':
//                 return 'error';
//             default:
//                 return 'default';
//         }
//     };

//     const getStatusLabel = (status: Product['status']) => {
//         switch (status) {
//             case 'active':
//                 return 'Active';
//             case 'inactive':
//                 return 'Inactive';
//             case 'out_of_stock':
//                 return 'Out of Stock';
//             default:
//                 return status;
//         }
//     };

//     return (
//         <Box sx={{ p: 3 }}>
//             {/* Products Grid */}
//             <Grid container spacing={3}>
//                 {currentProducts.map((product) => (
//                     <Grid item xs={12} sm={6} md={4} key={product.id}>
//                         <Card
//                             sx={{
//                                 height: '100%',
//                                 display: 'flex',
//                                 flexDirection: 'column',
//                                 transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
//                                 '&:hover': {
//                                     transform: 'translateY(-4px)',
//                                     boxShadow: theme.shadows[8],
//                                 }
//                             }}
//                         >
//                             <CardMedia
//                                 component="img"
//                                 height="200"
//                                 image={product.image}
//                                 alt={product.name}
//                                 sx={{ objectFit: 'cover' }}
//                             />

//                             <CardContent sx={{ flexGrow: 1, position: 'relative' }}>
//                                 {/* Action Menu Button */}
//                                 <IconButton
//                                     size="small"
//                                     onClick={(e) => handleMenuOpen(e, product)}
//                                     sx={{
//                                         position: 'absolute',
//                                         top: 8,
//                                         right: 8,
//                                         backgroundColor: 'rgba(255, 255, 255, 0.9)',
//                                         '&:hover': {
//                                             backgroundColor: 'rgba(255, 255, 255, 1)',
//                                         }
//                                     }}
//                                 >
//                                     <FiMoreVertical size={16} />
//                                 </IconButton>

//                                 {/* Product Info */}
//                                 <Typography variant="h6" component="div" gutterBottom>
//                                     {product.name}
//                                 </Typography>

//                                 <Typography
//                                     variant="body2"
//                                     color="text.secondary"
//                                     sx={{
//                                         mb: 2,
//                                         overflow: 'hidden',
//                                         textOverflow: 'ellipsis',
//                                         display: '-webkit-box',
//                                         WebkitLineClamp: 2,
//                                         WebkitBoxOrient: 'vertical',
//                                     }}
//                                 >
//                                     {product.description}
//                                 </Typography>

//                                 {/* Price and Category */}
//                                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                                     <FiDollarSign size={16} />
//                                     <Typography variant="h6" sx={{ ml: 0.5, fontWeight: 'bold' }}>
//                                         {product.price.toFixed(2)}
//                                     </Typography>
//                                 </Box>

//                                 <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//                                     Category: {product.category}
//                                 </Typography>

//                                 {/* Status and Stock */}
//                                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                                     <Chip
//                                         label={getStatusLabel(product.status)}
//                                         color={getStatusColor(product.status)}
//                                         size="small"
//                                     />
//                                     <Typography variant="body2" color="text.secondary">
//                                         Stock: {product.stock}
//                                     </Typography>
//                                 </Box>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>

//             {/* Action Menu */}
//             <Menu
//                 anchorEl={anchorEl}
//                 open={Boolean(anchorEl)}
//                 onClose={handleMenuClose}
//                 anchorOrigin={{
//                     vertical: 'bottom',
//                     horizontal: 'right',
//                 }}
//                 transformOrigin={{
//                     vertical: 'top',
//                     horizontal: 'right',
//                 }}
//             >
//                 <MenuItem
//                     onClick={() => {
//                         if (selectedProduct && onView) onView(selectedProduct);
//                         handleMenuClose();
//                     }}
//                 >
//                     <FiEye size={16} style={{ marginRight: 8 }} />
//                     View Details
//                 </MenuItem>
//                 <MenuItem
//                     onClick={() => {
//                         if (selectedProduct && onEdit) onEdit(selectedProduct);
//                         handleMenuClose();
//                     }}
//                 >
//                     <FiEdit size={16} style={{ marginRight: 8 }} />
//                     Edit Product
//                 </MenuItem>
//                 <MenuItem
//                     onClick={() => {
//                         if (selectedProduct && onDelete) onDelete(selectedProduct.id);
//                         handleMenuClose();
//                     }}
//                     sx={{ color: 'error.main' }}
//                 >
//                     <FiTrash2 size={16} style={{ marginRight: 8 }} />
//                     Delete Product
//                 </MenuItem>
//             </Menu>

//             {/* Pagination */}
//             {totalPages > 1 && (
//                 <Box
//                     sx={{
//                         display: 'flex',
//                         justifyContent: 'center',
//                         mt: 4,
//                         mb: 2
//                     }}
//                 >
//                     <Pagination
//                         count={totalPages}
//                         page={page}
//                         onChange={handlePageChange}
//                         color="primary"
//                         size={isMobile ? 'small' : 'medium'}
//                         showFirstButton
//                         showLastButton
//                         sx={{
//                             '& .MuiPaginationItem-root': {
//                                 fontSize: isMobile ? '0.875rem' : '1rem',
//                             }
//                         }}
//                     />
//                 </Box>
//             )}

//             {/* Empty State */}
//             {products.length === 0 && (
//                 <Box
//                     sx={{
//                         textAlign: 'center',
//                         py: 8,
//                         color: 'text.secondary'
//                     }}
//                 >
//                     <Typography variant="h6" gutterBottom>
//                         No products found
//                     </Typography>
//                     <Typography variant="body2">
//                         There are no products to display at the moment.
//                     </Typography>
//                 </Box>
//             )}
//         </Box>
//     );
// };

// export default ProductsListing;


import React, { useState } from 'react';
import {
    Box,
    Card,
    Typography,
    Chip,
    IconButton,
    Menu,
    MenuItem,
    Avatar,
    Divider,
    useTheme,
    useMediaQuery,
    Stack,
    Button,
    Container,
} from '@mui/material';
import {
    FiMoreVertical,
    FiEdit,
    FiTrash2,
    FiEye,
    FiDollarSign,
    FiPackage,
    FiChevronLeft,
    FiChevronRight,
    FiChevronsLeft,
    FiChevronsRight
} from 'react-icons/fi';

// Product interface
interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    stock: number;
    status: 'active' | 'inactive' | 'out_of_stock';
}

// Mock data - replace with your actual data
const mockProducts: Product[] = [
    {
        id: 1,
        name: 'Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop',
        category: 'Electronics',
        stock: 45,
        status: 'active'
    },
    {
        id: 2,
        name: 'Smart Watch',
        description: 'Advanced fitness tracking and notifications',
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop',
        category: 'Electronics',
        stock: 23,
        status: 'active'
    },
    {
        id: 3,
        name: 'Coffee Maker',
        description: 'Premium automatic coffee brewing system',
        price: 149.99,
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=80&h=80&fit=crop',
        category: 'Appliances',
        stock: 0,
        status: 'out_of_stock'
    },
    {
        id: 4,
        name: 'Desk Lamp',
        description: 'Modern LED desk lamp with adjustable brightness',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
        category: 'Furniture',
        stock: 12,
        status: 'active'
    },
    {
        id: 5,
        name: 'Bluetooth Speaker',
        description: 'Portable speaker with excellent sound quality',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=80&h=80&fit=crop',
        category: 'Electronics',
        stock: 8,
        status: 'inactive'
    },
    {
        id: 6,
        name: 'Ergonomic Chair',
        description: 'Comfortable office chair with lumbar support',
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=80&h=80&fit=crop',
        category: 'Furniture',
        stock: 15,
        status: 'active'
    },
    {
        id: 7,
        name: 'Gaming Mouse',
        description: 'High-precision gaming mouse with RGB lighting',
        price: 59.99,
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=80&h=80&fit=crop',
        category: 'Electronics',
        stock: 32,
        status: 'active'
    },
    {
        id: 8,
        name: 'Standing Desk',
        description: 'Adjustable height standing desk for better posture',
        price: 399.99,
        image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=80&h=80&fit=crop',
        category: 'Furniture',
        stock: 7,
        status: 'active'
    }
];

interface ProductsListingProps {
    products?: Product[];
    onEdit?: (product: Product) => void;
    onDelete?: (productId: number) => void;
    onView?: (product: Product) => void;
}

const ProductsListing: React.FC<ProductsListingProps> = ({
    products = mockProducts,
    onEdit,
    onDelete,
    onView
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    const [page, setPage] = useState(1);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const itemsPerPage = 3;
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const startItem = (page - 1) * itemsPerPage + 1;
    const endItem = Math.min(page * itemsPerPage, products.length);

    const currentProducts = products.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, product: Product) => {
        setAnchorEl(event.currentTarget);
        setSelectedProduct(product);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedProduct(null);
    };

    const getStatusColor = (status: Product['status']) => {
        switch (status) {
            case 'active':
                return 'success';
            case 'inactive':
                return 'default';
            case 'out_of_stock':
                return 'error';
            default:
                return 'default';
        }
    };

    const getStatusLabel = (status: Product['status']) => {
        switch (status) {
            case 'active':
                return 'Active';
            case 'inactive':
                return 'Inactive';
            case 'out_of_stock':
                return 'Out of Stock';
            default:
                return status;
        }
    };

    const renderPagination = () => {
        const getPageNumbers = () => {
            const pages = [];
            const maxVisiblePages = isMobile ? 3 : 5;

            let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
            let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

            if (endPage - startPage + 1 < maxVisiblePages) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            return pages;
        };

        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: isMobile ? 'column' : 'row',
                gap: 2,
                mt: 4,
                p: 3,
                backgroundColor: theme.palette.background.paper,
                borderRadius: 2,
                boxShadow: theme.shadows[1],
            }}>
                {/* Results Info */}
                <Typography variant="body2" color="text.secondary">
                    Showing {startItem}-{endItem} of {products.length} products
                </Typography>

                {/* Pagination Controls */}
                <Stack direction="row" spacing={1} alignItems="center">
                    {/* First Page */}
                    <IconButton
                        onClick={() => handlePageChange(1)}
                        disabled={page === 1}
                        size="small"
                        sx={{
                            border: `1px solid ${theme.palette.divider}`,
                            borderRadius: 1,
                            '&:hover': {
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.primary.contrastText,
                                borderColor: theme.palette.primary.main,
                            },
                            '&:disabled': {
                                backgroundColor: theme.palette.action.disabledBackground,
                                borderColor: theme.palette.action.disabled,
                            }
                        }}
                    >
                        <FiChevronsLeft size={16} />
                    </IconButton>

                    {/* Previous Page */}
                    <IconButton
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        size="small"
                        sx={{
                            border: `1px solid ${theme.palette.divider}`,
                            borderRadius: 1,
                            '&:hover': {
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.primary.contrastText,
                                borderColor: theme.palette.primary.main,
                            },
                            '&:disabled': {
                                backgroundColor: theme.palette.action.disabledBackground,
                                borderColor: theme.palette.action.disabled,
                            }
                        }}
                    >
                        <FiChevronLeft size={16} />
                    </IconButton>

                    {/* Page Numbers */}
                    {getPageNumbers().map((pageNum) => (
                        <Button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            variant={page === pageNum ? 'contained' : 'outlined'}
                            size="small"
                            sx={{
                                minWidth: 40,
                                height: 36,
                                borderRadius: 1,
                                fontWeight: page === pageNum ? 600 : 400,
                                ...(page === pageNum && {
                                    backgroundColor: theme.palette.primary.main,
                                    color: theme.palette.primary.contrastText,
                                    '&:hover': {
                                        backgroundColor: theme.palette.primary.dark,
                                    }
                                }),
                                ...(page !== pageNum && {
                                    borderColor: theme.palette.divider,
                                    color: theme.palette.text.primary,
                                    '&:hover': {
                                        backgroundColor: theme.palette.primary.main,
                                        color: theme.palette.primary.contrastText,
                                        borderColor: theme.palette.primary.main,
                                    }
                                })
                            }}
                        >
                            {pageNum}
                        </Button>
                    ))}

                    {/* Next Page */}
                    <IconButton
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages}
                        size="small"
                        sx={{
                            border: `1px solid ${theme.palette.divider}`,
                            borderRadius: 1,
                            '&:hover': {
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.primary.contrastText,
                                borderColor: theme.palette.primary.main,
                            },
                            '&:disabled': {
                                backgroundColor: theme.palette.action.disabledBackground,
                                borderColor: theme.palette.action.disabled,
                            }
                        }}
                    >
                        <FiChevronRight size={16} />
                    </IconButton>

                    {/* Last Page */}
                    <IconButton
                        onClick={() => handlePageChange(totalPages)}
                        disabled={page === totalPages}
                        size="small"
                        sx={{
                            border: `1px solid ${theme.palette.divider}`,
                            borderRadius: 1,
                            '&:hover': {
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.primary.contrastText,
                                borderColor: theme.palette.primary.main,
                            },
                            '&:disabled': {
                                backgroundColor: theme.palette.action.disabledBackground,
                                borderColor: theme.palette.action.disabled,
                            }
                        }}
                    >
                        <FiChevronsRight size={16} />
                    </IconButton>
                </Stack>
            </Box>
        );
    };

    return (
        <>
            {/* Products List */}
            <Stack spacing={1}>
                {currentProducts.map((product, index) => (
                    <Card
                        key={product.id}
                        sx={{
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: theme.shadows[4],
                            }
                        }}
                    >
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            p: { xs: 2, sm: 3 },
                            minHeight: 100
                        }}>
                            {/* Product Image */}
                            <Avatar
                                src={product.image}
                                alt={product.name}
                                variant="rounded"
                                sx={{
                                    width: { xs: 60, sm: 80 },
                                    height: { xs: 60, sm: 80 },
                                    mr: { xs: 2, sm: 3 },
                                    border: `2px solid ${theme.palette.divider}`,
                                }}
                            />

                            {/* Product Info */}
                            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    mb: 1
                                }}>
                                    <Typography
                                        variant={isMobile ? "subtitle1" : "h6"}
                                        component="div"
                                        sx={{
                                            fontWeight: 600,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            maxWidth: { xs: '200px', sm: 'none' }
                                        }}
                                    >
                                        {product.name}
                                    </Typography>

                                    <IconButton
                                        size="small"
                                        onClick={(e) => handleMenuOpen(e, product)}
                                        sx={{ ml: 1, flexShrink: 0 }}
                                    >
                                        <FiMoreVertical size={16} />
                                    </IconButton>
                                </Box>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        mb: 2,
                                        display: { xs: 'none', sm: 'block' },
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {product.description}
                                </Typography>

                                {/* Product Details Row */}
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    flexWrap: 'wrap',
                                    gap: { xs: 1, sm: 2 }
                                }}>
                                    {/* Left side - Price and Category */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <FiDollarSign size={16} color={theme.palette.primary.main} />
                                            <Typography variant="h6" sx={{ ml: 0.5, fontWeight: 'bold', color: theme.palette.primary.main }}>
                                                {product.price.toFixed(2)}
                                            </Typography>
                                        </Box>

                                        {!isMobile && (
                                            <Typography variant="body2" color="text.secondary">
                                                {product.category}
                                            </Typography>
                                        )}
                                    </Box>

                                    {/* Right side - Status and Stock */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <FiPackage size={14} />
                                            <Typography variant="body2" color="text.secondary">
                                                {product.stock}
                                            </Typography>
                                        </Box>

                                        <Chip
                                            label={getStatusLabel(product.status)}
                                            color={getStatusColor(product.status)}
                                            size="small"
                                            sx={{ fontWeight: 500 }}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Card>
                ))}
            </Stack>

            {/* Action Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    sx: {
                        boxShadow: theme.shadows[8],
                        borderRadius: 2,
                        minWidth: 160,
                    }
                }}
            >
                <MenuItem
                    onClick={() => {
                        if (selectedProduct && onView) onView(selectedProduct);
                        handleMenuClose();
                    }}
                    sx={{ py: 1.5 }}
                >
                    <FiEye size={16} style={{ marginRight: 12 }} />
                    View Details
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        if (selectedProduct && onEdit) onEdit(selectedProduct);
                        handleMenuClose();
                    }}
                    sx={{ py: 1.5 }}
                >
                    <FiEdit size={16} style={{ marginRight: 12 }} />
                    Edit Product
                </MenuItem>
                <Divider />
                <MenuItem
                    onClick={() => {
                        if (selectedProduct && onDelete) onDelete(selectedProduct.id);
                        handleMenuClose();
                    }}
                    sx={{ py: 1.5, color: 'error.main' }}
                >
                    <FiTrash2 size={16} style={{ marginRight: 12 }} />
                    Delete Product
                </MenuItem>
            </Menu>

            {/* Enhanced Pagination */}
            {totalPages > 1 && renderPagination()}

            {/* Empty State */}
            {products.length === 0 && (
                <Box
                    sx={{
                        textAlign: 'center',
                        py: 8,
                        color: 'text.secondary'
                    }}
                >
                    <FiPackage size={48} style={{ marginBottom: 16, opacity: 0.5 }} />
                    <Typography variant="h6" gutterBottom>
                        No products found
                    </Typography>
                    <Typography variant="body2">
                        There are no products to display at the moment.
                    </Typography>
                </Box>
            )}
        </>
    );
};

export default ProductsListing;