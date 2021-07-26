<template>
  <div class="relative">
    <button
      class="block w-full h-8 flex flex-row items-center justify-center bg-white text-gray-500 border-2 border-gray-400 rounded-md"
      @click=" btnOnClick "
    >
      <div>{{ label }}</div>

      <svg 
        class="h-5 w-4 pt-1 ml-2" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          d="M19 9l-7 7-7-7" 
        />
      </svg>

    </button>

    <transition 
      leave-active-class="transition ease-in duration-200"
      leave-class="opacity-100" 
      leave-to-class="opacity-0"
      enter-active-class="transition ease-in duration-200"
      enter-class="opacity-0"
      enter-to-class="opacity-100"
    >
      <div
        v-if=" selectOpened "
        class="absolute pt-1 pb-2 bg-white w-full shadow-md rounded-md top-0"
        @pointerleave=" closeSelect "
      >
        <button
          v-for="(item, i) in items"
          :key="`select-item-${i}`"
          class="block w-full text-gray-500 text-left px-2 mt-1 hover:bg-gray-100 hover:text-gray-700"
          @click=" itemOnClick($emit, i) "
        >
          {{ item }}
        </button>
      </div>
    </transition>
    
  </div>
</template>

<script>
export default {
  props: {
    // текст селекта
    label: {
      type: String,
      default: "Select",
    },
    // варианты выбора
    items: {
      type: Array,
      default () {
        return []
      },
    },
  },

  data: () => ({
    selectOpened: false,
  }),

  methods: {
    btnOnClick () {
      this.selectOpened = !this.selectOpened
    },
    closeSelect () {
      this.selectOpened = false
    },
    itemOnClick (e, i) {
      this.$emit ('select', this.items[i])
      this.closeSelect()
    },
  },
}
</script>
