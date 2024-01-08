import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudentAsync } from "./studentSlice";

export const StudentDetails = () => {
  const { studentId } = useParams();
  const dispatch = useDispatch();
  const student = useSelector((state) =>
    state.students.students.find((student) => student._id === studentId)
  );

  if (!student) {
    return <div>Student not found.</div>;
  }

  // console.log({ student });

  const handleDelete = (id) => {
    dispatch(deleteStudentAsync(id));
  };

  return (
    <div>
      <h2>Student details</h2>
      <p>Name: {student.name}</p>
      <p>Age: {student.age}</p>
      <p>Grade: {student.grade}</p>
      <p>Attendance: {student.attendance}</p>
      <p>Marks: {student.marks}</p>
      <div>
        <Link to={`/students/edit/${student._id}`} state={student}>
          Edit Details
        </Link>
      </div>

      <button onClick={() => handleDelete(student._id)}>Delete</button>
    </div>
  );
};
