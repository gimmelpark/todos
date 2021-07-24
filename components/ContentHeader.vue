<template>
  <div class="h-12 bg-gray-50 shadow flex flex-row items-center">
    <NuxtLink 
      :to="{ name: 'index' }" 
      :class="`ml-4 block h-8 w-20 bg-primary-700 hover:bg-primary-600 rounded-md 
        flex flex-row justify-center items-center text-white shadow-lg hover:shadow-md`"
    >

      <svg 
        class="h-5 w-5" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          d="M15 19l-7-7 7-7" 
        />
      </svg>

      <div class="mr-2">Home</div>
    </NuxtLink>
  </div>
</template>

<script>
export default {

}
</script>
