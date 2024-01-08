import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeachers } from "./teacherSlice";

export const TeachersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const teachersData = useSelector((state) => state.teachers);

  const { teachers, status, error } = teachersData;

  // console.log({ teachers });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTeachers());
    }
  }, [status, dispatch]);

  return (
    <div>
      <h2>Teachers</h2>

      {error && <h4>Error: {error}</h4>}

      <div>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Subject</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map(({ _id, name, subject, contact }) => {
              return (
                <tr
                  className="cursor"
                  key={_id}
                  onClick={() => navigate(`/teachers/${_id}`)}
                >
                  <th>{name}</th>
                  <th>{subject}</th>
                  <th>{contact}</th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h3
        className="link-hover-cursor"
        onClick={() => navigate(`/teachers/add`)}
      >
        Add Teacher
      </h3>

      {/* End */}
    </div>
  );
};
