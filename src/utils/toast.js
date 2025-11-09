import Swal from 'sweetalert2';
export const toast = (icon, title) => {
  Swal.fire({ toast: true, icon, title, position: 'top-end', showConfirmButton: false, timer: 2000, timerProgressBar: true });
};
export const confirm = async (title = 'Are you sure?') => {
  const res = await Swal.fire({ title, icon: 'warning', showCancelButton: true, confirmButtonText: 'Yes', cancelButtonText: 'Cancel' });
  return res.isConfirmed;
};
