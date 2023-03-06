import Swal from "../../node_modules/sweetalert2/src/sweetalert2.js";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
});

export function alertSuccess(alert) {
  return Toast.fire({
    icon: "success",
    title: alert,
  });
}

export function alertFail(alert) {
  return Toast.fire({
    icon: "error",
    title: alert,
  });
}

export function warningDelete() {
  return Swal.fire({
    title: "Bạn đồng ý xóa chứ?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Đồng ý",
    cancelButtonText: "Đóng!",
  });
}
