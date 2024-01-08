import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudents, setFilter, setSortBy } from "../students/studentSlice";

export const ClassView = () => {
  const students = useSelector((state) => state.students.students);
  const filter = useSelector((state) => state.students.filter);
  const sortBy = useSelector((state) => state.students.sortBy);
  const dispatch = useDispatch();

  // console.log({ students, filter, sortBy });

  const filteredStudents = students.filter((student) =>
    filter === "All" ? student : student.gender === filter
  );

  // console.log({ students, filteredStudents, filter });

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "marks") {
      return b.marks - a.marks;
    } else if (sortBy === "attendance") {
      return b.attendance - a.attendance;
    } else {
      return 0; // Makes no change
    }
  });

  // console.log({ sortedStudents });

  // Setting sort and filter

  const handleFilterChange = (value) => {
    // console.log({ value });
    dispatch(setFilter(value));
  };

  const handleSortChange = (value) => {
    // console.log({ value });
    dispatch(setSortBy(value));
  };

  // Retrieving details

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  return (
    <div>
      <h2>Class</h2>
      <h4>Filter options:</h4>
      <div className="flex-row gap-10px">
        <label htmlFor="filter">Gender:</label>
        <select
          id="filter"
          onChange={(e) => handleFilterChange(e.target.value)}
          value={filter}
        >
          <option value="All">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <div className="flex-row gap-10px">
        <label htmlFor="sortBy">Sort by:</label>
        <select
          id="sortBy"
          onChange={(e) => handleSortChange(e.target.value)}
          value={sortBy}
        >
          <option value="name">Name</option>
          <option value="marks">Marks</option>
          <option value="attendance">Attendance</option>
        </select>
      </div>

      <div className="margin-20px-0px">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Attendance</th>
              <th>Marks</th>
            </tr>
          </thead>
          <tbody>
            {sortedStudents.map(({ _id, name, gender, attendance, marks }) => {
              return (
                <tr
                  className="cursor"
                  key={_id}
                  onClick={() => navigate(`/students/${_id}`)}
                >
                  <th>{name}</th>
                  <th>{gender}</th>
                  <th>{attendance}</th>
                  <th>{marks}</th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* End */}
    </div>
  );
};
