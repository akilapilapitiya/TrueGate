import { Box, Typography, useTheme, useMediaQuery, Fade } from "@mui/material";
import { keyframes } from "@mui/system";

const LoadingSpinner = ({ 
  size = "medium", 
  message = "Loading...", 
  variant = "overlay", 
  showMessage = true 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Animation keyframes
  const pulseAnimation = keyframes`
    0% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.2);
      opacity: 1;
    }
    100% {
      transform: scale(0.8);
      opacity: 0.5;
    }
  `;

  const spinAnimation = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  `;

  const waveAnimation = keyframes`
    0%, 60%, 100% {
      transform: initial;
    }
    30% {
      transform: translateY(-15px);
    }
  `;

  const gradientAnimation = keyframes`
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  `;

  // Size configurations
  const sizeConfig = {
    small: {
      container: isMobile ? 60 : 80,
      spinner: isMobile ? 40 : 60,
      dots: isMobile ? 6 : 8,
      text: isMobile ? "0.8rem" : "0.9rem",
    },
    medium: {
      container: isMobile ? 80 : 120,
      spinner: isMobile ? 60 : 90,
      dots: isMobile ? 8 : 12,
      text: isMobile ? "0.9rem" : "1rem",
    },
    large: {
      container: isMobile ? 100 : 160,
      spinner: isMobile ? 80 : 120,
      dots: isMobile ? 12 : 16,
      text: isMobile ? "1rem" : "1.2rem",
    },
  };

  const config = sizeConfig[size];

  const SpinnerContent = () => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
      }}
    >
      {/* Main Spinner Container */}
      <Box
        sx={{
          position: "relative",
          width: config.container,
          height: config.container,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Outer Ring */}
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: `3px solid ${theme.palette.action.hover}`,
            borderTop: `3px solid ${theme.palette.primary.main}`,
            animation: `${spinAnimation} 1s linear infinite`,
          }}
        />

        {/* Inner Ring */}
        <Box
          sx={{
            position: "absolute",
            width: "75%",
            height: "75%",
            borderRadius: "50%",
            border: `2px solid ${theme.palette.action.hover}`,
            borderRight: `2px solid ${theme.palette.secondary.main}`,
            animation: `${spinAnimation} 0.8s linear infinite reverse`,
          }}
        />

        {/* Center Pulsing Dot */}
        <Box
          sx={{
            width: config.dots,
            height: config.dots,
            borderRadius: "50%",
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            animation: `${pulseAnimation} 1.5s ease-in-out infinite`,
          }}
        />

        {/* Orbiting Dots */}
        {[0, 1, 2].map((index) => (
          <Box
            key={index}
            sx={{
              position: "absolute",
              width: config.dots / 2,
              height: config.dots / 2,
              borderRadius: "50%",
              backgroundColor: theme.palette.primary.main,
              top: "50%",
              left: "50%",
              transform: `rotate(${index * 120}deg) translate(${config.spinner / 2}px) rotate(-${index * 120}deg)`,
              transformOrigin: "0 0",
              animation: `${spinAnimation} 2s linear infinite`,
              opacity: 0.7,
            }}
          />
        ))}
      </Box>

      {/* Loading Message */}
      {showMessage && (
        <Fade in timeout={500}>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h6"
              sx={{
                fontSize: config.text,
                fontWeight: 600,
                color: theme.palette.text.primary,
                mb: 1,
              }}
            >
              {message}
            </Typography>
            
            {/* Animated Dots */}
            <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5 }}>
              {[0, 1, 2].map((index) => (
                <Box
                  key={index}
                  sx={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    backgroundColor: theme.palette.primary.main,
                    animation: `${waveAnimation} 1.4s ease-in-out infinite`,
                    animationDelay: `${index * 0.2}s`,
                  }}
                />
              ))}
            </Box>
          </Box>
        </Fade>
      )}

      {/* Progress Bar */}
      <Box
        sx={{
          width: isMobile ? 200 : 300,
          height: 4,
          borderRadius: 2,
          backgroundColor: theme.palette.action.hover,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: "100%",
            background: `linear-gradient(90deg, 
              ${theme.palette.primary.main} 0%, 
              ${theme.palette.secondary.main} 50%, 
              ${theme.palette.primary.main} 100%)`,
            backgroundSize: "200% 100%",
            animation: `${gradientAnimation} 2s ease-in-out infinite`,
            borderRadius: 2,
          }}
        />
      </Box>
    </Box>
  );

  // Overlay variant (full screen)
  if (variant === "overlay") {
    return (
      <Fade in timeout={300}>
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100dvh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.palette.mode === "dark" 
              ? "rgba(0, 0, 0, 0.8)" 
              : "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(8px)",
            zIndex: theme.zIndex.modal,
          }}
        >
          <SpinnerContent />
        </Box>
      </Fade>
    );
  }

  // Inline variant
  return (
    <Fade in timeout={300}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
          minHeight: variant === "container" ? 200 : "auto",
        }}
      >
        <SpinnerContent />
      </Box>
    </Fade>
  );
};

export default LoadingSpinner;