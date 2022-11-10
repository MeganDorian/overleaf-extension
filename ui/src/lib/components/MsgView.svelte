<script context="module">
    import { subjectsStore } from 'src/lib/store/subjects'
</script>

<script>
    export let subject_id

    $: subject_views = $subjectsStore?.subjects.filter((s) => s.key === subject_id)[0]?.msg_view
</script>

<div class="block">
    {#each (subject_views || []) as item}
        <h4 class="title is-4">
            {item.surname}
            <button class="delete"></button>
        </h4>
        <span class="label">Email</span>
        <p class="notification">
            {item.email}
        </p>

        <span class="label">Тема</span>
        <p class="notification">
            {item.topic}
        </p>

<!--        <span class="label">Текст сообщения</span>-->
<!--        <p class="notification">-->
<!--            {$subjectsStore.msg_body}-->
<!--        </p>-->
    {/each}
</div>
