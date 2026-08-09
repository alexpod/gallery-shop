<template>
  <form class="search" @submit.prevent="handleSubmit">
    <input
      id="search"
      v-model="localQuery"
      type="search"
      class="search__input"
      placeholder="Поиск по названию картины"
      aria-label="Поиск по названию картины"
    />
    <button type="submit" class="search__button">Найти</button>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapStores } from 'pinia';
import { useProductsStore } from '@/store/products';

export default Vue.extend({
  name: 'SearchBar',
  data() {
    return {
      localQuery: '',
    };
  },
  computed: {
    ...mapStores(useProductsStore),
  },
  mounted() {
    this.localQuery = this.productsStore.searchQuery;
  },
  methods: {
    handleSubmit(): void {
      this.productsStore.setSearchQuery(this.localQuery.trim());
    },
  },
});
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  align-items: stretch;
  width: 100%;
  max-width: 416px;
  margin-left: auto;

  &__input {
    flex: 1;
    min-width: 0;
    height: 48px;
    padding: 0 16px;
    border-radius: 0;
    background-color: transparent;
    border: 1px solid $color-border;
    color: $color-text;
    outline: none;
    font-size: 14px;

    &:focus {
      border-color: $color-border-active;
    }

    &::placeholder {
      color: $color-text-light;
    }
  }

  &__button {
    flex-shrink: 0;
    height: 48px;
    min-width: 120px;
    padding: 0 24px;
    border: none;
    background-color: $color-primary;
    color: $color-white;
    cursor: pointer;
    transition: background-color $transition;
    font-size: 14px;

    &:hover {
      background-color: $color-primary-hover;
    }
  }
}

@media (max-width: 992px) {
  .search {
    max-width: none;
    margin-left: 0;
  }
}

@media (max-width: 480px) {
  .search {
    &__input,
    &__button {
      height: 40px;
      font-size: 14px;
    }

    &__button {
      padding: 0 16px;
    }
  }
}
</style>
