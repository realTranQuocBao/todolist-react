import { CForm, CButton, CFormInput, CFormSelect } from "@coreui/react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import styled from "styled-components";
import _ from "lodash";
import { Card } from "primereact/card";

function TodoForm() {
  //   const [taskInput, setTaskInput] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const Note = styled.p`
    color: red;
  `;
  console.log("Re-render: TodoForm");
  const onSubmit = (e) => {
    console.log(e);
    const newTask = {
      id: Date.now(),
      title: e.taskInput,
      completedAt: null,
      editedAt: null,
      createdAt: moment().format("HH:mm:ss DD/MM/YYYY"),
      priority: e.priorityValue,
    };
    console.log(newTask);
  };

  return (
    <div className="d-flex justify-content-center">
      <CForm onSubmit={handleSubmit(onSubmit)} style={{ "width": 500, "maxWidth":500 }}>
        <div className="m-3">
          <CFormInput
            {...register("taskInput", {
              required: "Please enter a task to do.",
              minLength: { value: 4, message: "Minimum length for task is 4." },
            })}
            placeholder="Enter a task..."
          />
          <Note>{errors.taskInput?.message}</Note>
        </div>

        <div className="m-3">
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

        <CButton type="submit" className="mb-3">
          Add task
        </CButton>
      </CForm>
    </div>
  );
}

export default TodoForm;
