<template>
  <section class="product-grid">
    <TransitionGroup name="product-fade" tag="div" class="product-grid__list">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </TransitionGroup>
    <p v-if="filteredProducts.length === 0" class="product-grid__empty">
      По вашему запросу ничего не найдено
    </p>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapStores } from 'pinia';
import { useProductsStore } from '@/store/products';
import ProductCard from '@/components/ProductCard.vue';

export default Vue.extend({
  name: 'ProductGrid',
  components: {
    ProductCard,
  },
  computed: {
    ...mapStores(useProductsStore),
    filteredProducts() {
      return this.productsStore.filteredProducts;
    },
  },
});
</script>

<style lang="scss" scoped>
.product-grid {
  &__list {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 28px;
  }

  &__empty {
    margin: 0;
    padding: 48px 0;
    text-align: center;
    font-family: $font;
    font-size: 20px;
    color: $color-text-muted;
  }
}

.product-fade-enter-active,
.product-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.product-fade-enter,
.product-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (max-width: 1100px) {
  .product-grid__list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .product-grid__list {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>
