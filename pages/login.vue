<template>
    <div class="flex justify-center items-center h-[50vh]">
        <UCard class="w-6/12 flex flex-col justify-center items-center py-5">
            <template #header>
                Login
            </template>
            <UForm>
                <UFormField :label="$t('email')">
                    <UInput v-model="form.email" />
                </UFormField>

                <UFormField :label="$t('password')">
                    <UInput v-model="form.password" />
                </UFormField>
            </UForm>
            <template #footer>
                <div class="text-center">
                    <UButton size="sm" class="w-48 justify-center" @click="submit" :loading="loading"
                        :disabled="throttleCountdown > 0">
                        <span v-if="throttleCountdown > 0" class="text-red-500">
                            {{ $t('try_again_in') }} {{ throttleCountdown }} {{ $t('seconds') }}
                        </span>
                        <span v-else>
                            {{ $t('login') }}
                        </span>
                    </UButton>
                </div>
            </template>
        </UCard>

    </div>
</template>
<script setup>

const router = useRouter();
const toast = useToast();
// const message = useMessage();

definePageMeta({
    layout: 'guest'
});
const { $api } = useNuxtApp()
const form = reactive({
    email: '',
    password: ''
})
const throttleCountdown = ref(0)
const loading = ref(false)

async function submit() {
    loading.value = true;
    if (!form.email || !form.password) {
        toast.add({
            title: 'Missing fields',
            description: 'Please enter both email and password',
            color: 'warning'
        })
        return
    }
    try {
        await $api('/login', {
            method: 'POST',
            body: form
        })

        toast.add({
            title: 'Success',
            description: 'Login is success',
            color: 'success'
        })
        router.push(useLocalePath()('home'))
    } catch (e) {
        if (e.response?.status === 429) {
            const retryAfter = parseInt(e.response.headers.get('Retry-After') || '60')
            showThrottleCountdown(retryAfter)
        }

        toast.add({
            title: 'Error',
            description: String(e),
            color: 'error'
        })
    } finally {
        loading.value = false;
    }
}
function showThrottleCountdown(value) {
    throttleCountdown.value = value
    const interval = setInterval(() => {
        console.log(`Try again in ${throttleCountdown.value} seconds`)
        throttleCountdown.value--

        if (throttleCountdown.value <= 0) {
            clearInterval(interval)
            console.log('You can try again now!')
        }
    }, 1000)
}

</script>
<style>
::v-deep .ubutton {
    text-align: center;
}
</style>