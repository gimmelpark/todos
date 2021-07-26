<template>
  <label>
    <div class="h-4 w-4 border-2 border-gray-500 border-solid rounded cursor-pointer">
      <transition
        leave-active-class="transition ease-in duration-100"
        leave-class="transform scale-100" 
        leave-to-class="transform scale-0"
        enter-active-class="transition ease-in duration-100"
        enter-class="transform scale-0"
        enter-to-class="transform scale-100"
      >
        <svg 
          v-show=" checked "
          class="h-3 w-3 text-gray-500" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="4" 
            d="M5 13l4 4L19 7" 
          />
        </svg>
      </transition>
    </div>

    <input 
      type="checkbox" 
      class="hidden"
      :value=" checked "
      @input=" onInput "
    >
  </label>
</template>

<script>
export default {
  props: {
    checked: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    onInput (e) {
      this.$emit('check')
    }
  },
}
</script>
