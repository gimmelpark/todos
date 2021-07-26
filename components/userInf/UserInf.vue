<template>
  <div>
    <template v-if=" todosLoaded && userLoaded ">
      <div>
        <inf-field 
          v-for="(field, i) in infFields"
          :key="`field-${i}`"
          :title=" field.title "
          :text=" field.text "
        />
      </div>
      
      <user-inf-todos 
        :user-id=" user.id "
      />
    </template>

    <div v-else class="mt-3 ml-4 font-size-lg font-semibold text-gray-500">
      Loading...
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    userId: {
      type: Number,
      required: true,
    },
  },

  computed: {
    ...mapGetters('todos', {
      todosLoaded: 'getLoadingCompleted',
    }),
    ...mapGetters('users', {
      userLoaded: 'getLoadingCompleted',
    }),

    user () {
      return this.$store.getters['users/getUserById'](this.userId)
    },

    // список полей
    infFields () {
      return [
        {
          title: 'Name',
          text: this.user.name,
        },
        {
          title: 'Login',
          text: this.user.username,
        },
        {
          title: 'Website',
          text: this.user.website,
        },
        {
          title: 'Email',
          text: this.user.email,
        },
        {
          title: 'Company',
          text: this.user.company.name,
        },
        {
          title: 'Phone',
          text: this.user.phone,
        },
        {
          title: 'Address',
          text: this.addressText,
        },
      ]
    },

    addressText () {
      return `${ this.user.address.city}, ${ this.user.address.street}, ${ this.user.address.suite}`
    },
  },
}
</script>
