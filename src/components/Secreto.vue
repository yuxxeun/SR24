<template>
  <div>
    <form v-if="!error" @submit.prevent="addComment" class="mx-auto">
      <textarea
        v-model="newComment"
        autofocus
        placeholder="Type your secrets..."
        class="text-md w-full rounded-lg bg-zinc-200/60 p-4 font-newsreader italic text-zinc-900 shadow-sm focus:outline-none dark:bg-zinc-900 dark:text-zinc-100"
      >
      </textarea>
      <button
        type="submit"
        class="mt-2 w-full rounded-lg bg-zinc-200/60 px-4 py-2 text-center text-sm font-bold text-zinc-900"
      >
        Submit ->
      </button>
    </form>
    <div v-if="loading" class="mt-10 text-center">Loading...</div>
    <div v-else-if="error">
      <div v-html="error"></div>
      <div class="mx-auto mt-7 text-center">
        <button
          @click="refreshPage"
          class="mt-2 w-auto rounded-lg bg-zinc-200/60 px-4 py-2 text-center text-sm font-bold text-zinc-900"
        >
          Back ->
        </button>
      </div>
    </div>
    
    <div v-else>
      <ul>
        <li
          class="mt-10 animate-fade-up animate-duration-1000 animate-once animate-ease-linear"
          v-for="item in data"
          :key="item.id"
        >
          <h1 class="mb-1 text-lg font-bold text-black dark:text-white">
            {{ item.txt }}
          </h1>
          <p class="font-geistMonoVariable text-sm tracking-tight">
            {{
              new Date(item.created_at).toLocaleString("en-US", {
                timeZone: "Asia/Jakarta",
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: true,
                timeZoneName: "short",
              })
            }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { supabase } from "../utils/supabase";

interface DataItem {
  id: number;
  created_at: string;
  txt: string;
}

export default defineComponent({
  name: "Bookmark",
  setup() {
    const data = ref<DataItem[]>([]);
    const loading = ref(true);
    const error = ref<string | null>(null);
    const newComment = ref("");
    const submitting = ref(false);

    onMounted(async () => {
      try {
        const { data: supabaseData, error: supabaseError } = await supabase
          .from("comments")
          .select("id, created_at, txt");

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
                            <img src="/ghost.gif" class="mx-auto w-48 h-48 mb-10">
                            <p class="font-bold text-2xl">Whooosh!</p> 
                            <p class="text-lg">Comment must be at least 5 characters.</p>
                          </div>`;
        return;
      }

      try {
        submitting.value = true;
        const { data: insertedData, error: supabaseError } = await supabase
          .from("comments")
          .insert({ txt: newComment.value });

        if (supabaseError) throw supabaseError;

        if (insertedData && insertedData.length > 0) {
          data.value.unshift(insertedData[0]);
        }
        newComment.value = "";
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
