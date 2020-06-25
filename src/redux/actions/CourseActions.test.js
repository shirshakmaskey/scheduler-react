import * as CourseAcions from "./CourseAcions";
import * as types from "./actionTypes";
import { courses } from "../../../tools/mockData";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import configureMockStock from "redux-mock-store";

// testing an asynchronous function
const middleware = [thunk];
const mockStore = configureMockStock(middleware);

describe("async Actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });
  describe("load courses thunk", () => {
    it("should create BEGIN_API_CALL and LOAD_COURSE_SUCCESS when loading courses", () => {
      fetchMock.mock("*", {
        body: courses,
        headers: { "content-type": "application/json" },
      });
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        { type: types.LOAD_COURSES_SUCCESS, courses },
      ];
      const store = mockStore({ courses: [] });
      return store.dispatch(CourseAcions.loadCourses()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});

describe("createCourseSucess", () => {
  it("should create a CREATE_COURSE_SUCCESS action", () => {
    const course = courses[0];
    const expectedAction = {
      type: types.CREATE_COURSE_SUCCESS,
      course,
    };

    const action = CourseAcions.createCourseSuccess(course);
    expect(action).toEqual(expectedAction);
  });
});
