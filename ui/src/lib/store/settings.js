import { writable } from 'svelte/store'

const initial = {
    msg_body: "Здравствуйте! \n\nОтправляю домашнюю работу №{num_hw}. \n\nС уважением,",
    user_email: '',
    password: '',
    fio: '',
    smtpService: '',
    num_hw: 1,
}

const storage = localStorage

export default function localStore(name, initial = {}) {
    const toString = (value) => JSON.stringify(value, null, 2)
    const toObject = JSON.parse

    if (storage.getItem(name) === null) {
        storage.setItem(name, toString(initial))
    }

    const saved = toObject(storage.getItem(name))

    const { subscribe, update } = writable(saved)

    return {
        subscribe,
        set: (key, value) =>
            update((data) => {
                data[key] = value
                storage.setItem(name, toString(data))
                return data
            }),
        delete: (key) =>
            update((data) => {
                delete data[key]
                storage.setItem(name, toString(data))
                return data
            }),
        save: () =>
            update((data) => {
                storage.setItem(name, toString(data))
                return data
            }),
    }
}

export const settingsStore = localStore('settings', initial)
