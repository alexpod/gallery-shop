<template>
  <div class="app">
    <AppHeader />
    <main class="app__main">
      <div class="container">
        <h1 class="app__title h1">Картины эпохи Возрождения</h1>
        <ProductGrid />
      </div>
    </main>
    <AppFooter />
    <ProductModal />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import ProductGrid from '@/components/ProductGrid.vue';
import ProductModal from '@/components/ProductModal.vue';

export default Vue.extend({
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    ProductGrid,
    ProductModal,
  },
});
</script>

<style lang="scss" scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &__main {
    flex: 1;
    padding: 45px 0 80px;
  }

  &__title {
    margin: 0 0 40px;
    font-family: $font;
    color: $color-text;
  }
}

@media (max-width: 768px) {
  .app {
    &__main {
      padding: 32px 0 56px;
    }

    &__title {
      margin-bottom: 28px;
    }
  }
}

@media (max-width: 480px) {
  .app {
    &__main {
      padding: 24px 0 48px;
    }

    &__title {
      margin-bottom: 24px;
      font-size: 26px;
    }
  }
}
</style>
