import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  Rating,
  IconButton,
  Badge,
  useTheme,
  alpha,
} from "@mui/material";
import {
  ShoppingCart,
  Favorite,
  FavoriteBorder,
  LocalOffer,
  Security,
  Visibility,
  FlashOn,
  Star,
} from "@mui/icons-material";

const SecurityShop = () => {
  const theme = useTheme();
  const [favorites, setFavorites] = useState(new Set());
  const [cart, setCart] = useState(new Set());

  const products = [
    {
      id: 1,
      name: "Hikvision DS-2CD2143G0-I",
      brand: "Hikvision",
      type: "4MP Dome Camera",
      price: 28500,
      originalPrice: 35000,
      discount: 19,
      rating: 4.8,
      reviews: 234,
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
      features: [
        "4MP Resolution",
        "Night Vision",
        "IP67 Waterproof",
        "Smart Detection",
      ],
      badge: "HOT DEAL",
      badgeColor: "error",
      inStock: true,
    },
    {
      id: 2,
      name: "Dahua DH-IPC-HFW1431S",
      brand: "Dahua",
      type: "4MP Bullet Camera",
      price: 22000,
      originalPrice: 26000,
      discount: 15,
      rating: 4.6,
      reviews: 156,
      image:
        "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300&h=200&fit=crop",
      features: ["4MP Resolution", "25m IR Range", "H.265 Compression", "PoE"],
      badge: "BEST SELLER",
      badgeColor: "success",
      inStock: true,
    },
    {
      id: 3,
      name: "TP-Link Tapo C320WS",
      brand: "TP-Link",
      type: "2K Outdoor Camera",
      price: 18500,
      originalPrice: 21000,
      discount: 12,
      rating: 4.4,
      reviews: 89,
      image:
        "https://images.unsplash.com/photo-1586281380923-a3501ba2a6e5?w=300&h=200&fit=crop",
      features: [
        "2K Resolution",
        "Color Night Vision",
        "Two-Way Audio",
        "Smart AI",
      ],
      badge: "WiFi Ready",
      badgeColor: "info",
      inStock: true,
    },
    {
      id: 4,
      name: "Honeywell HZ-0515",
      brand: "Honeywell",
      type: "Motion Detector",
      price: 12500,
      originalPrice: 15000,
      discount: 17,
      rating: 4.7,
      reviews: 167,
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
      features: ["PIR Technology", "Pet Immune", "Wireless", "10 Year Battery"],
      badge: "LIMITED TIME",
      badgeColor: "warning",
      inStock: true,
    },
    {
      id: 5,
      name: "Bosch DS160",
      brand: "Bosch",
      type: "Motion Detector",
      price: 16800,
      originalPrice: 19500,
      discount: 14,
      rating: 4.9,
      reviews: 203,
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
      features: [
        "Dual Technology",
        "Anti-Masking",
        "Temperature Compensation",
        "Long Range",
      ],
      badge: "PREMIUM",
      badgeColor: "secondary",
      inStock: true,
    },
    {
      id: 6,
      name: "Uniview IPC2122LR3-PF28",
      brand: "Uniview",
      type: "2MP Turret Camera",
      price: 19500,
      originalPrice: 24000,
      discount: 19,
      rating: 4.5,
      reviews: 78,
      image:
        "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300&h=200&fit=crop",
      features: ["2MP Resolution", "Smart IR", "WDR", "Easy Installation"],
      badge: "NEW ARRIVAL",
      badgeColor: "primary",
      inStock: false,
    },
  ];

  const handleFavorite = (productId) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const handleAddToCart = (productId) => {
    setCart((prev) => {
      const newCart = new Set(prev);
      newCart.add(productId);
      return newCart;
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getBadgeColor = (color) => {
    switch (color) {
      case "error":
        return theme.palette.error.main;
      case "success":
        return theme.palette.success.main;
      case "info":
        return theme.palette.info.main;
      case "warning":
        return theme.palette.warning.main;
      case "secondary":
        return theme.palette.secondary.main;
      default:
        return theme.palette.primary.main;
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        mt: 6,
        mb: 4,
      }}
    >
      {/* Section Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 4,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              width: 50,
              height: 50,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Security
              sx={{ color: theme.palette.primary.main, fontSize: 28 }}
            />
          </Box>
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: theme.palette.text.primary,
                fontSize: { xs: "1.8rem", md: "2.2rem" },
              }}
            >
              TrueGate Store
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: { xs: "0.9rem", md: "1rem" },
              }}
            >
              Premium security devices with exclusive offers
            </Typography>
          </Box>
        </Box>
        <Badge badgeContent={cart.size} color="primary">
          <IconButton
            sx={{
              bgcolor: theme.palette.primary.main,
              color: theme.palette.common.white,
              "&:hover": {
                bgcolor: theme.palette.primary.dark,
              },
            }}
          >
            <ShoppingCart />
          </IconButton>
        </Badge>
      </Box>

      {/* Featured Deal Banner */}
      <Paper
        elevation={3}
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          color: theme.palette.common.white,
          p: 3,
          borderRadius: 3,
          mb: 4,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -20,
            right: -20,
            width: 100,
            height: 100,
            bgcolor: alpha(theme.palette.common.white, 0.1),
            borderRadius: "50%",
          }}
        />
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <FlashOn sx={{ fontSize: 32 }} />
          <Typography variant="h5" fontWeight="bold">
            Flash Sale - Up to 25% Off!
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Limited time offer on premium security cameras and motion detectors
        </Typography>
        <Chip
          label="Ends in 2 days"
          sx={{
            bgcolor: theme.palette.common.white,
            color: theme.palette.primary.main,
            fontWeight: "bold",
          }}
        />
      </Paper>

      {/* Product Grid */}
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card
              elevation={4}
              sx={{
                height: "100%",
                borderRadius: 3,
                position: "relative",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: theme.shadows[12],
                },
                opacity: product.inStock ? 1 : 0.7,
              }}
            >
              {/* Badge */}
              <Box
                sx={{
                  position: "absolute",
                  top: 12,
                  left: 12,
                  zIndex: 2,
                }}
              >
                <Chip
                  label={product.badge}
                  size="small"
                  sx={{
                    bgcolor: getBadgeColor(product.badgeColor),
                    color: theme.palette.common.white,
                    fontWeight: "bold",
                    fontSize: "0.7rem",
                  }}
                />
              </Box>

              {/* Favorite Button */}
              <IconButton
                onClick={() => handleFavorite(product.id)}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  zIndex: 2,
                  bgcolor: alpha(theme.palette.common.white, 0.9),
                  "&:hover": {
                    bgcolor: theme.palette.common.white,
                  },
                }}
              >
                {favorites.has(product.id) ? (
                  <Favorite sx={{ color: theme.palette.error.main }} />
                ) : (
                  <FavoriteBorder />
                )}
              </IconButton>

              {/* Product Image */}
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
                sx={{
                  objectFit: "cover",
                  filter: product.inStock ? "none" : "grayscale(100%)",
                }}
              />

              <CardContent sx={{ p: 2.5 }}>
                {/* Brand & Type */}
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  >
                    {product.brand}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {product.type}
                  </Typography>
                </Box>

                {/* Product Name */}
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    fontSize: "1rem",
                    mb: 1,
                    lineHeight: 1.2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {product.name}
                </Typography>

                {/* Rating */}
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <Rating
                    value={product.rating}
                    precision={0.1}
                    readOnly
                    size="small"
                  />
                  <Typography variant="caption" color="text.secondary">
                    ({product.reviews})
                  </Typography>
                </Box>

                {/* Features */}
                <Box sx={{ mb: 2 }}>
                  {product.features.slice(0, 2).map((feature, index) => (
                    <Chip
                      key={index}
                      label={feature}
                      size="small"
                      variant="outlined"
                      sx={{
                        mr: 0.5,
                        mb: 0.5,
                        fontSize: "0.7rem",
                        height: 20,
                      }}
                    />
                  ))}
                </Box>

                {/* Price */}
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: theme.palette.primary.main,
                      }}
                    >
                      {formatPrice(product.price)}
                    </Typography>
                    {product.originalPrice && (
                      <Typography
                        variant="body2"
                        sx={{
                          textDecoration: "line-through",
                          color: theme.palette.text.secondary,
                        }}
                      >
                        {formatPrice(product.originalPrice)}
                      </Typography>
                    )}
                  </Box>
                  {product.discount && (
                    <Typography
                      variant="caption"
                      sx={{
                        color: theme.palette.success.main,
                        fontWeight: "bold",
                      }}
                    >
                      Save {product.discount}%
                    </Typography>
                  )}
                </Box>

                {/* Action Buttons */}
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleAddToCart(product.id)}
                    disabled={!product.inStock || cart.has(product.id)}
                    sx={{
                      borderRadius: 2,
                      py: 1,
                      fontSize: "0.875rem",
                      fontWeight: 600,
                    }}
                  >
                    {!product.inStock
                      ? "Out of Stock"
                      : cart.has(product.id)
                      ? "Added to Cart"
                      : "Add to Cart"}
                  </Button>
                  <IconButton
                    color="primary"
                    sx={{
                      border: `1px solid ${theme.palette.primary.main}`,
                      borderRadius: 2,
                    }}
                  >
                    <Visibility />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* View More Button */}
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Button
          variant="outlined"
          size="large"
          sx={{
            borderRadius: 3,
            px: 4,
            py: 1.5,
            fontSize: "1rem",
            fontWeight: 600,
            "&:hover": {
              transform: "translateY(-2px)",
            },
          }}
        >
          View All Products
        </Button>
      </Box>
    </Box>
  );
};

export default SecurityShop;
