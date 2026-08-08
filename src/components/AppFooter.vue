<template>
  <footer class="footer">
    <div class="container footer__inner">
      <nav class="footer__nav" aria-label="Навигация в подвале">
        <a
          v-for="link in navLinks"
          :key="link"
          href="#"
          class="footer__nav-link h5"
          @click.prevent
        >
          {{ link }}
        </a>
      </nav>

      <div class="footer__contacts">
        <a href="tel:+78125555555" class="footer__contact">
          <img :src="phoneIcon" alt="" class="footer__icon" aria-hidden="true" />
          <span class="h5">+7 (812) 555-55-55</span>
        </a>
        <p class="footer__contact">
          <img :src="locationIcon" alt="" class="footer__icon" aria-hidden="true" />
          <span class="h5">г. Санкт-Петербург, ул. Ефимова, 3</span>
        </p>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue';
import { NAV_LINKS } from '@/data/products';
import phoneIcon from '@/assets/images/icons/icon-phone.svg';
import locationIcon from '@/assets/images/icons/icon-location.svg';

export default Vue.extend({
  name: 'AppFooter',
  data() {
    return {
      navLinks: NAV_LINKS,
      phoneIcon,
      locationIcon,
    };
  },
});
</script>

<style lang="scss" scoped>
.footer {
  padding: 24px 0 32px;
  background-color: $color-bg;

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }

  &__nav {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 24px;
    margin-left: 96px;
  }

  &__nav-link {
    font-family: $font;
    color: $color-secondary;

    &:hover {
      opacity: 0.7;
    }
  }

  &__contacts {
    display: flex;
    align-items: flex-end;
    gap: 8px;
  }

  &__contact {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin: 0;
    font-family: $font;
    font-size: 16px;
    color: $color-secondary;

    &:first-child {
      margin-right: 51px;
    }
  }

  &__icon {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }
}

@media (max-width: 1100px) {
  .footer {
    &__inner {
      flex-direction: column;
      align-items: stretch;
    }

    &__nav {
      justify-content: center;
      gap: 16px 20px;
      margin-left: 0;
    }

    &__contacts {
      align-items: center;
      text-align: center;
      flex-direction: column;
    }
  }
}

@media (max-width: 480px) {
  .footer {
    padding: 20px 0 28px;

    &__nav-link,
    &__contact {
      font-size: 14px;
    }

    &__nav {
      gap: 12px 16px;
    }
  }
}
</style>
