export const getConfig = () => {
  if (!window.shopdrop) {
    throw new Error('Window property for ShopDrop Config not properly loaded');
  }
  return window.shopdrop.config;
};

