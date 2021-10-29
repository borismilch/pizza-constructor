<template>
    <v-app >
      <div class="text-center">
        <v-snackbar
          absolute
          style="bottom: 40px"
          v-model="snackbar"
          :timeout="3000"
          :color="messageType"
        >
          {{ messageText }}
        </v-snackbar>
      </div>
      <PageNavs :empty="true" />
      <v-container>
       
        <div class="center">
          <Nuxt/>
        </div>
       
      </v-container>
  </v-app>
</template>

<script lang="ts">
import messages from '../utils/messages'
import { IMessage, IMessages } from '../types/types'
import Footer from '../components/Foo.vue'
import PageNavs from '../components/PageNavs.vue'
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  components: { Footer, PageNavs }
})

export default class EmptyLayout extends Vue {
  messages: IMessages = messages
  messageText: String = ''
  messageType: String = ''
  snackbar: Boolean = false

  useMessage(e: string ) {
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
}
</script>

<style lang="scss" scoped>
  .center {
    overflow: hidden;
    height: 88vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>