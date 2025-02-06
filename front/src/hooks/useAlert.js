import Swal from "sweetalert2";

const useAlert = () => {
  const showAlert = (title, text, icon = "info") => {
    return Swal.fire({ title, text, icon, confirmButtonText: "Aceptar" });
  };

  return { showAlert };
};

export default useAlert