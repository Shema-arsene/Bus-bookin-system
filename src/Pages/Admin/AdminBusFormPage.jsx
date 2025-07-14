import { useParams } from "react-router-dom"
import AgencyForm from "./AgencyForm"

const AdminBusFormPage = () => {
  const { id } = useParams()
  const isEdit = Boolean(id)

  return (
    // <div className="p-6">
    //   {isEdit ? "Edit Bus Information" : "Create New Bus"}
    // </div>

    <AgencyForm />
  )
}
export default AdminBusFormPage
