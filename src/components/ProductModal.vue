<template>
  <Transition name="modal-fade">
    <div
      v-if="product"
      class="modal"
      role="dialog"
      aria-modal="true"
      :aria-label="product.title"
      @click.self="closeModal"
    >
      <div class="modal__dialog">
        <button type="button" class="modal__close" aria-label="Закрыть" @click="closeModal">
          &times;
        </button>

        <div class="modal__content">
          <div class="modal__slider">
            <swiper ref="productSwiper" :options="swiperOptions">
              <swiper-slide v-for="(image, index) in product.images" :key="index">
                <img :src="image" :alt="`${product.title} — ${index + 1}`" class="modal__image" />
              </swiper-slide>
              <div slot="button-prev" class="modal__nav modal__nav--prev" aria-label="Предыдущий слайд" />
              <div slot="button-next" class="modal__nav modal__nav--next" aria-label="Следующий слайд" />
              <div slot="pagination" class="modal__pagination" />
            </swiper>
          </div>

          <div class="modal__info">
            <h2 class="modal__title h3">{{ product.title }}</h2>
            <p class="modal__description h6">{{ product.description }}</p>

            <div v-if="!product.sold" class="modal__price-block">
              <span v-if="product.oldPrice" class="modal__old-price">
                {{ formatPrice(product.oldPrice) }}
              </span>
              <span class="modal__price">{{ formatPrice(product.price) }}</span>
            </div>
            <p v-else class="modal__sold h3">Продана на аукционе</p>

            <BuyButton
              v-if="!product.sold"
              class="modal__buy"
              :state="buyState"
              @buy="handleBuy"
            />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapStores } from 'pinia';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import {formatPrice, Product} from '@/data/products';
import { useProductsStore } from '@/store/products';
import BuyButton from '@/components/BuyButton.vue';
import 'swiper/css/swiper.css';

export default Vue.extend({
  name: 'ProductModal',
  components: {
    Swiper,
    SwiperSlide,
    BuyButton,
  },
  data() {
    return {
      swiperOptions: {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 0,
        autoHeight: false,
        setWrapperSize: true,
        watchSlidesProgress: true,
        navigation: {
          nextEl: '.modal__nav--next',
          prevEl: '.modal__nav--prev',
        },
        pagination: {
          el: '.modal__pagination',
          clickable: true,
        },
      },
    };
  },
  computed: {
    ...mapStores(useProductsStore),
    product(): Product | null {
      return this.productsStore.selectedProduct as Product | null;
    },
    buyState(): string {
      return this.product ? this.productsStore.getBuyState(this.product.id) : 'idle';
    },
  },
  watch: {
    product(value) {
      if (value) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    },
  },
  beforeDestroy() {
    document.body.style.overflow = '';
  },
  methods: {
    formatPrice,
    closeModal(): void {
      this.productsStore.closeModal();
    },
    handleBuy(): void {
      if (this.product) {
        this.productsStore.buyProduct(this.product.id);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background-color: rgba(0, 0, 0, 0.55);

  &__dialog {
    position: relative;
    width: 100%;
    max-width: 1100px;
    max-height: calc(100vh - 48px);
    overflow: auto;
    background-color: $color-white;
  }

  &__close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: none;
    background: transparent;
    font-size: 28px;
    line-height: 1;
    color: $color-text;
    cursor: pointer;
    margin-left: auto;
    position: absolute;
    right: 10px;
  }

  &__content {
    display: grid;
    grid-auto-flow: column;
  }

  &__slider {
    position: relative;
    width: 600px;
    margin: 32px 28px;
  }

  &__image {
    width: 100%;
    height: 100%;
    min-height: 320px;
    object-fit: cover;
  }

  &__nav {
    position: absolute;
    top: 50%;
    z-index: 2;
    width: 36px;
    height: 36px;
    margin-top: -18px;
    background-color: rgba($color-primary, 0.8);
    cursor: pointer;
    text-align: center;

    &::after {
      font-family: $font;
      font-size: 22px;
      line-height: 36px;
      color: $color-white;
      text-align: center;
    }

    &--prev {
      left: 12px;

      &::after {
        content: '‹';
      }
    }

    &--next {
      right: 12px;

      &::after {
        content: '›';
      }
    }
  }

  &__pagination {
    position: absolute;
    bottom: 12px;
    left: 0;
    z-index: 2;
    width: 100%;
    text-align: center;
  }

  &__info {
    display: flex;
    flex-direction: column;
    padding: 32px 28px;
  }

  &__title {
    margin: 0 0 8px;
    font-family: $font;
  }

  &__artist {
    margin: 0 0 20px;
    font-family: $font;
    color: $color-text-muted;
  }

  &__description {
    margin: 0 0 24px;
    font-family: $font;
    color: $color-text;
  }

  &__price-block {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 20px;
  }

  &__old-price {
    font-family: $font;
    font-size: 16px;
    color: $color-text-light;
    text-decoration: line-through;
  }

  &__price {
    font-family: $font;
    font-size: 24px;
    color: $color-text;
  }

  &__sold {
    margin: 0 0 20px;
    font-family: $font;
    color: $color-text-light;
  }

  &__buy {
    align-self: flex-start;
  }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

::v-deep .swiper-pagination-bullet {
  width: 8px;
  height: 8px;
  background: rgba(255, 255, 255, 0.55);
  opacity: 1;
}

::v-deep .swiper-pagination-bullet-active {
  background: $color-white;
}
@media (max-width: 1000px) {
  .modal {
    &__close {
      right: 20px;
    }

    &__content {
      padding-top: 5px;
      grid-auto-flow: row;
    }

    &__dialog {
      max-width: 656px;
    }

    &__info {
      padding-top: 0;
    }
  }
}

@media (max-width: 768px) {
  .modal {
    padding: 16px;

    &__close {
      right: 10px;
    }

    &__content {
      grid-auto-flow: row;
    }

    &__slider {
      width: 320px;
      margin: 30px auto 0;
    }

    &__dialog {
      max-width: 360px;
    }

    &__image {
      min-height: 200px;
    }

    &__info {
      padding: 24px 20px 28px;
    }

    &__title {
      font-size: 24px;
    }
  }
}

@media (max-width: 480px) {
  .modal {
    padding: 12px;

    &__dialog {
      max-width: 360px;
      max-height: calc(100vh - 24px);
    }

    &__slider {
      margin: 0 auto;
    }

    &__info {
      padding: 20px 16px 24px;
    }

    &__title {
      font-size: 22px;
    }
  }
}
</style>
