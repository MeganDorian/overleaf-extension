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
            {#if $subjectsStore}
                {#each subjects as { subject_name, ru_name } }
                    <li><a href="/subject/{subject_name}" use:active>{ru_name}</a></li>
                {/each}
            {/if}
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
