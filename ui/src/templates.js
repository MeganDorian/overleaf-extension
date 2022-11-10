import format from "string-template"


// function add_new_prof(profs) {
//     let new_fullname = 'New prof'
//     let new_name = 'somename'
//     let new_email = 'asd@mail.com'
//     let new_theme = 'HW'
//     let greeting = 'Hey prof!'
//     profs[new_name] = {'fullname': new_fullname, 
//                       'toAdress': new_email, 
//                       'subject':new_theme, 
//                       'text': greeting};
//     return profs;
// }

function returned_info(profs) {
    let selected_prof = 'samoilova'
    let num_hw = 5
    let surname = 'Ivanov'
    let name = 'Ivan Ivanovich'
    profs[selected_prof]['theme'] = format(profs[selected_prof]['theme'], {name: name, surname: surname, num_hw: num_hw})
    profs[selected_prof]['text'] = format(profs[selected_prof]['text'], {name: name, surname: surname, num_hw: num_hw})
    return {'fullname': profs[selected_prof]['fullname'], 
            'subject' : profs[selected_prof]['subject'],
            'toAddress': profs[selected_prof]['toAddress'], 
            'theme': profs[selected_prof]['text'],
            'text': text}
}

function update_num_hw(all_data) {

}
let user_surname = 'Prelov'
let user_name = 'Man'


let default_theme = 'HW {num_hw}, {surname}'
let names = ['mishunin', 'kravchenko', 'krystapovich', 'samoilova', 'gorihovsky', 'tsischevich'];

let fullnames = ['Александр Мишунин', 'Евгений Кравченко', 'Виктор Крыштапович', 'Самойлова Ольга Евгеньевна', 'Гориховский Вячеслав Игоревич', 'Цишевич Павел Дмитриевич'];

let emails = ['alexander.mishunin@gmail.com', 'zzzheka97+itmo-se-5-algo-2022@gmail.com', 'kry127+itmo-se-5-algo-2022@yandex.ru',
    'geraolga91@gmail.com', 'gorihovskyvyacheslav@gmail.com', 'paveltsishevich@yandex.ru'];

let subjects = ['Алгоритмы', 'Дискретная математика']
let themes = [default_theme, default_theme, default_theme, 
    'ИТМО ДМ 2022 ДЗ-{num_hw} {surname} {name}', 
    'ИТМО. Магистратура. ДМ-2022. ДЗ-{num_hw}. {surname}', default_theme]

themes = themes.map((x) => format(x, {surname: user_surname,
                                      name: user_name, 
                                      num_hw:"{num_hw}"})
                    )

let text = 'Здравствуйте! Отправляю ДЗ {num_hw}';

let all_data = {'subjects': 
                        [{'subject_name': 'algo', 'ru_name': subjects[0], 'msg_view': []},
                         {'subject_name': 'diskr', 'ru_name': subjects[1], 'msg_view': []}
                        ], 
                'msg_body': 'Здравствуйте! Отправляю ДЗ {num_hw}'
               }
let j = 3
for (let i = 0; i < 3; i++) {
    all_data.subjects[0].msg_view.push({'key':names[i], 'surname': fullnames[i], 'email': emails[i], 'topic': themes[i]})
    all_data.subjects[1].msg_view.push({'key':names[j],'surname': fullnames[j], 'email': emails[j], 'topic': themes[j]})
    j++;
}

// import { subjectsStore } from 'src/lib/store/subjects.js'
// console.log(subjectsStore.msg_body)

// console.log(all_data.subjects[1])
// console.log(all_data.subjects[0])

export const c_all_data = all_data
let d = [];
for (let i = 0; i < c_all_data.subjects.length; i++) {
    for (let j = 0; j < c_all_data.subjects[i].msg_view.length; j++)
    d.push(c_all_data.subjects[i].msg_view[j])
  }
console.log(d)
