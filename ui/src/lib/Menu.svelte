<script context="module">
    import { active } from 'tinro'
</script>

<script>
    let subjects = [
        {
            key: "algo",
            name: "Алгоритмы"
        },
        {
            key: "diskr",
            name: "Дискретная математика"
        },
        {
            key: "fp",
            name: "Функциональное программирование"
        },
        {
            key: "angl",
            name: "Английский язык"
        },
        {
            key: "unix",
            name: "Unix"
        },
        {
            key: "ml",
            name: "Машинное обучение"
        },
        {
            key: "db",
            name: "Базы данных"
        },
        {
            key: "cpp",
            name: "C++"
        },
    ]
</script>

<div class="sidebar">
    <aside class="menu">
        <p class="menu-label">Предметы</p>
        <ul class="menu-list">
            {#each subjects as { key, name } }
                <li><a href="/subject/{key}" use:active>{name}</a></li>
            {/each}
        </ul>
        <p class="menu-label">Пользователь</p>
        <ul class="menu-list">
            <li><a href="/login" use:active>Логин</a></li>
            <li><a href="/fio" use:active>ФИО</a></li>
        </ul>
    </aside>
</div>

<style>
    .sidebar {
        width: 190px;
    }

    .menu-list :global(a.active) {
        background-color: #4caf50;
        color: white;
    }
</style>
