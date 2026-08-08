<template>
  <header class="header">
    <div class="container header__inner">
      <nav class="header__nav" aria-label="Основная навигация">
        <a
          v-for="link in navLinks"
          :key="link"
          href="#"
          class="header__nav-link"
          @click.prevent
        >
          {{ link }}
        </a>
      </nav>
      <SearchBar />
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import { NAV_LINKS } from '@/data/products';
import SearchBar from '@/components/SearchBar.vue';

export default Vue.extend({
  name: 'AppHeader',
  components: {
    SearchBar,
  },
  data() {
    return {
      navLinks: NAV_LINKS,
    };
  },
});
</script>

<style lang="scss" scoped>
.header {
  padding: 24px 0;
  border-bottom: 1px solid $color-border;

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding-left: 96px;
  }

  &__nav {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 48px;
  }

  &__nav-link {
    font-family: $font;
    font-size: 16px;
    color: $color-text;
    transition: opacity $transition;

    &:hover {
      opacity: 0.7;
    }
  }
}

@media (max-width: 992px) {
  .header {
    border-bottom: 1px solid $color-border;
    &__inner {
      padding-left: 16px;
      flex-direction: column;
      align-items: stretch;
    }

    &__nav {
      justify-content: center;
      gap: 16px 20px;
    }
  }
}

@media (max-width: 480px) {
  .header {
    padding: 16px 0;
    border-bottom: 1px solid ;

    &__nav {
      gap: 12px 16px;
    }

    &__nav-link {
      font-size: 14px;
    }
  }
}
</style>