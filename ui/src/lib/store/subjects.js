import { writable } from 'svelte/store'

import { c_all_data } from 'src/templates'

const storage = chrome.storage.local
const storage_key = "subjects"

function subjectsStoreInitializer() {
	const { subscribe, update } = writable()

	return {
		subscribe,
		set: (value) =>
			update((data) => {
				data = value
				storage.set({ [storage_key]: value })
				return data
			}),
		clear: () =>
			update((data) => {
				data = undefined
				storage.remove(storage_key)
			})
	}
}

export const subjectsStore = subjectsStoreInitializer()

storage.get(storage_key, (result) => {
	let data = result[storage_key]
	if (data === undefined) {
		console.log('dump initial config:', c_all_data)
		subjectsStore.set(c_all_data)
	} else {
		subjectsStore.set(data)
	}
})
