<template>
  <div class="flex flex-row items-center">
    <custom-select 
      class="w-32"
      :label=" activeSortType.text "
      :items=" sortTypesItems "
      @select=" onSelectType "
    />

    <button
      :class="`block h-8 w-8 ml-3 flex items-center justify-center bg-white text-gray-500 
        border-2 border-gray-400 rounded-full hover:border-gray-500 hover:text-gray-600`"
      @click=" dirBtnOnClick "
    >
      <transition
        mode="out-in"
        leave-active-class="transition ease-in duration-100"
        leave-class="transform scale-100"
        leave-to-class="transform scale-0"
        enter-active-class="transition ease-in duration-100"
        enter-class="transform scale-0"
        enter-to-class="transform scale-100"
      >
        <svg 
          :key=" sort.dir ? 'dir-1' : 'dir-0' "
          class="h-4 w-4 mt-1" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            :d=" sortDirIcon " 
          />
        </svg>
      </transition>
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters ('todos', {
      sort: 'getSort',
      sortTypes: 'getSortTypes',
    }),

    activeSortType () {
      return this.sortTypes.find( el => el.type === this.sort.type )
    },

    // типы сортировки для select
    sortTypesItems () {
      return this.sortTypes.map( el => el.text )
    },

    // иконка порядка сортировки
    sortDirIcon () {
      return this.sort.dir ? 
        'M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12' : 
        'M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4'
    }
  },

  methods: {
    onSelectType (e) {
      this.$store.dispatch('todos/setSortType', this.sortTypes.find ( el => el.text === e ).type )
    },
    dirBtnOnClick () {
      this.$store.dispatch('todos/setSortDirection', !this.sort.dir)
    }
  },
}
</script>
