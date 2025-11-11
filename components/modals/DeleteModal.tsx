import { Modal, Box } from "@mui/material";
import IconCloseModal from "@/assets/icons/icon-close-modal.svg";

interface DeleteModalProps {
  category: string;
  open: boolean;
  onClose: () => void;
}

export default function DeleteModal({
  category,
  open,
  onClose,
}: DeleteModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid gap-space-250 max-w-[335px] px-space-250 py-space-300 custom-shadow-modal bg-fill-two rounded-default md:max-w-[560px] md:p-space-400">
        <div className="flex items-center justify-between">
          <h1
            id="modal-title"
            /* nadpisanie domyślnych stylów dla h1, które są zdefiniowane w typography */
            className="!text-preset-2 !tracking-preset-2 !leading-preset-2 md:!text-preset-1 md:!tracking-preset-1 md:!leading-preset-1"
          >
            Delete ‘{category}’?
          </h1>
          <button onClick={onClose}>
            <IconCloseModal />
          </button>
        </div>

        <p
          id="modal-description"
          className="text-preset-4 tracking-preset-4 leading-preset-4 font-preset-4 text-color-three"
        >
          Are you sure you want to delete this budget? This action cannot be
          reversed, and all the data inside it will be removed forever.
        </p>
        <ul className="grid gap-space-250 text-center text-preset-4 tracking-preset-4 leading-preset-4 font-preset-4-bold">
          <li>
            <button className="w-full p-space-200 bg-fill-four text-color-two rounded-alt">
              Yes, Confirm Deletion
            </button>
          </li>
          <li className="font-preset-4 text-color-three">
            <button onClick={onClose}>No, Go Back</button>
          </li>
        </ul>
      </Box>
    </Modal>
  );
}
