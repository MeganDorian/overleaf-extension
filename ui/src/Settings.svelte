<script context="module">
    import { Route, router } from 'tinro'

    import Menu from "./lib/Menu.svelte";

    router.mode.hash()
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
                ID предмета: {meta.params.id}
            </Route>
            <Route path="/login">Войти в аккаунт</Route>
            <Route path="/fio">Ввести имя</Route>
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
