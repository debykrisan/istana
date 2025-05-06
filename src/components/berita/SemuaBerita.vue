<template>
	<div class="container bg-white">
		<div class="pt-5 px-5 d-flex flex-column">
			<div class="col-12 mb-3 pt-2">
				<div class="input-group">
					<input class="form-control border-end-0 border rounded-pill" type="text" v-model="search" placeholder="Cari artikel"/>
					<div class="input-group-append">
						<span class="input-group-text bg-transparent border-0"><i class="fa fa-search"></i></span>
					</div>
				</div>
			</div>
		</div>
		<div class="px-5 d-flex flex-column gap-3" v-for="(item, index) in filteredBerita">
			<div v-if="item.berita.length > 0">
				<div class="d-flex justify-content-between align-items-center mt-5">
					<h3 class="fw-bold d-inline-flex align-items-center justify-content-center">{{ item.nama_istana }}</h3>
					<hr class="m-0" style="width: 530px;">
				</div>
				<BeritaSlider :beritaTerkait="item.berita" :namaIstana="item.nama_istana" />
			</div>
			<br>
		</div>
	</div>
</template>

<script setup>
import { onMounted, watch, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useLoading } from "vue-loading-overlay";
import api from "@/shared/services/api";
import BeritaSlider from "./BeritaSlider.vue"

const $loading = useLoading();
const $router = useRouter();
const listIstana = ref([]);
const idIstana = ref($router.currentRoute.value.params.idIstana);
const search = ref("");

const filteredBerita = computed(() => {
  if (!search.value) {
    return listIstana.value;
  } else {
    return listIstana.value.map((item) => {
      return {
        ...item,
        berita: item.berita.filter((berita) => {
          return berita.n_judul.toLowerCase().includes(search.value.toLowerCase());
        })
      };
    });
  }
});


const getAllBeritaIstana = async () => {
  const loader = $loading.show();
  let data;
  try {
    const istana = await api.get(
      `${import.meta.env.VITE_APP_RESTFUL_BASE_URL}/istana/get-all-istana`
    );
    data = istana.data.data;

	if (idIstana.value) {
		data = data.filter((item) => item.id == idIstana.value);
	}

    // Fetch berita for each element
    await Promise.all(
      data.map(async (element) => {
        const berita = await fetchBerita(element.id);
        element.berita = berita;
      })
    );
  } catch (error) {
    // Handle error
  } finally {
	listIstana.value = data;
    loader.hide();
    console.log(listIstana.value);
  }
};


const fetchBerita = async (idIstana) => {
	const loader = $loading.show();
	let data = [];
	try {
		const response = await api.post(
			`${import.meta.env.VITE_APP_RESTFUL_BASE_URL}/berita/getbyistana`,
			{
				idIstana: idIstana,
			}
		);
		data = response.data.data;
		data = data.filter((item) => item.id != berita.value.id);
		data = data.slice(0, 10);
	} catch (error) {
		
	}
	finally {
		loader.hide();
	}
	return data;
}

onMounted(() => {
	getAllBeritaIstana();
});
</script>
