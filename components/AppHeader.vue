<template>
  <div ref="header" class="bg-primary-500 flex flex-row text-white">
    <div class="mt-2 mb-2 ml-12 font-semibold">
      Welcome to the
      <span class="text-2xl text-bold pl-1">TODOS</span>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    this.$store.dispatch('setHeaderHeight', this.$refs.header.clientHeight)
  }
}
</script>
