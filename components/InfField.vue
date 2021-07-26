<template>
  <div class="mt-3 ml-4">
    <div class="text-lg font-bold text-gray-500">
      {{ title }}:
    </div>

    <div 
      v-if=" !link "
      class="ml-1 font-semibold"
      :class=" textClass "
    >
      {{ text }}
    </div>

    <NuxtLink
      v-else
      :to=" linkTo "
      class="ml-1 font-semibold"
      :class=" linkClass "
    >
      {{ text }}
    </NuxtLink>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    textColor: {
      type: String,
      default: 'gray-600',
    },
    link: {
      type: Boolean,
      default: false,
    },
    linkTo: {
      type: Object,
      default () {
        return { name: 'index' }
      },
    },
  },

  computed: {
    textClass () {
      return `text-${ this.textColor }`
    },

    linkClass () {
      return `text-${ this.textColor } hover:underline`
    }
  },
}
</script>
