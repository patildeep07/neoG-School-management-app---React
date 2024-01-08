import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addStudentAsync, updateStudentAsync } from "./studentSlice";

export const StudentForm = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();

  const student = state ? state : null;

  const [newStudent, setNewStudent] = useState({
    name: student ? student.name : "",
    age: student ? student.age : "",
    grade: student ? student.grade : "",
    attendance: student ? student.attendance : "",
    marks: student ? student.marks : "",
    gender: student ? student.gender : "Male"
  });

  const submitButtonHandler = () => {
    if (student) {
      dispatch(
        updateStudentAsync({ id: student._id, updatedStudent: newStudent })
      );
    } else {
      dispatch(addStudentAsync(newStudent));
      setNewStudent({
        name: student ? student.name : "",
        age: student ? student.age : "",
        grade: student ? student.grade : "",
        attendance: student ? student.attendance : "",
        marks: student ? student.marks : "",
        gender: student ? student.gender : "Male"
      });
    }
  };

  const error = useSelector((state) => state.students.error);
  // console.log({ error });

  return (
    <div>
      <h2>{student ? "Edit Student" : "Add Student"}</h2>

      <div className="flex-row gap-10px">
        <h4>Name:</h4>
        <input
          type="text"
          placeholder="Name"
          value={newStudent.name}
          onChange={(e) =>
            setNewStudent({
              ...newStudent,
              name: e.target.value
            })
          }
        />
      </div>

      <div className="flex-row gap-10px">
        <h4>Age:</h4>
        <input
          type="number"
          placeholder="Age"
          value={newStudent.age}
          onChange={(e) =>
            setNewStudent({
              ...newStudent,
              age: Number(e.target.value)
            })
          }
        />
      </div>

      <div className="flex-row gap-10px">
        <h4>Grade:</h4>
        <input
          type="number"
          placeholder="Grade"
          value={newStudent.grade}
          onChange={(e) =>
            setNewStudent({
              ...newStudent,
              grade: Number(e.target.value)
            })
          }
        />
      </div>

      <div>
        <label>
          <h4>Gender:</h4>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={newStudent.gender === "Male"}
            onChange={() =>
              setNewStudent({
                ...newStudent,
                gender: "Male"
              })
            }
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={newStudent.gender === "Female"}
            onChange={() =>
              setNewStudent({
                ...newStudent,
                gender: "Female"
              })
            }
          />{" "}
          Female
        </label>
      </div>

      {student && (
        <div>
          <div className="flex-row gap-10px">
            <h4>Attendance:</h4>
            <input
              type="number"
              placeholder="Attendance"
              value={newStudent.attendance}
              onChange={(e) =>
                setNewStudent({
                  ...newStudent,
                  attendance: Number(e.target.value)
                })
              }
            />
          </div>

          <div className="flex-row gap-10px">
            <h4>Marks:</h4>
            <input
              type="number"
              placeholder="Marks"
              value={newStudent.marks}
              onChange={(e) =>
                setNewStudent({
                  ...newStudent,
                  marks: Number(e.target.value)
                })
              }
            />
          </div>
        </div>
      )}

      <button onClick={submitButtonHandler}>
        {student ? "Update details" : "Add student"}
      </button>

      {/* End */}
    </div>
  );
};
