<template>
  <form @submit.prevent="sendChatMessage">
    <div class="">
      <label for="about" class="block text-sm/6 font-medium text-gray-900">
        Ask about our products
      </label>
      <div class="mt-2">

        <div class="w-1/2 space-y-4">

          <div class="bg-gray-100 p-4 rounded-lg max-h-[300px] overflow-y-auto">
            <template v-for="message in messages">
              <p>
                <b>{{ message.from }}:</b>
                {{ message.message }}
              </p>
            </template>
          </div>

          <UTextarea name="message" rows="3"
                     placeholder="Ask our AI about our products"
                     class="w-96"
                     v-model="message"
                     :disabled="isLoading"
          />

          <div>
            <UButton type="submit"
                     :loading="isLoading"
            >
              Send
            </UButton>
          </div>
        </div>
      </div>
    </div>

  </form>

</template>
<script setup>
import useChat from "~/composeables/useChat.js";

const {messages, openWebsocket, sendMessage, isLoading} = useChat()

onMounted(() => {
  openWebsocket()
})

const message = ref('')

const sendChatMessage = () => {
  if (message.value.length === 0) {
    alert('Please enter a message')
    return;
  }
  sendMessage(message.value)
  message.value = ''
}
</script>