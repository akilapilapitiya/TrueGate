export const lightColors = {
  primary: {
    main: "rgba(5, 91, 122, 1)", 
    light: "rgb(52, 144, 176)", 
    dark: "rgb(15, 85, 110)", 
    contrastText: "rgb(255, 255, 255)",
  },
  secondary: {
    main: "rgb(46, 204, 113)", 
    light: "rgb(88, 214, 141)", 
    dark: "rgb(32, 156, 86)", 
    contrastText: "rgb(255, 255, 255)",
  },
  error: {
    main: "rgb(231, 76, 60)", 
    light: "rgb(236, 112, 99)",
    dark: "rgb(203, 67, 53)",
    contrastText: "rgb(255, 255, 255)",
  },
  warning: {
    main: "rgb(241, 196, 15)", 
    light: "rgb(244, 208, 63)",
    dark: "rgb(212, 172, 13)",
    contrastText: "rgb(33, 37, 41)",
  },
  info: {
    main: "rgb(52, 152, 219)", 
    light: "rgb(93, 173, 226)",
    dark: "rgb(40, 116, 166)",
    contrastText: "rgb(255, 255, 255)",
  },
  success: {
    main: "rgb(46, 204, 113)", 
    light: "rgb(88, 214, 141)",
    dark: "rgb(32, 156, 86)",
    contrastText: "rgb(255, 255, 255)",
  },
  background: {
    default: "rgba(229, 244, 241, 1)", 
    paper: "rgba(230, 245, 244, 0.95)",
  },
  text: {
    primary: "rgb(45, 55, 72)", 
    secondary: "rgb(113, 128, 150)", 
    disabled: "rgb(160, 174, 192)", 
  },
  divider: "rgba(226, 232, 240, 0.8)", 
};

export const darkColors = {
  primary: {
    main: "rgb(74, 144, 226)", 
    light: "rgb(116, 185, 255)", 
    dark: "rgb(22, 113, 146)", 
    contrastText: "rgb(255, 255, 255)",
  },
  secondary: {
    main: "rgb(72, 187, 120)", 
    light: "rgb(104, 211, 145)", 
    dark: "rgb(46, 204, 113)",
    contrastText: "rgb(255, 255, 255)",
  },
  error: {
    main: "rgb(254, 107, 139)", 
    light: "rgb(252, 129, 129)",
    dark: "rgb(220, 38, 127)",
    contrastText: "rgb(255, 255, 255)",
  },
  warning: {
    main: "rgb(251, 211, 141)", 
    light: "rgb(253, 230, 138)",
    dark: "rgb(217, 119, 6)",
    contrastText: "rgb(33, 37, 41)",
  },
  info: {
    main: "rgb(99, 179, 237)",
    light: "rgb(147, 197, 253)",
    dark: "rgb(29, 78, 216)",
    contrastText: "rgb(255, 255, 255)",
  },
  success: {
    main: "rgb(72, 187, 120)",
    light: "rgb(104, 211, 145)",
    dark: "rgb(46, 204, 113)",
    contrastText: "rgb(255, 255, 255)",
  },
  background: {
    default: "rgba(15, 23, 42, 0.95)", 
    paper: "rgba(2, 15, 47, 0.8)", 
  },
  text: {
    primary: "rgb(248, 250, 252)", 
    secondary: "rgb(203, 213, 225)", 
    disabled: "rgb(148, 163, 184)", 
  },
  divider: "rgba(71, 85, 105, 0.3)", 
};


