import { CForm, CButton, CFormInput, CFormSelect } from "@coreui/react";
import { useForm } from "react-hook-form";
import moment from "moment";
import styled from "styled-components";
import _ from "lodash";

function TodoForm({props: {todoDatas, setTodoDatas}}) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const Note = styled.p`
    color: red;
    margin: 3px auto;
  `;
  // console.log("Re-render: TodoForm");
  const onSubmit = (e) => {
    const newTask = {
      id: Date.now(),
      title: e.taskInput,
      completedAt: null,
      editedAt: null,
      createdAt: moment().format("HH:mm:ss DD/MM/YYYY"),
      priority: e.priorityValue,
    };
    setValue('taskInput', '');
    setValue('priorityValue', '');

    // const todoDatas = JSON.parse(localStorage.getItem('todolist-tit')) || [];
    const _todoDatas = _.concat(newTask, todoDatas);
    setTodoDatas(_todoDatas);
    localStorage.setItem('todolist-tit', JSON.stringify(_todoDatas));
  };

  return (
    <div className="d-flex justify-content-center">
      <CForm onSubmit={handleSubmit(onSubmit)} className="todoFormSubmit d-flex align-content-between flex-column">
        <div className="m-1 todoForm">
          <CFormInput
            {...register("taskInput", {
              required: "Please enter a task to do.",
              minLength: { value: 4, message: "Minimum length for task is 4." },
            })}
            placeholder="Enter a task..."
          />
          <Note>{errors.taskInput?.message}</Note>
        </div>

        <div className="m-1 todoForm">
          <CFormSelect
            {...register("priorityValue", {
              required: "Please choose priority.",
            })}
          >
            <option value="">Choose priority</option>
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
          </CFormSelect>
          <Note>{errors.priorityValue?.message}</Note>
        </div>

        <CButton type="submit" className="m-1">
          Add task
        </CButton>
      </CForm>
    </div>
  );
}

export default TodoForm;
