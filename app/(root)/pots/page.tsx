"use client";
import { useState } from "react";
import Button from "@/components/ui/Button";
import AddEditModal from "@/components/modals/AddEditModal";

const Pots = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  return (
    <section className="grid gap-space-400">
      <div className="flex items-center justify-between">
        <h1>Pots</h1>
        <Button
          variant="primary"
          isALink={false}
          className="flex items-center gap-space-150"
          onClick={() => {
            setOpenAddModal(true);
          }}
        >
          + Add New Pot
        </Button>
        <AddEditModal
          open={openAddModal}
          onClose={() => setOpenAddModal(false)}
          category="Pot"
          variant="add"
          message="Create a pot to set savings targets. These can help keep you on track as you save for special purchases."
        />
      </div>
    </section>
  );
};

export default Pots;