export const customColors = {
  brand: {
    primary: "rgb(22, 113, 146)",
    secondary: "rgb(46, 204, 113)", 
    tertiary: "rgb(52, 152, 219)", 
    quaternary: "rgb(155, 89, 182)", 
  },
  status: {
    online: "rgb(46, 204, 113)",
    offline: "rgb(231, 76, 60)",
    away: "rgb(241, 196, 15)", 
    secure: "rgb(22, 113, 146)", 
    alert: "rgb(230, 126, 34)", 
    scanning: "rgb(52, 152, 219)", 
    maintenance: "rgb(155, 89, 182)", 
  },
  security: {
    safe: "rgb(46, 204, 113)", 
    warning: "rgb(241, 196, 15)",
    danger: "rgb(231, 76, 60)", 
    scanning: "rgb(52, 152, 219)", 
    encrypted: "rgb(22, 113, 146)",
    monitored: "rgb(155, 89, 182)", 
  },
  gradients: {
    // Hero gradients
    primary: "linear-gradient(135deg, rgba(22, 113, 146, 0.95) 0%, rgba(15, 23, 42, 0.9) 100%)",
    secondary: "linear-gradient(135deg, rgba(46, 204, 113, 0.9) 0%, rgba(22, 113, 146, 0.95) 100%)",
    hero: "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(22, 113, 146, 0.1) 50%, rgba(46, 204, 113, 0.05) 100%)",
    
    // Card gradients
    card: "linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(22, 113, 146, 0.02) 100%)",
    cardHover: "linear-gradient(145deg, rgba(255, 255, 255, 0.15) 0%, rgba(22, 113, 146, 0.05) 100%)",
    
    // Background gradients
    lightBg: "linear-gradient(135deg, rgba(248, 250, 252, 1) 0%, rgba(241, 245, 249, 1) 100%)",
    darkBg: "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)",
    
    // Interactive gradients
    button: "linear-gradient(135deg, rgba(22, 113, 146, 1) 0%, rgba(15, 85, 110, 1) 100%)",
    buttonHover: "linear-gradient(135deg, rgba(52, 144, 176, 1) 0%, rgba(22, 113, 146, 1) 100%)",
    
    // Accent gradients
    accent: "linear-gradient(45deg, rgba(46, 204, 113, 0.8) 0%, rgba(52, 152, 219, 0.8) 100%)",
    premium: "linear-gradient(135deg, rgba(22, 113, 146, 0.8) 0%, rgba(155, 89, 182, 0.6) 100%)",

    // For Features and CTA sections
    featuresDark: "radial-gradient(circle at 50% 50%, rgba(46,204,113,0.08) 0%, transparent 60%), linear-gradient(135deg, #0f172a, #1e293b)",
    featuresLight: "radial-gradient(circle at 50% 50%, rgba(52,152,219,0.08) 0%, transparent 60%), linear-gradient(135deg, #fafffc, #ffffff)",

    ctaDark: "linear-gradient(135deg, rgba(46,204,113,0.1) 0%, rgba(52,152,219,0.08) 100%), linear-gradient(135deg, #0f172a, #1e293b)",
    ctaLight: "linear-gradient(135deg, rgba(52,152,219,0.05) 0%, rgba(46,204,113,0.08) 100%), linear-gradient(135deg, #ffffff, #f4fefc)",
  },
  tech: {
    neon: "rgb(0, 255, 127)",
    matrix: "rgb(0, 255, 65)", 
    circuit: "rgb(22, 113, 146)",
    display: "rgb(46, 204, 113)", 
    laser: "rgb(52, 152, 219)", 
    hologram: "rgb(155, 89, 182)", 
  },
  surfaces: {
    // Glassmorphism surfaces
    glass: "rgba(255, 255, 255, 0.1)",
    glassHover: "rgba(255, 255, 255, 0.2)",
    glassDark: "rgba(30, 41, 59, 0.3)",
    glassDarkHover: "rgba(30, 41, 59, 0.5)",
    
    // Elevated surfaces
    elevated: "rgba(255, 255, 255, 0.95)",
    elevatedHover: "rgba(255, 255, 255, 1)",
    elevatedDark: "rgba(30, 41, 59, 0.9)",
    elevatedDarkHover: "rgba(30, 41, 59, 1)",
  },
  shadows: {
    // Color-matched shadows
    primary: "rgba(22, 113, 146, 0.25)",
    secondary: "rgba(46, 204, 113, 0.25)",
    accent: "rgba(52, 152, 219, 0.25)",
    premium: "rgba(155, 89, 182, 0.25)",
    
    // Standard shadows
    light: "rgba(15, 23, 42, 0.1)",
    medium: "rgba(15, 23, 42, 0.15)",
    heavy: "rgba(15, 23, 42, 0.25)",
    
    // Colored shadows for depth
    glow: "rgba(22, 113, 146, 0.4)",
    success: "rgba(46, 204, 113, 0.3)",
    warning: "rgba(241, 196, 15, 0.3)",
    error: "rgba(231, 76, 60, 0.3)",
  },
  borders: {
    // Subtle borders
    light: "rgba(226, 232, 240, 0.8)",
    medium: "rgba(203, 213, 225, 0.6)",
    dark: "rgba(71, 85, 105, 0.3)",
    
    // Colored borders
    primary: "rgba(22, 113, 146, 0.3)",
    secondary: "rgba(46, 204, 113, 0.3)",
    accent: "rgba(52, 152, 219, 0.3)",
    premium: "rgba(155, 89, 182, 0.3)",
  },
};
 