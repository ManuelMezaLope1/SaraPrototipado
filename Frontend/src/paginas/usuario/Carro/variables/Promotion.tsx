import { getPromotionById, PRODUCT_PROMO } from "../../promocion/variables/PromotionVariable";

export function getPriceInfo(product: any) {
  const promo = getPromotionById(PRODUCT_PROMO[product.id]) ?? null;
  const original = product.price;
  const final =
    promo?.type === 'percent' ? Math.round(original * (100 - promo.percent)) / 100 : original;

  return { promo, original, final, hasDiscount: final < original };
}