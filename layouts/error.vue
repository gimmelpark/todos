<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <div>
      <div class="text-2xl font-semibold text-gray-500">
        {{ errorCodeText }}
      </div>
      <div class="text-gray-600">
        {{ errorMessageText }}
      </div>
      <NuxtLink 
        class="block h-8 w-24 mt-4 text-center leading-8 text-white bg-primary-600 rounded-md hover:bg-primary-500"
        :to="{ name: 'index' }"
      >Go Home</NuxtLink>
    </div>
    
  </div>
</template>

<script>
export default {
  layout: 'empty',

  props: {
    error: {
      type: Object,
      default () {
        return {
          messege: undefined,
          statusCode: undefined,
        }
      },
    },
  },

  computed: {
    errorCodeText () {
      return this.error.statusCode !== undefined ?
        `Error ${ this.error.statusCode }.` :
        'Error'
    },

    errorMessageText () {
      return this.error.message !== undefined ?
        this.error.message :
        'Unknown error'
    },

  },
}
</script>
