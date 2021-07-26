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
    // заголовок
    title: {
      type: String,
      required: true,
    },
    // текст
    text: {
      type: String,
      required: true,
    },
    // цвет текста
    textColor: {
      type: String,
      default: 'gray-600',
    },
    // если должна быть ссылка
    link: {
      type: Boolean,
      default: false,
    },
    // куда ведет ссылка
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
