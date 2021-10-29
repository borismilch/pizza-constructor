<template>
  <v-app >
  <div class="text-center">
    <v-snackbar
      absolute
      style="bottom: 40px"
      v-model="snackbar"
      :timeout="3300"
      :color="messageType"
    >
      {{ messageText }}
    </v-snackbar>
  </div>

    <PageNavs />
    <v-main>
      <v-container>
        <Nuxt @message="useMessage($event)" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import messages from '../utils/messages'
import { IMessage, IMessages } from '../types/types'

import PageNavs from '../components/PageNavs.vue'
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  components: {
    PageNavs
  }
})

export default class Default extends Vue {
  messages: IMessages = messages
  messageText: String = ''
  messageType: String = ''
  snackbar: Boolean = false

  useMessage(e: string) {
    console.log(e)
    const message: IMessage = this.messages[e]
    this.messageText = message.message
    this.messageType = message.type
    this.snackbar = true
  }

  mounted() {
    if (typeof this.$route.query.message === "string") {
      this.useMessage(this.$route.query.message)
    }
  }
  created () {
  this.$nuxt.$on('message', (e: string) => {
    this.useMessage(e)
  })
}
}
</script>
