# Overleaf-extension (Посылатор)
Расширение для автоматической отправки домашнего задания с сайта [Overleaf](https://www.overleaf.com/) преподавателю.

Все мы знаем, что отправка сгенерированного файла преподавателю осуществляется через отдельный почтовый клиент 
и связана с рутинными операциями - выбор получателя, вставка файла, редактирование текста письма и темы. 
Наше расширение для браузера позволяет автоматизировать этот процесс: настрой один раз, 
пользуйся до конца семестра!

## Минимальные требования
Maven 3.2+, jdk 8 (17) (для запуска сервера), npm 18+, yarn 1.22+

## Запуск расширения
Перед тем, как начать полноценно пользоваться расширением, необходимо загрузить его в Ваш браузер.

Пример добавления расширения в браузер Chrome:

1. Открыть Настройки;
2. Выбрать пункт `Расширения`;
3. В открывшейся вкладке необходимо включить режим разработчика (правый верхний угол);
4. Нажать на кнопку `Загрузить распакованное расширение`;
5. Выбрать папку, в которой лежит расширение

_**ВАЖНО: при загрузке необходимо выбрать папку, в корне которой лежит файл `manifest.json`, а не подпапки.**_

После этого расширение появится среди всех установленных расширений.

1. Для корректной работы расширения необходимо открыть настройки, выбрать пункт меню "Почта".
2. Далее необходимо ввести фамилию и имя, логин и пароль приложения (не от аккаунта почты), который можно получить по следующим инструкциям: 
* для [Google](https://support.google.com/accounts/answer/185833?hl=ru)
* для [Яндекса](https://yandex.ru/support/id/authorization/app-passwords.html)
3. Для отправки писем нужно запустить нативный сервер, выполнив две следующие команды в папке `java_email_sender`:
    ```
    mvn clean package
    ```
    
    ```
   java -jar .\target\java_email_sender-1.jar
   ```
4. Для сборки расширения понадобится npm и yarn. Npm скачивается о фициального сайта Node.js, yarn можно установить следующей командой:
    ```
    npm install --global yarn
    ```
    Далее в папке с проектом где лежит package.json запустить установку, которая подтянет все пакеты используемые для сборки:
    ```
    yarn install
    ```
    Собираем проект.
    ```
    yarn build
    ```
    Теперь расширение собрано, можно добавлять в браузер.
5. Затем достаточно открыть сайт Overleaf для удобной и приятной эксплуатации!

_**ВАЖНО: Расширение не работает на других сайтах (о чем сообщит сообщение-предупреждение при открытии расширения).**_

Чтобы отправить письмо, достаточно нажать на иконку расширения, после чего достаточно только выбрать преподавателя.

После этого подтянется добавленная в настройках информация:
1. Почта преподавателя;
2. Тема письма;
3. Номер дз (необходимо выбрать перед отправкой).

Все что останется бедному и уставшему студенту, так это нажать на кнопку `Послать` и спокойно пойти спать!


## Детали реализации
* Нативный сервер написан на Java
* Расширение написано на Svelte
* Работает в Chrome и Firefox

## Баги и проблемы:
1. В настройках не реализовано редактирование информации о преподавателе.
2. Нет предпросмотра файла перед его отправкой.
