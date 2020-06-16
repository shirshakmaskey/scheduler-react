import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/CourseAcions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import { bindActionCreators } from "redux";

function ManageCoursePage({
  courses,
  authors,
  loadCourses,
  loadAuthors,
  saveCourse,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors] = useState({});
  useEffect(() => {
    courses.length === 0
      ? loadCourses().catch((error) => {
          alert("loading courses failed" + error);
        })
      : "";
    console.error("wtf");
    console.log(loadCourses());

    authors.length === 0
      ? loadAuthors().catch((error) => {
          alert("loading authors failed" + error);
        })
      : "";
  }, []);
  function handleChange(event) {
    const { name, value } = event.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value,
    }));
  }
  function handleSave(event) {
    event.preventDefault();

    saveCourse(course);
  }
  return (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
    />
  );
}
ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
};
function mapStateToProps(state) {
  return {
    course: newCourse,
    courses: state.courses,
    authors: state.authors,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    loadCourses: bindActionCreators(loadCourses, dispatch),
    loadAuthors: bindActionCreators(loadAuthors, dispatch),
    saveCourse: bindActionCreators(saveCourse, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
