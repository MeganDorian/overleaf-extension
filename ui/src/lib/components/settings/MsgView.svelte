<script context="module">
  import MsgViewItem from 'src/lib/components/settings/MsgViewItem.svelte'

  import { subjectsStore } from 'src/lib/store/subjects'
</script>

<script>
  export let subject_id

  $: subject_views = $subjectsStore?.subjects.filter(
    (s) => s.key === subject_id
  )[0]?.msg_view

  function delete_subject(index) {
    if (confirm('Удалить предмет?')) {
      subjectsStore.delete_subject(subject_id, index)
    }
  }
</script>

<div class="block">
  {#each subject_views || [] as item, index}
    <div class="block">
      <h4 class="title is-4 is-flex is-justify-content-space-between">
        {item.surname}
        <button class="delete mt-1" on:click={() => delete_subject(index)} />
      </h4>

      <MsgViewItem label="Email" value={item.email} />
      <MsgViewItem label="Тема" value={item.topic} />
    </div>
  {/each}
</div>
