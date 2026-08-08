<template>
  <button
    type="button"
    class="buy-button"
    :class="buttonClass"
    :disabled="isDisabled"
    @click.stop="handleClick"
  >
    <span v-if="state === 'processing'" class="buy-button__icon buy-button__icon--spin">
      <svg viewBox="0 0 24 24" aria-hidden="true" width="24"
           height="24">
        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" fill="none" opacity="0.25" />
        <path d="M21 12a9 9 0 00-9-9" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" />
      </svg>
    </span>
    <span v-else-if="state === 'in-cart'" class="buy-button__icon">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M5 12l5 5L20 7"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
    <span class="buy-button__label h4">{{ label }}</span>
  </button>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import type { BuyState } from '@/store/products';

export default Vue.extend({
  name: 'BuyButton',
  props: {
    state: {
      type: String as PropType<BuyState>,
      required: true,
    },
  },
  computed: {
    label(): string {
      if (this.state === 'processing') {
        return 'Обрабатывается';
      }
      if (this.state === 'in-cart') {
        return 'В корзине';
      }
      return 'Купить';
    },
    buttonClass(): Record<string, boolean> {
      return {
        'buy-button--processing': this.state === 'processing',
        'buy-button--in-cart': this.state === 'in-cart',
      };
    },
    isDisabled(): boolean {
      return this.state === 'processing';
    },
  },
  methods: {
    handleClick(): void {
      this.$emit('buy');
    },
  },
});
</script>

<style lang="scss" scoped>
.buy-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 112px;
  height: 48px;
  padding: 0 8px;
  border: none;
  background-color: $color-primary;
  color: $color-white;
  cursor: pointer;
  transition: background-color $transition, opacity $transition;

  &:hover:not(:disabled) {
    background-color: $color-primary-hover;
  }

  &:disabled {
    cursor: default;
  }

  &--processing {
    opacity: 0.92;
  }

  &--in-cart {
    background-color: $color-primary-active;
  }

  &__icon {
    display: flex;
    width: 18px;
    height: 18px;
    min-width: 18px;

    svg {
      width: 100%;
      height: 100%;
    }

    &--spin {
      animation: spin 0.8s linear infinite;
    }
  }

  &__label {
    font-family: $font;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
