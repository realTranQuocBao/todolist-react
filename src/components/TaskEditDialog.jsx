import { CForm, CFormInput, CFormSelect } from "@coreui/react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import _ from "lodash";
import moment from "moment";
import styled from "styled-components";

function TaskEditDialog(props) {
  const { dataEdit, visible, onClose, onSave } = props;
  const [isDataChanged, setIsDataChanged] = useState(false);
  useEffect(() => {
    loadDataInit();
  }, []);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const updateForm = (data) => {
    setValue("taskInput", data.title);
    setValue("priorityValue", data.priority);
  };

  const loadDataInit = () => {
    if (dataEdit) {
      updateForm(dataEdit);
    } else {
      hideTaskEditDialog();
    }
  };

  const Note = styled.p`
    color: red;
    margin: 3px auto;
  `;

  const saveNewTask = (data) => {
    dataEdit.title = "con khỉ"
    let _newTask = _.clone(dataEdit);
    _newTask.title = data.taskInput;
    _newTask.priority = data.priorityValue;
    _newTask.editedAt = moment().format("HH:mm:ss DD/MM/YYYY");
    onSave(_newTask);
  };

  const hideTaskEditDialog = () => {
    onClose();
  };

  const handleChangeTitle = (e) => {
        if(e.target.value===dataEdit.title){
            setIsDataChanged(false);
        } else {
            setIsDataChanged(true);
        }
  }

  const handleChangePriority = (e) => {
    if(e.target.value===dataEdit.priority){
        setIsDataChanged(false);
    } else {
        setIsDataChanged(true);
    }
}


  const renderDialogFooter = () => {
    return (
      <div>
        <Button
          label="Save"
          icon="pi pi-check"
          onClick={handleSubmit(saveNewTask)}
          autoFocus
          disabled={!isDataChanged}
        />
        <Button
          label="Cancel"
          icon="pi pi-times"
          onClick={() => {
            hideTaskEditDialog();
          }}
          className="p-button-text"
        />
      </div>
    );
  };

  return (
    <>
      <Dialog
        header="Header"
        visible={visible}
        modal={false}
        style={{ width: "50vw" }}
        onHide={hideTaskEditDialog}
        breakpoints={{ "960px": "75vw" }}
        footer={renderDialogFooter}
      >
        <div className="d-flex justify-content-center">
          <CForm
            onSubmit={handleSubmit(saveNewTask)}
            className="todoFormSubmit d-flex align-content-between flex-column"
          >
            <div className="m-1 todoForm">
              <CFormInput
                {...register("taskInput", {
                  required: "Please enter a task to do.",
                  minLength: {
                    value: 4,
                    message: "Minimum length for task is 4.",
                  },
                })}
                onChange={handleChangeTitle}
                placeholder="Enter a task..."
              />
              <Note>{errors.taskInput?.message}</Note>
            </div>

            <div className="m-1 todoForm">
              <CFormSelect
                {...register("priorityValue", {
                  required: "Please choose priority.",
                })}
                onChange={handleChangePriority}
              >
                <option value="" disabled>Choose priority</option>
                <option value="1">Low</option>
                <option value="2">Medium</option>
                <option value="3">High</option>
              </CFormSelect>
              <Note>{errors.priorityValue?.message}</Note>
            </div>
          </CForm>
        </div>
      </Dialog>
    </>
  );
}

export default TaskEditDialog;
