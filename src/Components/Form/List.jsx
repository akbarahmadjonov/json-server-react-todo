import axios from "axios";
import { useEffect, useState } from "react";
import { useRef } from "react";
import "./Form.css";

const Form = () => {
  const [data, setData] = useState([]);

  let elInput = useRef();
  let elCheckbox = useRef();

  useEffect(() => {
    axios
      .get("http://localhost:8080/todos")
      .then((data) => {
        if (data.status === 200) {
          setData(data.data);
        }
      })
      .catch((err) => console.log(err));
  }, [data]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    axios
      .post("http://localhost:8080/todos", {
        title: elInput.current.value,
      })
      .then((data) => console.log(data));
  };

  const handleDelete = (id) => {
    // Delete by ID, from button edit
    axios
      .delete(`http://localhost:8080/todos/${id}`)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  const handleEdit = (id) => {
    const newPrompt = prompt(
      "You would like to change your todo in the following ID?",
      id
    );
    // If prompt value is false return false
    if (!newPrompt) {
      return false;
    }

    const edited = { title: newPrompt };
    axios
      .put(`http://localhost:8080/todos/${id}`, edited)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center align-items-center mt-5"></div>
      <div className="row flex-column">
        <form
          onSubmit={handleSubmit}
          className="col-12 col-lg-6 text-center mt-5 mx-auto rounded js-form m-0 p-0"
        >
          <div>
            <h1 className="display-3 fw-bold mb-3">Todo App</h1>
          </div>
          <div className="input-group w-100">
            <input
              ref={elInput}
              className="form-control js-input"
              type="text"
              placeholder="Enter any task"
              autoFocus={true}
            />
            <button className="btn btn-primary p-3">
              <i className="fas fa-plus-circle fs-3"></i>
            </button>
          </div>
          <span className="text-danger d-none js-error">
            Enter a text greater than 3 words
          </span>
        </form>
        {data.length ? (
          <ul className="w-50 mx-auto list-group col-12 col-lg-12 mt-5 list-group p-0 m-0">
            {data.map((todo) => (
              <li
                key={todo.id}
                className="list-group-item d-flex align-items-center p-2"
              >
                <strong>{todo.id}</strong>.{" "}
                <input
                  className="ms-2 me-2 form-check-input check"
                  type="checkbox"
                  name="checkbox"
                />
                <span
                  onClick={() => handleEdit(todo.id)}
                  className="ms-2 bg-light p-1 rounded span"
                >
                  {todo.title}
                </span>
                <button
                  onClick={() => handleEdit(todo.id)}
                  className="ms-auto me-2 btn btn-secondary"
                >
                  EDIT
                </button>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="btn btn-danger"
                >
                  DELETE
                </button>
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Form;
