<template>
    <v-footer
    :absolute="true"
    fixed
    style="bottom: 0"
    app
  >
    <span>&copy; {{ new Date().getFullYear() }}</span>
  </v-footer>
</template>

<script>
export default {

}
</script>

<style>
  footer {
    background: #41B619 !important;
    color: #fff !important;
    font-size: 11px;
    font-weight: 600;
    display: flex;
    justify-content: center;
  }
</style>