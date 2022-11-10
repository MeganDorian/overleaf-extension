<script context="module">
    import { Route, router } from 'tinro'

    import Menu from "src/lib/components/Menu.svelte"
    import Login from "src/lib/components/Login.svelte"
    import MsgView from "src/lib/components/MsgView.svelte"
    import Template from "src/lib/components/Template.svelte";

    import { settingsStore } from 'src/lib/store/settings'

    router.mode.hash();
</script>

<script>
    // let authorized = false
    // get subject from store
    // $: redirect_path = !authorized ? "/login" : "/subject/cpp"
import AddSubject from "src/lib/components/AddSubject.svelte";
</script>

<div class="logo-container">
    <div class="logo"></div>
</div>

<div class="div-container">
    <h1 class="font">Настройки</h1>
    <div class="is-flex">
        <div>
            <Menu/>
        </div>
        <div>
            <Route path="/subject/:id" let:meta>
                <MsgView subject_id={meta.params.id}></MsgView>
            </Route>
            <Route path="/login">
                <Login
                    bind:email={$settingsStore.user_email}
                    bind:password={$settingsStore.password}
                    bind:smtpService={$settingsStore.smtpService} />
            </Route>
            <Route path="/add"><AddSubject/></Route>
            <Route path="/template"><Template/></Route>
        </div>
    </div>
</div>

<style>
    .logo-container {
        height: 43px;
        width: 120px;
        position: absolute;
        top: 40px;
        left: 150px
    }

    .logo {
        background-image: url("assets/full_logo.svg");
        background-size: contain;
        background-position: left center;
        background-repeat: no-repeat;
    }
</style>
