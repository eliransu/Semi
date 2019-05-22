import Swal from "sweetalert2";

export default class AlertUtils {
  static successAlert(title, content = "", showConfirmButton = true) {
    Swal.fire({
      title: title,
      content: content,
      type: "success",
      showConfirmButton
    });
  }

  static infoAlert(title, content = "") {
    Swal.fire(title, content, "info");
  }

  static failureAlert(title, content = "") {
    Swal.fire({ type: "error", title: title, text: content });
  }
}
