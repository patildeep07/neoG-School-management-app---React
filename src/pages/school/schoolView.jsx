import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudents } from "../students/studentSlice";
import { setSchoolDetails, setTopStudent } from "./schoolSlice";

export const SchoolView = () => {
  const dispatch = useDispatch();

  const schoolDetails = useSelector((state) => state.school);
  const students = useSelector((state) => state.students.students);

  // console.log({ schoolDetails });

  // Retrieving info

  const totalStudents = students.length;

  const totalAttendance = students.reduce(
    (acc, student) =>
      student.attendance ? acc + parseFloat(student.attendance) : acc + 0,
    0
  );

  const averageAttendance = totalAttendance / totalStudents;

  const totalMarks = students.reduce(
    (acc, student) =>
      student.marks ? acc + parseFloat(student.marks) : acc + 0,
    0
  );

  const averageMarks = totalMarks / totalStudents;

  const topStudent = students.reduce(
    (acc, curr) =>
      parseFloat(curr.marks) > parseFloat(acc.marks) ? curr : acc,
    { name: "-", marks: 0 }
  );

  // console.log({ topStudent });

  // Setting school details

  useEffect(() => {
    dispatch(
      setSchoolDetails({
        totalStudents,
        averageAttendance,
        averageMarks,
        topStudent
      })
    );

    dispatch(setTopStudent(topStudent));
  }, [dispatch, students]);

  // Retrieving details

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  return (
    <div>
      <h2>School</h2>
      <p>Total Students: {schoolDetails.totalStudents}</p>
      <p>Average Attendance: {schoolDetails.averageAttendance.toFixed(2)}</p>
      <p>Average Marks: {schoolDetails.averageMarks.toFixed(2)}</p>
      <p>
        Top Student:{" "}
        {schoolDetails.topStudent ? schoolDetails.topStudent.name : "-"}
      </p>
    </div>
  );
};
