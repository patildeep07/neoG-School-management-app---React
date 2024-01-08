import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTeacherAsync, updateTeacherAsync } from "./teacherSlice";

export const TeacherForm = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();

  const teacher = state ? state : null;

  const [newTeacher, setNewTeacher] = useState({
    name: teacher ? teacher.name : "",
    subject: teacher ? teacher.subject : "",
    contact: teacher ? teacher.contact : ""
  });

  const submitButtonHandler = () => {
    if (teacher) {
      dispatch(
        updateTeacherAsync({ id: teacher._id, updatedTeacher: newTeacher })
      );
    } else {
      // console.log({ newTeacher });
      dispatch(addTeacherAsync(newTeacher));
      setNewTeacher({
        name: teacher ? teacher.name : "",
        subject: teacher ? teacher.subject : "",
        contact: teacher ? teacher.contact : ""
      });
    }
  };

  return (
    <div>
      <h2>{teacher ? "Edit Teacher" : "Add Teacher"}</h2>

      <div className="flex-row gap-10px">
        <h4>Name:</h4>
        <input
          type="text"
          placeholder="Name"
          value={newTeacher.name}
          onChange={(e) =>
            setNewTeacher({
              ...newTeacher,
              name: e.target.value
            })
          }
        />
      </div>

      <div className="flex-row gap-10px">
        <h4>Subject:</h4>
        <input
          type="text"
          placeholder="Subject"
          value={newTeacher.subject}
          onChange={(e) =>
            setNewTeacher({
              ...newTeacher,
              subject: e.target.value
            })
          }
        />
      </div>

      <div className="flex-row gap-10px">
        <h4>Contact:</h4>
        <input
          type="number"
          placeholder="Contact"
          value={newTeacher.contact}
          onChange={(e) =>
            setNewTeacher({
              ...newTeacher,
              contact: e.target.value
            })
          }
        />
      </div>

      <button onClick={submitButtonHandler}>
        {teacher ? "Update details" : "Add teacher"}
      </button>

      {/* End */}
    </div>
  );
};
