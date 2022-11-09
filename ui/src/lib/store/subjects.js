import { writable, get } from 'svelte/store'

const initial_store = {
	subjects: [
		{
			subject_name: 'algorithms',
			ru_name: 'Алгоритмы',
			msg_view: [
				{
					surname: 'Кравченко',
					email: 'kravchenko@gmail.com',
					topic: '[ИТМО] ДЗ {number}',
				},
			],
		},
		{
			subject_name: 'discrete-math',
			ru_name: 'Дисретная математика',
			msg_view: [
				{
					surname: 'Гориховский',
					email: 'gorihovsky@gmail.com',
					topic: 'ДЗ {number}. {fio}'
				}
			]
		}
	],
	msg_body: 'Здравствуйте! Отправляю дз',
}

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
		subjectsStore.set(initial_store)
	} else {
		subjectsStore.set(data)
	}
})
