<script context="module">
    import { active } from 'tinro'

    import { subjectsStore } from 'src/lib/store/subjects'
    import Button from 'src/lib/components/Button.svelte'
</script>

<script>

    $: subjects = $subjectsStore?.subjects

    function saveAllPages() {
        let login = saveEmail();
        localStorage.removeItem('login');
        localStorage.setItem('login', JSON.stringify(login));
    }
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
        <Button content="Сохранить" on:click={saveAllPages} class="mt-2" />
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
