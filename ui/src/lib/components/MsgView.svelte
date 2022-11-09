<script>
    import {c_all_data} from "src/templates" 
    export let subject_id;
    let id = 0;
</script>

<div class="block">

    {#if subject_id === 'algo'}   
        id = 0
    {:else if subject_id === "diskr"}
        id = 1
    {/if}
    
    {#each c_all_data.subjects[id].msg_view as item}
        <h4 class="title is-4">
            {item.surname}        
            <button class="delete"></button>
        </h4>
        <label class="label">Email</label>
        <p class="notification">
            {item.email}
        </p>
        <!-- <div class="control">
          <input class="input" type="email" value={item.email} disabled>
        </div> -->
        
        <label class="label">Тема</label>
        <p class="notification">
            {item.topic}
        </p>
        <!-- <div class="control">
          <input class="input" type="email" value={item.topic} disabled>
        </div> -->

        <label class="label">Текст сообщения</label>
        <p class="notification">
            {c_all_data.msg_body}
        </p>

    {/each}


</div>

