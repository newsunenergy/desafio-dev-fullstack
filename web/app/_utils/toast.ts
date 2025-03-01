import Swal, { SweetAlertOptions } from "sweetalert2";

export const toast = (options: SweetAlertOptions) => {
  return Swal.fire({
    toast: true,
    position: "top-right",
    iconColor: "white",
    icon: "success",
    customClass: {
      popup: "colored-toast text-white rounded-lg",
      title: "!font-bold !text-lg",
      htmlContainer: "!font-semibold !text-sm",
    },
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    ...options,
  });
};
