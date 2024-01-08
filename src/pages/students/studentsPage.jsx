import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudents } from "./studentSlice";

export const StudentsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const studentsData = useSelector((state) => state.students);
  const { students } = studentsData;

  const status = useSelector((state) => state.students.status);
  const error = useSelector((state) => state.students.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchStudents());
    }
  }, [status, dispatch]);

  // console.log({ studentsData });
  return (
    <div>
      <h2>Students</h2>

      <div>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Grade</th>
              <th>Attendance</th>
              <th>Marks</th>
            </tr>
          </thead>
          <tbody>
            {students.map(
              ({ _id, name, age, gender, grade, attendance, marks }) => {
                return (
                  <tr
                    className="cursor"
                    key={_id}
                    onClick={() => navigate(`/students/${_id}`)}
                  >
                    <th>{name}</th>
                    <th>{age}</th>
                    <th>{gender}</th>
                    <th>{grade}th</th>
                    <th>{attendance}</th>
                    <th>{marks}</th>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>

      <h3
        className="link-hover-cursor"
        onClick={() => navigate(`/students/add`)}
      >
        Add student
      </h3>

      {/* End */}
    </div>
  );
};
