export default function({ store, redirect, route, axios, req }) {
  if (
    !["/usuario/login", "/usuario/logout", "/usuario/acceso"].includes(
      route.path
    ) &&
    route.path.startsWith("/usuario") &&
    !store.getters.isAuthenticated
  ) {
    redirect("/usuario/login");
  }
}
