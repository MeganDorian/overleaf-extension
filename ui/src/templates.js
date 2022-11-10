let default_topic = 'HW {num_hw}, {fio}'

let fullnames = [
    'Александр Мишунин',
    'Евгений Кравченко',
    'Виктор Крыштапович',
    'Самойлова Ольга Евгеньевна',
    'Гориховский Вячеслав Игоревич',
    'Цишевич Павел Дмитриевич',
]

let emails = [
    'alexander.mishunin@gmail.com',
    'zzzheka97+itmo-se-5-algo-2022@gmail.com',
    'kry127+itmo-se-5-algo-2022@yandex.ru',
    'geraolga91@gmail.com',
    'gorihovskyvyacheslav@gmail.com',
    'paveltsishevich@yandex.ru',
]

let subjects = ['Алгоритмы', 'Дискретная математика']
let topics = [
    default_topic,
    default_topic,
    default_topic,
    'ИТМО ДМ 2022 ДЗ-{num_hw} {fio}',
    'ИТМО. Магистратура. ДМ-2022. ДЗ-{num_hw}. {fio}',
    default_topic,
]

let all_data = {
    subjects: [
        {
            key: 'algo',
            name: subjects[0],
            msg_view: [],
        },
        {
            key: 'diskr',
            name: subjects[1],
            msg_view: [],
        },
    ],
}

let j = 3
for (let i = 0; i < 3; i++) {
    all_data.subjects[0].msg_view.push({
        surname: fullnames[i],
        email: emails[i],
        topic: topics[i],
    })
    all_data.subjects[1].msg_view.push({
        surname: fullnames[j],
        email: emails[j],
        topic: topics[j],
    })
    j++
}

export const c_all_data = all_data
