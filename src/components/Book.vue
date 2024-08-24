<template>
  <div>
    <div v-if="loading" class="mt-10 text-center">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      <ul>
        <li
          v-for="item in data"
          :key="item.id"
          class="mt-10 animate-fade-up animate-duration-1000 animate-once animate-ease-linear"
        >
          <h1 class="text-lg font-bold text-black dark:text-white">
            <a :href="item.link" target="_blank" :title="item.link">
              {{ item.title }}
            </a>
          </h1>
          <p class="font-newsreader text-lg">
            <span class="italic">from: </span>
            <span class="">{{ item.author }}</span>
          </p>
          <p class="font-newsreader text-sm italic">
            {{ item.time }}
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
  title: string;
  author: string;
  time: string;
  link: string;
}

export default defineComponent({
  name: "Bookmark",
  setup() {
    const data = ref<DataItem[]>([]);
    const loading = ref(true);
    const error = ref<string | null>(null);

    onMounted(async () => {
      try {
        const { data: supabaseData, error: supabaseError } = await supabase
          .from("books")
          .select("id, title, author, time, link");

        if (supabaseError) throw supabaseError;

        data.value = supabaseData || [];
        data.value.sort((a, b) => b.time - a.time);
      } catch (err: any) {
        error.value = err.message;
      } finally {
        loading.value = false;
      }
    });

    return {
      data,
      loading,
      error,
    };
  },
});
</script>
