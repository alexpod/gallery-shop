<template>
  <article class="product-card" :class="{ 'product-card--sold': product.sold }" @click="openProduct">
    <div
      class="product-card__media"
    >
      <img
        :src="product.images[0]"
        :alt="product.title"
        class="product-card__image"
        loading="lazy"
      />
    </div>

    <div class="product-card__body">
      <div class="product-card__title-btn">
        <h2 class="product-card__title h2">{{ product.title }}</h2>
        <p class="product-card__artist">{{ product.artist }}</p>
      </div>

      <div class="product-card__footer">
        <template v-if="product.sold">
          <p class="product-card__sold">Продана на аукционе</p>
        </template>
        <template v-else>
          <div class="product-card__prices">
            <span v-if="product.oldPrice" class="product-card__old-price h6">
              {{ formatPrice(product.oldPrice) }}
            </span>
            <span class="product-card__price h3">{{ formatPrice(product.price) }}</span>
          </div>
          <BuyButton :state="buyState" @buy="handleBuy" />
        </template>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { mapStores } from 'pinia';
import { formatPrice, Product } from '@/data/products';
import { useProductsStore } from '@/store/products';
import BuyButton from '@/components/BuyButton.vue';

export default Vue.extend({
  name: 'ProductCard',
  components: {
    BuyButton,
  },
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
  },
  computed: {
    ...mapStores(useProductsStore),
    buyState() {
      return this.productsStore.getBuyState(this.product.id);
    },
  },
  methods: {
    formatPrice,
    openProduct(): void {
      this.productsStore.openModal(this.product.id);
    },
    handleBuy(): void {
      this.productsStore.buyProduct(this.product.id);
    },
  },
});
</script>

<style lang="scss" scoped>
.product-card {
  display: flex;
  flex-direction: column;
  border: 1px solid $color-border;

  &--sold {
    opacity: 0.45;

    .product-card__image {
      filter: grayscale(100%);
    }
  }

  &__media,
  &__title-btn {
    padding: 0;
    border: none;
    background: none;
    text-align: left;
    cursor: pointer;
  }

  &__media {
    display: block;
    width: 100%;

    &:disabled {
      cursor: default;
    }
  }

  &__image {
    width: 100%;
    object-fit: cover;
  }

  &__body {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 20px;
  }

  &__title-btn {
    margin-bottom: 20px;

    &:disabled {
      cursor: default;
    }

    &:not(:disabled):hover .product-card__title {
      opacity: 0.75;
    }
  }

  &__title {
    margin: 0 0 4px;
    font-family: $font;
    color: $color-text;
    transition: opacity $transition;
  }

  &__artist {
    margin: 0;
    font-family: $font;
    font-size: 16px;
    color: $color-text;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-top: auto;
  }

  &__prices {
    display: flex;
    flex-direction: column;
  }

  &__old-price {
    font-family: $font;
    color: $color-text-light;
    text-decoration: line-through;
  }

  &__price {
    font-family: $font;
    color: $color-text;
    white-space: nowrap;
  }

  &__sold {
    margin: 0;
    font-family: $font;
    font-size: 16px;
    color: $color-text-light;
  }
}

@media (max-width: 480px) {
  .product-card {
    &__body {
      padding: 14px 14px 18px;
    }

    &__title {
      font-size: 16px;
    }

    &__artist,
    &__sold {
      font-size: 14px;
    }

    &__footer {
      flex-wrap: wrap;
    }
  }
}
</style>
