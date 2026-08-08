import { defineStore } from 'pinia';
import {Product, products} from '@/data/products';

export type BuyState = 'idle' | 'processing' | 'in-cart';

const STORAGE_KEY = 'banki-shop-cart';

interface CartStorage {
  cartItems: Record<number, boolean>;
}

export const useProductsStore = defineStore('products', {
  state: () => ({
    cartItems: {} as Record<number, boolean>,
    buyStates: {} as Record<number, BuyState>,
    searchQuery: '',
    selectedProductId: null as number | null,
  }),

  getters: {
    filteredProducts(): typeof products {
      const query = this.searchQuery.trim().toLowerCase();
      if (!query) {
        return products;
      }
      return products.filter((product) =>
        product.title.toLowerCase().includes(query),
      );
    },

    selectedProduct(): Product | null {
      if (this.selectedProductId === null) {
        return null;
      }
      return products.find((product) => product.id === this.selectedProductId) ?? null;
    },
  },

  actions: {
    initFromStorage(): void {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return;
      }

      try {
        const parsed = JSON.parse(raw) as CartStorage;
        this.cartItems = parsed.cartItems ?? {};

        Object.entries(this.cartItems).forEach(([id, inCart]) => {
          if (inCart) {
            this.$patch({
              buyStates: {
                ...this.buyStates,
                [Number(id)]: 'in-cart',
              },
            });
          }
        });
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    },

    persistCart(): void {
      const payload: CartStorage = { cartItems: this.cartItems };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    },

    setSearchQuery(query: string): void {
      this.searchQuery = query;
    },

    getBuyState(productId: number): BuyState {
      return this.buyStates[productId] ?? (this.cartItems[productId] ? 'in-cart' : 'idle');
    },

    async buyProduct(productId: number): Promise<void> {
      const currentState = this.getBuyState(productId);
      // Если уже в процессе - игнорируем
      if (currentState === 'processing') {
        return;
      }

      // Если товар уже в корзине - удаляем
      if (currentState === 'in-cart' || this.cartItems[productId]) {
        // Удаляем из корзины
        this.buyStates = { ...this.buyStates };
        delete this.buyStates[productId];

        this.cartItems = { ...this.cartItems };
        delete this.cartItems[productId];

        this.persistCart();
        return;
      }

      // Иначе добавляем в корзину
      this.buyStates = { ...this.buyStates, [productId]: 'processing' };

      await new Promise((resolve) => {
        window.setTimeout(resolve, 2000);
      });

      this.buyStates = { ...this.buyStates, [productId]: 'in-cart' };
      this.cartItems = { ...this.cartItems, [productId]: true };
      this.persistCart();
    },

    openModal(productId: number): void {
      this.selectedProductId = productId;
    },

    closeModal(): void {
      this.selectedProductId = null;
    },
  },
});
