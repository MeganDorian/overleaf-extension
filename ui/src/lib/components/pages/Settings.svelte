<script context="module">
  import { Route, router } from 'tinro'

  import AddSubject from 'src/lib/components/settings/AddSubject.svelte'
  import Login from 'src/lib/components/settings/Login.svelte'
  import Menu from 'src/lib/components/settings/Menu.svelte'
  import MsgView from 'src/lib/components/settings/MsgView.svelte'
  import Template from 'src/lib/components/settings/Template.svelte'
  import UserData from 'src/lib/components/settings/UserData.svelte'

  import { settingsStore } from 'src/lib/store/settings'

  router.mode.hash()
</script>

<script>
  // let authorized = false
  // get subject from store
  // $: redirect_path = !authorized ? "/login" : "/subject/cpp"
</script>

<div class="logo-container">
  <div class="logo" />
</div>

<div class="div-container">
  <h1 class="font">Настройки</h1>
  <div class="is-flex">
    <div>
      <Menu />
    </div>
    <div>
      <Route path="/subject/:id" let:meta>
        <MsgView subject_id={meta.params.id} />
      </Route>
      <Route path="/login">
        <Login
          bind:email={$settingsStore.user_email}
          bind:password={$settingsStore.password}
          bind:smtpService={$settingsStore.smtpService} />
      </Route>
      <Route path="/add"><AddSubject /></Route>
      <Route path="/template"><Template /></Route>
      <Route path="/user_data"><UserData /></Route>
    </div>
  </div>
</div>

<style>
  .logo-container {
    height: 43px;
    width: 120px;
    position: absolute;
    top: 40px;
    left: 150px;
  }

  .logo {
    background-image: url('assets/full_logo.svg');
    background-size: contain;
    background-position: left center;
    background-repeat: no-repeat;
  }
</style>
