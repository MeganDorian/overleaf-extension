import { nanoid } from 'nanoid'

import { writable } from 'svelte/store'

import { c_all_data } from 'src/templates'

const storage = chrome.storage.local
const storage_key = 'subjects'

function subjectsStoreInitializer() {
    const { subscribe, update } = writable()

    return {
        subscribe,
        set: (value) =>
            update((data) => {
                data = value
                storage.set({ [storage_key]: data })
                return data
            }),
        add_subject: (subject_name, msg_view) => {
            update((data) => {
                // check if key exists
                let existing_ind = data.subjects.findIndex(
                    (s) => s.name === subject_name
                )
                if (existing_ind !== -1) {
                    data.subjects[existing_ind].msg_view.push(msg_view)
                } else {
                    data.subjects.push({
                        key: nanoid(10),
                        name: subject_name,
                        msg_view: [msg_view],
                    })
                }

                storage.set({ [storage_key]: data })
                return data
            })
        },
        delete_subject: (subject_key, msg_view_ind) => {
            update((data) => {
                let subject_ind = data.subjects.findIndex((s) => s.key === subject_key)
                data.subjects[subject_ind].msg_view.splice(msg_view_ind, 1)

                if (data.subjects[subject_ind].msg_view.length === 0) {
                    data.subjects.splice(subject_ind, 1)
                }

                storage.set({ [storage_key]: data })
                return data
            })
        },
        clear: () =>
            update((data) => {
                data = undefined
                storage.remove(storage_key)
            }),
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
