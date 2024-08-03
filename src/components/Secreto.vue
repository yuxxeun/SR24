<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">
      <div v-html="error"></div>
      <div class="text-center mx-auto mt-7">
        <button @click="refreshPage" class="mt-2 text-center font-bold w-auto px-4 py-2 bg-zinc-200/60 text-sm text-zinc-900 rounded-lg">
          Back ->
        </button>
      </div>
    </div>
    <div v-else>
      <form @submit.prevent="addComment" class="mx-auto">
        <textarea
          v-model="newComment"
          autofocus
          placeholder="Just say helloo or drop your story here!"
          class="w-full italic font-newsreader rounded-lg bg-zinc-200/60 p-4 text-md text-zinc-900 shadow-sm focus:outline-none dark:bg-zinc-900 dark:text-zinc-100"
        ></textarea>
          <button
            type="submit"
            class="mt-2 font-bold text-center w-full px-4 py-2 bg-zinc-200/60 text-sm text-zinc-900 rounded-lg">
            Submit ->
          </button>
      </form>
      <ul>
        <li class="mt-10" v-for="item in data" :key="item.id">
          <p>
            <span class="text-black dark:text-white text-lg font-bold">
              {{ item.txt }}
            </span>
            <br />
            <span class="text-sm font-newsreader">
              <span class="font-geistMonoVariable">
                 {{ new Date(item.created_at).toLocaleString('en-US', { timeZone: 'Asia/Jakarta', day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true, timeZoneName: 'short' }) }}
              </span>
            </span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { supabase } from '../utils/supabase';

  interface DataItem {
    id: number;
    created_at: string;
    txt: string;
  }

  export default defineComponent({
    name: 'Bookmark',
    setup() {
      const data = ref<DataItem[]>([]);
      const loading = ref(true);
      const error = ref<string | null>(null);
      const newComment = ref('');
      const submitting = ref(false); 

      onMounted(async () => {
        try {
          const { data: supabaseData, error: supabaseError } = await supabase
            .from('comments')
            .select('id, created_at, txt');

          if (supabaseError) throw supabaseError;

          if (supabaseData) {
            data.value = supabaseData;
            data.value.sort((a, b) => b.id - a.id);
          }
        } catch (err: any) {
          error.value = err.message;
        } finally {
          loading.value = false;
        }
      });

      const addComment = async () => {
        if (newComment.value.trim().length < 5) {
          error.value = `<div class="text-center">
                            <img src="/1479.gif" class="mx-auto w-48 h-48 mb-10">
                            <p class="font-bold text-2xl">Whooosh!</p> 
                            <p class="text-lg">Comment must be at least 5 characters.</p>
                          </div>`
          return;
        }

        try {
          submitting.value = true; 
          const { data: insertedData, error: supabaseError } = await supabase
            .from('comments')
            .insert({ txt: newComment.value });

          if (supabaseError) throw supabaseError;

          if (insertedData && insertedData.length > 0) {
            data.value.unshift(insertedData[0]);
          }
          newComment.value = '';
          error.value = null; 
          window.location.reload();  
        } catch (err: any) {
          error.value = err.message;
        } finally {
          submitting.value = false;  
        }
      };

      const refreshPage = () => {
        window.location.reload();
      };

      return {
        data,
        loading,
        error,
        newComment,
        addComment,
        submitting,
        refreshPage,
      };
    },
  });
</script>

