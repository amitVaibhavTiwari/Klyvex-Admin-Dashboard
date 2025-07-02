import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    IconButton,
    Grid,
    Paper,
    Divider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Checkbox,
    Chip,
    Stack,
    Avatar,
    InputAdornment,
    Container,
    AppBar,
    Toolbar,
    Switch,
    Alert,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import {
    FiArrowLeft,
    FiSave,
    FiEye,
    FiUpload,
    FiX,
    FiPlus,
    FiTrash2,
    FiImage,
    FiTag,
    FiDollarSign,
    FiPackage,
    FiTruck,
    FiGlobe,
    FiSettings,
    FiChevronDown
} from 'react-icons/fi';

const AddProductPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        shortDescription: '',
        category: '',
        productType: '',
        brand: '',
        sku: '',
        weight: '',
        dimensions: {
            length: '',
            width: '',
            height: ''
        },
        pricing: {
            price: '',
            compareAtPrice: '',
            costPerItem: '',
            profit: '',
            margin: ''
        },
        inventory: {
            trackQuantity: true,
            quantity: '',
            lowStockThreshold: '',
            allowBackorders: false
        },
        shipping: {
            physicalProduct: true,
            weight: '',
            requiresShipping: true
        },
        seo: {
            title: '',
            description: '',
            slug: ''
        },
        visibility: {
            status: 'draft',
            publishDate: '',
            availableDate: ''
        },
        attributes: []
    });

    const [images, setImages] = useState<string[]>([]);
    const [variants, setVariants] = useState([
        { id: 1, name: 'Size', values: ['S', 'M', 'L', 'XL'] },
        { id: 2, name: 'Color', values: ['Red', 'Blue', 'Green'] }
    ]);
    const [tags, setTags] = useState<string[]>(['electronics', 'wireless']);
    const [newTag, setNewTag] = useState('');
    const [imageUploadOpen, setImageUploadOpen] = useState(false);

    const categories = [
        'Electronics',
        'Clothing',
        'Home & Garden',
        'Sports & Outdoors',
        'Books',
        'Toys & Games'
    ];

    const productTypes = [
        'Simple Product',
        'Variable Product',
        'Digital Product',
        'Service'
    ];

    const handleInputChange = (field: string, value: any, nested?: string) => {
        if (nested) {
            setFormData(prev => ({
                ...prev,
                [nested]: {
                    ...(prev[nested as keyof typeof prev] as Record<string, any>),
                    [field]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [field]: value
            }));
        }
    };

    const addTag = () => {
        if (newTag.trim() && !tags.includes(newTag.trim())) {
            setTags([...tags, newTag.trim()]);
            setNewTag('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newImages = Array.from(files).map(file => URL.createObjectURL(file));
            setImages([...images, ...newImages]);
        }
    };

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const addVariant = () => {
        const newVariant = { id: Date.now(), name: '', values: [''] };
        setVariants([...variants, newVariant]);
    };

    const updateVariant = (id: number, field: string, value: any) => {
        setVariants(variants.map(variant =>
            variant.id === id ? { ...variant, [field]: value } : variant
        ));
    };

    const removeVariant = (id: number) => {
        setVariants(variants.filter(variant => variant.id !== id));
    };

    const addVariantValue = (variantId: number) => {
        setVariants(variants.map(variant =>
            variant.id === variantId
                ? { ...variant, values: [...variant.values, ''] }
                : variant
        ));
    };

    const updateVariantValue = (variantId: number, valueIndex: number, value: string) => {
        setVariants(variants.map(variant =>
            variant.id === variantId
                ? {
                    ...variant,
                    values: variant.values.map((v, i) => i === valueIndex ? value : v)
                }
                : variant
        ));
    };

    const removeVariantValue = (variantId: number, valueIndex: number) => {
        setVariants(variants.map(variant =>
            variant.id === variantId
                ? { ...variant, values: variant.values.filter((_, i) => i !== valueIndex) }
                : variant
        ));
    };

    const FormSection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> =
        ({ title, icon, children }) => (
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Avatar sx={{ bgcolor: 'primary.light', mr: 2 }}>
                            {icon}
                        </Avatar>
                        <Typography variant="h6" component="h2" fontWeight={600}>
                            {title}
                        </Typography>
                    </Box>
                    {children}
                </CardContent>
            </Card>
        );

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
            {/* Header */}
            <AppBar position="static" color="default" elevation={1}>
                <Toolbar>
                    <IconButton edge="start" sx={{ mr: 2 }}>
                        <FiArrowLeft />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h5" component="h1" fontWeight="bold">
                            Add New Product
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Create a new product for your store
                        </Typography>
                    </Box>
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="outlined"
                            startIcon={<FiEye />}
                            color="inherit"
                        >
                            Preview
                        </Button>
                        <Button
                            variant="contained"
                            color="inherit"
                            sx={{ bgcolor: 'grey.600', '&:hover': { bgcolor: 'grey.700' } }}
                        >
                            Save as Draft
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<FiSave />}
                            color="primary"
                        >
                            Save & Publish
                        </Button>
                    </Stack>
                </Toolbar>
            </AppBar>

            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Grid container spacing={4}>
                    {/* Main Content */}
                    <Grid item xs={12} lg={8}>
                        {/* General Information */}
                        <FormSection title="General Information" icon={<FiPackage />}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Product Name"
                                        required
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        placeholder="Enter product name"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Description"
                                        multiline
                                        rows={6}
                                        value={formData.description}
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                        placeholder="Enter detailed product description"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Short Description"
                                        multiline
                                        rows={3}
                                        value={formData.shortDescription}
                                        onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                                        placeholder="Brief product summary"
                                    />
                                </Grid>
                            </Grid>
                        </FormSection>

                        {/* Media */}
                        <FormSection title="Media" icon={<FiImage />}>
                            <Box>
                                <Paper
                                    sx={{
                                        border: '2px dashed',
                                        borderColor: 'grey.300',
                                        p: 4,
                                        textAlign: 'center',
                                        mb: 3,
                                        cursor: 'pointer',
                                        '&:hover': { bgcolor: 'grey.50' }
                                    }}
                                    onClick={() => setImageUploadOpen(true)}
                                >
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        style={{ display: 'none' }}
                                        id="image-upload"
                                    />
                                    <FiUpload size={48} color="#9e9e9e" />
                                    <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                                        Upload Product Images
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                        Drag and drop or click to select files
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        htmlFor="image-upload"
                                    >
                                        Choose Files
                                    </Button>
                                </Paper>

                                {images.length > 0 && (
                                    <Grid container spacing={2}>
                                        {images.map((image, index) => (
                                            <Grid item xs={6} sm={4} md={3} key={index}>
                                                <Paper sx={{ position: 'relative', overflow: 'hidden' }}>
                                                    <Box
                                                        component="img"
                                                        src={image}
                                                        alt={`Product ${index + 1}`}
                                                        sx={{
                                                            width: '100%',
                                                            height: 120,
                                                            objectFit: 'cover'
                                                        }}
                                                    />
                                                    <IconButton
                                                        sx={{
                                                            position: 'absolute',
                                                            top: 4,
                                                            right: 4,
                                                            bgcolor: 'background.paper',
                                                            '&:hover': { bgcolor: 'grey.100' }
                                                        }}
                                                        size="small"
                                                        onClick={() => removeImage(index)}
                                                    >
                                                        <FiX />
                                                    </IconButton>
                                                    {index === 0 && (
                                                        <Chip
                                                            label="Main"
                                                            color="primary"
                                                            size="small"
                                                            sx={{
                                                                position: 'absolute',
                                                                bottom: 8,
                                                                left: 8
                                                            }}
                                                        />
                                                    )}
                                                </Paper>
                                            </Grid>
                                        ))}
                                    </Grid>
                                )}
                            </Box>
                        </FormSection>

                        {/* Pricing */}
                        <FormSection title="Pricing" icon={<FiDollarSign />}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Price"
                                        required
                                        type="number"
                                        value={formData.pricing.price}
                                        onChange={(e) => handleInputChange('price', e.target.value, 'pricing')}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                        }}
                                        inputProps={{ step: 0.01, min: 0 }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Compare at Price"
                                        type="number"
                                        value={formData.pricing.compareAtPrice}
                                        onChange={(e) => handleInputChange('compareAtPrice', e.target.value, 'pricing')}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                        }}
                                        inputProps={{ step: 0.01, min: 0 }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Cost per Item"
                                        type="number"
                                        value={formData.pricing.costPerItem}
                                        onChange={(e) => handleInputChange('costPerItem', e.target.value, 'pricing')}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                        }}
                                        inputProps={{ step: 0.01, min: 0 }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Profit"
                                        type="number"
                                        value={formData.pricing.profit}
                                        onChange={(e) => handleInputChange('profit', e.target.value, 'pricing')}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                            readOnly: true,
                                        }}
                                        sx={{ bgcolor: 'grey.50' }}
                                    />
                                </Grid>
                            </Grid>
                        </FormSection>

                        {/* Inventory */}
                        <FormSection title="Inventory" icon={<FiPackage />}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={formData.inventory.trackQuantity}
                                                onChange={(e) => handleInputChange('trackQuantity', e.target.checked, 'inventory')}
                                            />
                                        }
                                        label="Track quantity"
                                    />
                                </Grid>

                                {formData.inventory.trackQuantity && (
                                    <>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Quantity"
                                                type="number"
                                                value={formData.inventory.quantity}
                                                onChange={(e) => handleInputChange('quantity', e.target.value, 'inventory')}
                                                inputProps={{ min: 0 }}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Low Stock Threshold"
                                                type="number"
                                                value={formData.inventory.lowStockThreshold}
                                                onChange={(e) => handleInputChange('lowStockThreshold', e.target.value, 'inventory')}
                                                inputProps={{ min: 0 }}
                                            />
                                        </Grid>
                                    </>
                                )}

                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={formData.inventory.allowBackorders}
                                                onChange={(e) => handleInputChange('allowBackorders', e.target.checked, 'inventory')}
                                            />
                                        }
                                        label="Allow customers to purchase this product when it's out of stock"
                                    />
                                </Grid>
                            </Grid>
                        </FormSection>

                        {/* Variants */}
                        <FormSection title="Variants" icon={<FiSettings />}>
                            <Stack spacing={3}>
                                {variants.map((variant) => (
                                    <Paper key={variant.id} sx={{ p: 3, border: 1, borderColor: 'grey.200' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                                            <TextField
                                                variant="standard"
                                                value={variant.name}
                                                onChange={(e) => updateVariant(variant.id, 'name', e.target.value)}
                                                placeholder="Variant name (e.g., Size, Color)"
                                                InputProps={{
                                                    style: { fontSize: '1.1rem', fontWeight: 500 }
                                                }}
                                            />
                                            <IconButton
                                                onClick={() => removeVariant(variant.id)}
                                                color="error"
                                            >
                                                <FiTrash2 />
                                            </IconButton>
                                        </Box>

                                        <Stack spacing={2}>
                                            {variant.values.map((value, index) => (
                                                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        value={value}
                                                        onChange={(e) => updateVariantValue(variant.id, index, e.target.value)}
                                                        placeholder="Variant value"
                                                    />
                                                    <IconButton
                                                        onClick={() => removeVariantValue(variant.id, index)}
                                                        color="error"
                                                        size="small"
                                                    >
                                                        <FiX />
                                                    </IconButton>
                                                </Box>
                                            ))}
                                            <Button
                                                startIcon={<FiPlus />}
                                                onClick={() => addVariantValue(variant.id)}
                                                sx={{ alignSelf: 'flex-start' }}
                                            >
                                                Add Value
                                            </Button>
                                        </Stack>
                                    </Paper>
                                ))}

                                <Button
                                    variant="outlined"
                                    startIcon={<FiPlus />}
                                    onClick={addVariant}
                                    sx={{
                                        borderStyle: 'dashed',
                                        py: 2,
                                        '&:hover': { borderStyle: 'dashed' }
                                    }}
                                >
                                    Add Variant
                                </Button>
                            </Stack>
                        </FormSection>
                    </Grid>

                    {/* Sidebar */}
                    <Grid item xs={12} lg={4}>
                        {/* Status & Visibility */}
                        <FormSection title="Status & Visibility" icon={<FiEye />}>
                            <Stack spacing={3}>
                                <FormControl fullWidth>
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        value={formData.visibility.status}
                                        label="Status"
                                        onChange={(e) => handleInputChange('status', e.target.value, 'visibility')}
                                    >
                                        <MenuItem value="draft">Draft</MenuItem>
                                        <MenuItem value="published">Published</MenuItem>
                                        <MenuItem value="scheduled">Scheduled</MenuItem>
                                    </Select>
                                </FormControl>

                                <TextField
                                    fullWidth
                                    label="Publish Date"
                                    type="datetime-local"
                                    value={formData.visibility.publishDate}
                                    onChange={(e) => handleInputChange('publishDate', e.target.value, 'visibility')}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Stack>
                        </FormSection>

                        {/* Product Organization */}
                        <FormSection title="Product Organization" icon={<FiTag />}>
                            <Stack spacing={3}>
                                <FormControl fullWidth>
                                    <InputLabel>Product Type</InputLabel>
                                    <Select
                                        value={formData.productType}
                                        label="Product Type"
                                        onChange={(e) => handleInputChange('productType', e.target.value)}
                                    >
                                        {productTypes.map((type) => (
                                            <MenuItem key={type} value={type}>{type}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth>
                                    <InputLabel>Category</InputLabel>
                                    <Select
                                        value={formData.category}
                                        label="Category"
                                        onChange={(e) => handleInputChange('category', e.target.value)}
                                    >
                                        {categories.map((category) => (
                                            <MenuItem key={category} value={category}>{category}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <TextField
                                    fullWidth
                                    label="Brand"
                                    value={formData.brand}
                                    onChange={(e) => handleInputChange('brand', e.target.value)}
                                    placeholder="Enter brand name"
                                />

                                <Box>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                        Tags
                                    </Typography>
                                    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1, mb: 2 }}>
                                        {tags.map((tag) => (
                                            <Chip
                                                key={tag}
                                                label={tag}
                                                onDelete={() => removeTag(tag)}
                                                color="primary"
                                                variant="outlined"
                                                size="small"
                                            />
                                        ))}
                                    </Stack>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <TextField
                                            size="small"
                                            value={newTag}
                                            onChange={(e) => setNewTag(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                            placeholder="Add tag"
                                            sx={{ flexGrow: 1 }}
                                        />
                                        <Button
                                            variant="outlined"
                                            onClick={addTag}
                                            sx={{ minWidth: 'auto', px: 2 }}
                                        >
                                            <FiPlus />
                                        </Button>
                                    </Box>
                                </Box>
                            </Stack>
                        </FormSection>

                        {/* Product Details */}
                        <FormSection title="Product Details" icon={<FiPackage />}>
                            <Stack spacing={3}>
                                <TextField
                                    fullWidth
                                    label="SKU"
                                    value={formData.sku}
                                    onChange={(e) => handleInputChange('sku', e.target.value)}
                                    placeholder="Enter SKU"
                                />

                                <TextField
                                    fullWidth
                                    label="Weight (kg)"
                                    type="number"
                                    value={formData.weight}
                                    onChange={(e) => handleInputChange('weight', e.target.value)}
                                    inputProps={{ step: 0.1, min: 0 }}
                                />

                                <Box>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                        Dimensions (cm)
                                    </Typography>
                                    <Grid container spacing={1}>
                                        <Grid item xs={4}>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                type="number"
                                                value={formData.dimensions.length}
                                                onChange={(e) => handleInputChange('length', e.target.value, 'dimensions')}
                                                placeholder="L"
                                                inputProps={{ min: 0 }}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                type="number"
                                                value={formData.dimensions.width}
                                                onChange={(e) => handleInputChange('width', e.target.value, 'dimensions')}
                                                placeholder="W"
                                                inputProps={{ min: 0 }}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                type="number"
                                                value={formData.dimensions.height}
                                                onChange={(e) => handleInputChange('height', e.target.value, 'dimensions')}
                                                placeholder="H"
                                                inputProps={{ min: 0 }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Stack>
                        </FormSection>

                        {/* Shipping */}
                        <FormSection title="Shipping" icon={<FiTruck />}>
                            <Stack spacing={2}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formData.shipping.physicalProduct}
                                            onChange={(e) => handleInputChange('physicalProduct', e.target.checked, 'shipping')}
                                        />
                                    }
                                    label="This is a physical product"
                                />

                                {formData.shipping.physicalProduct && (
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={formData.shipping.requiresShipping}
                                                onChange={(e) => handleInputChange('requiresShipping', e.target.checked, 'shipping')}
                                            />
                                        }
                                        label="This product requires shipping"
                                    />
                                )}
                            </Stack>
                        </FormSection>

                        {/* SEO */}
                        <FormSection title="Search Engine Optimization" icon={<FiGlobe />}>
                            <Stack spacing={3}>
                                <TextField
                                    fullWidth
                                    label="Page Title"
                                    value={formData.seo.title}
                                    onChange={(e) => handleInputChange('title', e.target.value, 'seo')}
                                    placeholder="SEO title"
                                />

                                <TextField
                                    fullWidth
                                    label="Meta Description"
                                    multiline
                                    rows={3}
                                    value={formData.seo.description}
                                    onChange={(e) => handleInputChange('description', e.target.value, 'seo')}
                                    placeholder="SEO description"
                                />

                                <TextField
                                    fullWidth
                                    label="URL Slug"
                                    value={formData.seo.slug}
                                    onChange={(e) => handleInputChange('slug', e.target.value, 'seo')}
                                    placeholder="product-url-slug"
                                />
                            </Stack>
                        </FormSection>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default AddProductPage;