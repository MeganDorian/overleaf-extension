<script context="module">
    import { active } from 'tinro'

    import { subjectsStore } from 'src/lib/store/subjects'
</script>

<script>
    $: subjects = $subjectsStore?.subjects
</script>

<div class="sidebar mr-5">
    <aside class="menu">
        <p class="menu-label">Предметы</p>
        <ul class="menu-list">
            {#each (subjects || []) as { key, name } }
                <li><a href="/subject/{key}" use:active>{name}</a></li>
            {/each}
        </ul>
        <p class="menu-label">Пользователь</p>
        <ul class="menu-list">
            <li><a href="/login" use:active>Почта</a></li>
            <li><a href="/template" use:active>Шаблоны</a></li>
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
