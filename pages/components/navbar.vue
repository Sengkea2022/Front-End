<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'
import { useColorMode } from '#imports'
const colorMode = useColorMode();
const isSm = useMediaQuery('(min-width: 640px)');
const isMd = useMediaQuery('(min-width: 768px)');
const isLg = useMediaQuery('(min-width: 1024px)');
const isXl = useMediaQuery('(min-width: 1280px)');
const is2Xl = useMediaQuery('(min-width: 1536px)');
const logo = computed(() => ([
  {
    label: 'Logo',
    slot: 'logo-img'
  },
]));
const menu = computed(() => ([
  {
    label: 'Menu',
    onSelect: toggleCollapse
  },
]));
const itemsStart = computed(() => ([
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'About',
    to: '/about',
  },
  {
    label: 'Contact',
    to: '/contact',
  },
]));
const itemsEnd = computed(() => ([
  {
    icon: colorMode.preference === 'light' ? 'iconamoon:mode-dark-bold' : 'iconamoon:mode-light-bold',
    onSelect: handletoggleMode,
  },
]));
const navState = computed(() => {
  return isSm.value ? 'horizontal' : 'vertical';
})
const handletoggleMode = () => {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}
const collapsed = ref(true);
const toggleCollapse = () => {
  collapsed.value = !collapsed.value;
}
const imageLoaded = ref(true)
const onError = () => {
  imageLoaded.value = false
}
</script>
<template>
  <div class="sm:flex justify-between">
    <div class="sm:flex">
      <div class="flex justify-between">
        <div class="flex-1 flex justify-center">
          <UNavigationMenu :items="logo" orientation="horizontal">
            <template #logo-img>
              <NuxtImg v-if="imageLoaded" src="/OIP.webp" height="50" alt="logo" @error="onError" class="mr-2" />
            </template>
          </UNavigationMenu>
        </div>
        <div class="sm:hidden">
          <UNavigationMenu :items="menu" orientation="horizontal" />
        </div>
      </div>
      <UNavigationMenu v-if="isSm || !collapsed" :items="itemsStart" :orientation="navState" highlight
        highlight-color="primary" />
    </div>
    <UNavigationMenu v-if="isSm || !collapsed" :items="itemsEnd" :orientation="navState" />
  </div>
</template>