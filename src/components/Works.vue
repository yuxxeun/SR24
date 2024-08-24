<template>
  <div>
    <div v-if="loading" class="mt-10 text-center">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      <ul>
        <li
          v-for="item in data"
          :key="item.id"
          class="mt-10 animate-fade-up rounded-xl bg-gradient-to-b from-gray-500 via-gray-900 to-black p-4 animate-duration-1000 animate-once animate-ease-linear"
        >
          <h1
            class="text-xl font-bold text-black dark:text-white lg:justify-center"
          >
            {{ item.title }}
          </h1>
          <p class="mt-3 font-newsreader text-lg italic">
            {{ item.description }}
          </p>
          <div class="mt-5 flex items-center space-x-2">
            <div class="flex items-center">
              <p
                class="flex items-center justify-between rounded-full border-2 border-zinc-500 bg-zinc-700/20 px-2 text-base text-sm font-semibold text-zinc-400 hover:border-zinc-300 hover:text-zinc-300"
              >
                {{ item.tipe }}
              </p>
            </div>
            <div v-if="item.status == 'Finished'" class="flex items-center">
              <a
                :href="item.link"
                target="_blank"
                class="flex items-center justify-between rounded-full border-2 border-zinc-500 bg-zinc-700/20 px-2 hover:border-zinc-300"
              >
                <p
                  class="text-base text-sm font-semibold text-zinc-400 hover:text-zinc-300"
                >
                  Demo
                </p>
              </a>
            </div>
            <div class="flex items-center">
              <div
                class="flex items-center justify-between rounded-full border-2 border-green-500 bg-green-700/20 px-2 hover:border-green-300"
              >
                <p
                  class="text-base text-sm font-semibold text-green-400 hover:text-green-300"
                >
                  {{ item.status }}
                </p>
                <div
                  class="ml-2 h-1.5 w-1.5 animate-pulse rounded-full bg-green-500 hover:bg-green-300 lg:h-2 lg:w-2"
                ></div>
              </div>
            </div>
          </div>
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
  description: string;
  tipe: string;
  status: string;
  link: string;
  created_at?: string; // Tambahkan jika Anda perlu mengurutkan berdasarkan created_at
}

export default defineComponent({
  name: "Project",
  setup() {
    const data = ref<DataItem[]>([]);
    const loading = ref(true);
    const error = ref<string | null>(null);

    onMounted(async () => {
      try {
        const { data: supabaseData, error: supabaseError } = await supabase
          .from("project")
          .select("id, title, description, tipe, status, link, created_at"); // Pastikan untuk memilih 'created_at'

        if (supabaseError) throw supabaseError;

        data.value = supabaseData || [];
        data.value.sort(
          (a, b) =>
            new Date(b.created_at!).getTime() -
            new Date(a.created_at!).getTime(),
        ); // Pastikan Anda memeriksa jika created_at tersedia
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
