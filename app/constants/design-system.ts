/**
 * Design System - Constantes de design centralisées
 * Utilisé pour maintenir la cohérence visuelle à travers l'application
 */

// === COULEURS ===
export const COLORS = {
  // Couleurs principales
  primary: '#047236',
  primaryHover: '#036629',
  primaryLight: '#04723608',
  
  // Couleurs de texte
  textPrimary: '#047236',
  textSecondary: '#343D48',
  textMuted: '#808080',
  textPlaceholder: '#999999',
  
  // Couleurs de bordure
  border: '#DCDCDC',
  borderLight: '#F2F2F2',
  
  // Couleurs d'état
  success: '#079748',
  successLight: '#E6F5ED',
  error: '#EF1A1A',
  errorLight: '#FEF2F2',
  warning: '#FFD600',
  info: '#0C5CB4',
  
  // Couleurs de fond
  bgWhite: '#FFFFFF',
  bgGray: '#F2F2F2',
  bgLight: '#04723608',
  
  // Couleurs thématiques Bénin
  green: '#009543',
  yellow: '#FFD600',
  red: '#EF1A1A',
} as const;

// === TYPOGRAPHIE ===
export const TYPOGRAPHY = {
  // Familles de police
  fontFamily: {
    montserrat: 'font-montserrat',
    openSans: 'font-open-sans',
  },
  
  // Tailles de police
  fontSize: {
    xs: 'text-xs',      // 12px
    sm: 'text-sm',      // 14px
    base: 'text-base',  // 16px
    lg: 'text-lg',      // 18px
    xl: 'text-xl',      // 20px
    '2xl': 'text-2xl',  // 24px
    '3xl': 'text-3xl',  // 30px
    '4xl': 'text-4xl',  // 36px
  },
  
  // Poids de police
  fontWeight: {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
  },
} as const;

// === ESPACEMENTS ===
export const SPACING = {
  // Padding
  padding: {
    xs: 'p-2',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  },
  
  // Margin
  margin: {
    xs: 'mb-2',
    sm: 'mb-3',
    md: 'mb-4',
    lg: 'mb-6',
    xl: 'mb-8',
  },
  
  // Gap
  gap: {
    xs: 'gap-2',
    sm: 'gap-3',
    md: 'gap-4',
    lg: 'gap-6',
  },
} as const;

// === COMPOSANTS ===
export const COMPONENTS = {
  // Input
  input: {
    height: 'h-[52px]',
    padding: 'px-4',
    border: `border border-[${COLORS.border}]`,
    borderRadius: 'rounded-md',
    fontSize: TYPOGRAPHY.fontSize.base,
    fontFamily: TYPOGRAPHY.fontFamily.montserrat,
    focus: 'focus:outline-none focus:ring-2 focus:ring-[#047236] focus:border-transparent',
    disabled: 'disabled:bg-gray-100 disabled:cursor-not-allowed',
  },
  
  // Button
  button: {
    height: 'h-[52px]',
    padding: 'px-6',
    borderRadius: 'rounded-lg',
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    fontFamily: TYPOGRAPHY.fontFamily.montserrat,
    primary: `bg-[${COLORS.primary}] text-white hover:bg-[${COLORS.primaryHover}]`,
    disabled: 'disabled:opacity-50 disabled:cursor-not-allowed',
  },
  
  // Label
  label: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    fontFamily: TYPOGRAPHY.fontFamily.montserrat,
    color: `text-[${COLORS.textPrimary}]`,
    margin: 'mb-2',
  },
} as const;

// === HELPERS ===

/**
 * Génère les classes pour un input
 */
export const getInputClasses = (hasError = false) => {
  const baseClasses = `
    w-full ${COMPONENTS.input.height} ${COMPONENTS.input.padding}
    ${COMPONENTS.input.borderRadius} ${COMPONENTS.input.fontSize}
    ${COMPONENTS.input.fontFamily} bg-white
    placeholder:text-[${COLORS.textPlaceholder}]
    ${COMPONENTS.input.focus} ${COMPONENTS.input.disabled}
    transition-all duration-200
  `.trim().replace(/\s+/g, ' ');
  
  const borderClass = hasError 
    ? `border-2 border-[${COLORS.error}]` 
    : `border border-[${COLORS.border}]`;
  
  return `${baseClasses} ${borderClass}`;
};

/**
 * Génère les classes pour un label
 */
export const getLabelClasses = () => {
  return `
    block ${COMPONENTS.label.fontSize} ${COMPONENTS.label.fontWeight}
    ${COMPONENTS.label.fontFamily} ${COMPONENTS.label.color}
    ${COMPONENTS.label.margin}
  `.trim().replace(/\s+/g, ' ');
};

/**
 * Génère les classes pour un button
 */
export const getButtonClasses = (variant: 'primary' | 'secondary' = 'primary') => {
  const baseClasses = `
    w-full ${COMPONENTS.button.height} ${COMPONENTS.button.padding}
    ${COMPONENTS.button.borderRadius} ${COMPONENTS.button.fontSize}
    ${COMPONENTS.button.fontWeight} ${COMPONENTS.button.fontFamily}
    ${COMPONENTS.button.disabled}
    transition-colors duration-200 cursor-pointer
  `.trim().replace(/\s+/g, ' ');
  
  const variantClass = variant === 'primary' 
    ? `bg-[${COLORS.primary}] text-white hover:bg-[${COLORS.primaryHover}]`
    : `bg-white text-[${COLORS.primary}] border-2 border-[${COLORS.primary}] hover:bg-[${COLORS.primaryLight}]`;
  
  return `${baseClasses} ${variantClass}`;
};

/**
 * Génère les classes pour un message d'erreur
 */
export const getErrorClasses = () => {
  return `text-sm ${TYPOGRAPHY.fontFamily.montserrat} text-[${COLORS.error}] mt-1`;
};

/**
 * Génère les classes pour un titre
 */
export const getTitleClasses = (size: 'sm' | 'md' | 'lg' = 'md') => {
  const sizeMap = {
    sm: 'text-xl sm:text-2xl',
    md: 'text-2xl sm:text-3xl',
    lg: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
  };
  
  return `
    ${sizeMap[size]} ${TYPOGRAPHY.fontWeight.extrabold}
    ${TYPOGRAPHY.fontFamily.montserrat} text-[${COLORS.textPrimary}]
    leading-tight text-center
  `.trim().replace(/\s+/g, ' ');
};

/**
 * Génère les classes pour un sous-titre
 */
export const getSubtitleClasses = () => {
  return `
    ${TYPOGRAPHY.fontSize.base} ${TYPOGRAPHY.fontFamily.montserrat}
    text-[${COLORS.textSecondary}] text-center
  `.trim().replace(/\s+/g, ' ');
};
