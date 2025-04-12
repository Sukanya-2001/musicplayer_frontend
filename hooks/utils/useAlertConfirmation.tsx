import Swal from "sweetalert2";

// Define Confirmation options
interface ConfirmationOptions {
  title?: string;
  text?: string;
  icon?: SweetAlertIcon;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonColor?: string;
}

// Define Confirmation result
interface ConfirmationResult {
  isConfirmed: boolean;
  isCanceled: boolean;
}

type SweetAlertIcon = "success" | "error" | "warning" | "info" | "question";

const useAlertConfirmation = () => {
  const confirmAction = async (
    options: ConfirmationOptions
  ): Promise<ConfirmationResult> => {
    const {
      title = "Are you sure?",
      text = "This action cannot be undone.",
      confirmButtonText = "Yes, proceed",
      cancelButtonText = "No, cancel",
      confirmButtonColor = "#3b3531",
      icon = "warning"
    } = options;

    const result = await Swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText,
      confirmButtonColor,
      cancelButtonColor: "#a11313ef",
      color: "white",
      background: "#1e1e1e"
    });

    return {
      isConfirmed: result.isConfirmed,
      isCanceled: result.isDismissed
    };
  };

  return { confirmAction };
};

export default useAlertConfirmation;
