<template>
  here is guest layout
    <slot/>
</template>
<script setup>
definePageMeta({
  layout: "guest",
});
</script>