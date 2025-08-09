<template>
    <div>
        <UCard>
            <div class="text-primary">
                here is home page.
                <UButton @click="onClick">click</UButton>
            </div>
        </UCard>

    </div>
</template >
<script setup>
definePageMeta({
    layout: 'auth',
    name: 'home'
});
const { $api } = useNuxtApp();
async function onClick(){
try{
    const user = await $api('/user');
}catch(e){
    // localStorage.removeItem('auth_token')\
    console.log(e);
    
}
}

</script>
