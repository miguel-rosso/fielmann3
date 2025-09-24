// Global type declarations for CSS imports and other side-effect imports
declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.sass" {
  const content: Record<string, string>;
  export default content;  
}

// Allow side-effect imports of CSS files
declare module "./globals.css";