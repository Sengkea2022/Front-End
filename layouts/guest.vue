<template>
  <Navbar/>
    <slot/>
</template>
<script setup>
import Navbar from '~/pages/components/navbar.vue';
definePageMeta({
  layout: "guest",
});
</script>