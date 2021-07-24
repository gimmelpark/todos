<template>
  <div class="w-56 bg-gray-50 shadow-md z-20">
    <users-list-header />

    <hr>

    <div v-if=" loaded ">
      <div
        v-for="(user , i) in users"
        :key="`user-${i}`"
        class="mt-2"
      >
        <users-list-item
          :user-id="user.id"
        />
      </div>
    </div>
    
    <div 
      v-else 
      class="mt-2 ml-3"
    >Loading...</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'


export default {
  computed: {
    ...mapGetters('users', {
      users: 'getUsers',
      loaded: 'getLoadingCompleted',
    }),
  }
}
</script>
