import { createStore } from "redux";
import rootReducer from "./reducers";
import { initialState } from "./reducers/initialState";
import * as courseActions from "./actions/CourseAcions";

it("should handle creating courses", () => {
  // arrange
  const store = createStore(rootReducer, initialState);
  const course = {
    title: "new Course",
  };
  // act
  const action = courseActions.createCourseSuccess(course);
  store.dispatch(action);

  // asset
  const createdCourse = store.getState().courses[0];
  expect(createdCourse).toEqual(course);
});
