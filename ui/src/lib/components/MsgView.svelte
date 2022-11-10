<script context="module">
  import { subjectsStore } from 'src/lib/store/subjects'
</script>

<script>
  import MsgViewItem from 'src/lib/components/MsgViewItem.svelte'

  export let subject_id

  $: subject_views = $subjectsStore?.subjects.filter(
    (s) => s.key === subject_id
  )[0]?.msg_view
</script>

<div class="block">
  {#each subject_views || [] as item}
    <div class="block">
      <h4 class="title is-4">
        {item.surname}
        <button class="delete" />
      </h4>
      <MsgViewItem label="Email" value={item.email} />

      <MsgViewItem label="Тема" value={item.topic} />
    </div>
  {/each}
</div>
