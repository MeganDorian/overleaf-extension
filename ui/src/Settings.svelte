<script>
    import Menu from "./lib/Menu.svelte";
</script>

<div class="logo-container">
    <div class="logo"></div>
</div>

<div class="div-container">
    <h1 class="font">Настройки</h1>
    <Menu/>
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
