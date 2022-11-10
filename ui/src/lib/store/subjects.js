import { writable, get } from 'svelte/store'

import { c_all_data } from 'src/templates'

const storage = chrome.storage
const storage_key = "subjects"

function subjectsStoreInitializer() {
	const { subscribe, update } = writable()

	return {
		subscribe,
		set: (value) =>
			update((data) => {
				data = value
				storage.local.set({ [storage_key]: value })
				return data
			}),
		clear: () =>
			update((data) => {
				data = undefined
				storage.local.remove(storage_key)
			})
	}
}

export const subjectsStore = subjectsStoreInitializer()

storage.local.get(storage_key, (result) => {
	let data = result[storage_key]
	if (data === undefined) {
		subjectsStore.set(c_all_data)
	} else {
		subjectsStore.set(data)
	}
})
