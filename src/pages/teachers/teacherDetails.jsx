import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteTeacherAsync } from "./teacherSlice";

export const TeacherDetails = () => {
  const { teacherId } = useParams();
  const dispatch = useDispatch();
  const teacher = useSelector((state) =>
    state.teachers.teachers.find((teacher) => teacher._id === teacherId)
  );

  // console.log({ teacher });

  if (!teacher) {
    return <div>Teacher not found.</div>;
  }

  const handleDelete = (id) => {
    dispatch(deleteTeacherAsync(id));
  };

  return (
    <div>
      <h2>Teacher details</h2>
      <p>Name: {teacher.name}</p>
      <p>Subject: {teacher.subject}</p>
      <p>Contact: {teacher.contact}</p>

      <div>
        <Link to={`/teachers/edit/${teacher._id}`} state={teacher}>
          Edit Details
        </Link>
      </div>

      <button onClick={() => handleDelete(teacher._id)}>Delete</button>
    </div>
  );
};
