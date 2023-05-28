import React from "react";
import { useParams } from "react-router-dom";
import EditDetail from "../../component/EditDetails/editDetail";

export default function EditDetails() {
  const { id } = useParams();

  return (
    <div>
      <EditDetail id={id} />
    </div>
  );
}
