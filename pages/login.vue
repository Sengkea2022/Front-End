<template>
    <div class="flex justify-center items-center h-[50vh]">
        <UCard class="w-6/12 flex flex-col justify-center items-center py-5">
            <template #header>
                Login
            </template>
            <UForm>
                <UFormField label="Username">
                    <UInput v-model="form.name" />
                </UFormField>

                <UFormField label="Password">
                    <UInput v-model="form.password" />
                </UFormField>
            </UForm>
            <template #footer>
                <div class="text-center">
                    <UButton size="sm" class="w-48 justify-center" @click="submit">
                        {{ $t('login') }}
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
const form = reactive({
    name: '',
    password: ''
})
const { $api } = useNuxtApp()
async function submit() {
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
        toast.add({
            title: 'Error',
            description: String('Error ', e),
            color: 'error'
        })
    }
}
</script>
<style>
::v-deep .ubutton {
    text-align: center;
}
</style>