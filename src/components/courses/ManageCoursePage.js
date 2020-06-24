import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/CourseAcions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import { bindActionCreators } from "redux";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

function ManageCoursePage({
  courses,
  authors,
  loadCourses,
  loadAuthors,
  saveCourse,
  history,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    courses.length === 0
      ? loadCourses().catch((error) => {
          alert("loading courses failed" + error);
        })
      : setCourse({ ...props.course });

    authors.length === 0
      ? loadAuthors().catch((error) => {
          alert("loading authors failed" + error);
        })
      : "";
  }, [props.course]);
  function handleChange(event) {
    const { name, value } = event.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value,
    }));
  }
  function formIsValid() {
    const { title, authorId, category } = course;
    const errors = {};
    if (!title) errors.title = "Title is required";
    if (!authorId) errors.authorId = "Author is required";
    if (!category) errors.category = "category is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }
  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveCourse(course)
      .then(() => {
        toast.success("saved successfully");
        history.push("/courses");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }
  return authors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
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
  history: PropTypes.object.isRequired,
};
export function getCOurseBySlug(courses, slug) {
  return courses.find((course) => course.slug === slug) || null;
}
function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCOurseBySlug(state.courses, slug)
      : newCourse;
  return {
    course,
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
