import birthOfVenus1 from '@/assets/images/products/birth-of-venus.webp';
import birthOfVenus2 from '@/assets/images/products/birth-of-venus.webp';
import birthOfVenus3 from '@/assets/images/products/birth-of-venus.webp';
import lastSupper1 from '@/assets/images/products/last-supper.webp';
import lastSupper2 from '@/assets/images/products/last-supper.webp';
import lastSupper3 from '@/assets/images/products/last-supper.webp';
import creationOfAdam1 from '@/assets/images/products/creation-of-adam.webp';
import creationOfAdam2 from '@/assets/images/products/creation-of-adam.webp';
import creationOfAdam3 from '@/assets/images/products/creation-of-adam.webp';
import anatomyLesson1 from '@/assets/images/products/anatomy-lesson.webp';
import anatomyLesson2 from '@/assets/images/products/anatomy-lesson.webp';
import anatomyLesson3 from '@/assets/images/products/anatomy-lesson.webp';

export interface Product {
  id: number;
  title: string;
  price: number;
  oldPrice?: number;
  sold: boolean;
  description: string;
  images: string[];
}

export const NAV_LINKS = [
  'Каталог',
  'Доставка',
  'Оплата',
  'Контакты',
  'О компании',
] as const;

export const products: Product[] = [
  {
    id: 1,
    title: '«Рождение Венеры» Сандро Боттичелли',
    price: 1_000_000,
    oldPrice: 2_000_000,
    sold: false,
    description:
      'Шедевр итальянского Возрождения, написанный около 1485 года. Картина изображает богиню Венеру, выходящую из морской пены на раковине.',
    images: [birthOfVenus1, birthOfVenus2, birthOfVenus3],
  },
  {
    id: 2,
    title: '«Тайная вечеря»  Леонардо да Винчи',
    price: 3_000_000,
    sold: false,
    description:
      'Одна из самых известных фresок в истории искусства. Леонардо да Vinci изобразил момент, когда Иисус объявляет, что один из апостолов его предаст.',
    images: [lastSupper1, lastSupper2, lastSupper3],
  },
  {
    id: 3,
    title: '«Сотворение Адама» Микеланджело',
    price: 5_000_000,
    oldPrice: 6_000_000,
    sold: false,
    description:
      'Фрагмент росписи потолка Сикстинской капеллы. Знаменитый жест протянутых друг к другу рук Бога и Адама стал одним из самых узнаваемых образов в искусстве.',
    images: [creationOfAdam1, creationOfAdam2, creationOfAdam3],
  },
  {
    id: 4,
    title: '«Урок анатомии»  Рембрандт',
    price: 0,
    sold: true,
    description:
      'Групповой портрет доктора Николаса Тульпа, демонстрирующего анатомию. Картина считается одним из вершинных произведений голландского Золотого века.',
    images: [anatomyLesson1, anatomyLesson2, anatomyLesson3],
  },
];

export function formatPrice(value: number): string {
  return `${value.toLocaleString('ru-RU')} $`;
}
