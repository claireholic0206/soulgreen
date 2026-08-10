// Supabase 存的是人民幣（CNY）進貨價，網站顯示的是台幣（TWD）售價。
const CNY_TO_TWD_RATE = 5;

export function toTwd<T extends { price: number | null | undefined }>(product: T): T {
  return {
    ...product,
    price: product.price == null ? product.price : product.price * CNY_TO_TWD_RATE,
  };
}
