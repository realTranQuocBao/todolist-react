import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { FilterMatchMode, FilterService } from "primereact/api";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { useEffect, useState, useRef } from "react";
import _ from "lodash";
import moment from "moment";
import { Badge } from "primereact/badge";
import TaskEditDialog from "./TaskEditDialog";

// const priorityValues = [
//     {
//         key: 1,
//         name: 'low'
//     },
//     {
//         key: 2,
//         name: 'medium'
//     },
//     {
//         key: 1,
//         name: 'high'
//     }
// ]

function TodoList({ props: { todoDatas, setTodoDatas } }) {
  const statusFilters = [
    { value: 0, text: "All status" },
    { value: 1, text: "Processing" },
    { value: 2, text: "Done" },
  ];

  const sortOptions = [
    { value: 1, option: "Priority - ASC" },
    { value: 2, option: "Priority - DES" },
    { value: 3, option: "Time Done - ASC" },
    { value: 4, option: "Time Done - DES" },
    { value: 5, option: "Time Edited - ASC" },
    { value: 6, option: "Time Edited - DES" },
  ];

  FilterService.register("statusFilterService", (completedAtTime, value) => {
    switch (value) {
      case 0: {
        return true;
      }
      case 1: {
        return completedAtTime === null;
      }
      case 2: {
        return completedAtTime !== null;
      }
      default: {
        return true;
      }
    }
  });

  const [filters, setFilters] = useState({
    title: {
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
    },
    completedAt: {
      value: null,
      matchMode: "statusFilterService",
    },
  });

  const [tasks, setTasks] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [keywordSearch, setKeywordSearch] = useState("");
  const [taskEditDialog, setTaskEditDialog] = useState(false);
  const [taskItem, setTaskItem] = useState({});
  const [sortOption, setSortOption] = useState();

  const toast = useRef(null);

  useEffect(() => {
    setTasks(todoDatas);
    // console.log("Chơi thì nhào dzô...");
  }, [todoDatas]);

  const handleStatusFilterChange = (e) => {
    const value = e.value;
    let _filters = _.clone(filters);
    _filters["completedAt"].value = value;
    setFilters(_filters);
    setStatusFilter(e.value);
  };

  const handleSeachSubmit = (event) => {
    event.preventDefault();
  };
  const handleKeywordSearchChange = (event) => {
    const value = event.target.value;
    let _filters = _.clone(filters);
    _filters["title"].value = value;
    setFilters(_filters);
    setKeywordSearch(value);
  };

  const handleComplete = (id) => {
    const index = _.findIndex(todoDatas, (data) => {
      return data.id === id;
    });
    const newTaskComplete = {
      ...todoDatas[index],
      completedAt: moment().format("HH:mm:ss DD/MM/YYYY"),
    };

    let _todoDatas = _.clone(todoDatas);
    _todoDatas[index] = newTaskComplete;
    setTodoDatas(_todoDatas);
    localStorage.setItem("todolist-tit", JSON.stringify(_todoDatas));
  };

  const handleUncomplete = (id) => {
    const index = _.findIndex(todoDatas, (data) => {
      return data.id === id;
    });
    const newTaskComplete = { ...todoDatas[index], completedAt: null };

    let _todoDatas = _.clone(todoDatas);
    _todoDatas[index] = newTaskComplete;
    setTodoDatas(_todoDatas);
    localStorage.setItem("todolist-tit", JSON.stringify(_todoDatas));
  };

  const handleEdit = (id) => {
    setTaskEditDialog(true);
    const index = _.findIndex(todoDatas, (data) => {
      return data.id === id;
    });
    setTaskItem(todoDatas[index]);
  };

  const hideEditDialog = () => {
    setTaskEditDialog(false);

    toast.current.show({
      severity: "info",
      summary: "Rejected",
      detail: "You have rejected to edit this task!",
      life: 3000,
    });
  };

  const saveTask = (newTaskItem) => {
    const index = _.findIndex(todoDatas, (data) => {
      return data.id === taskItem.id;
    });
    let _todoDatas = _.clone(todoDatas);
    _todoDatas[index] = newTaskItem;
    setTodoDatas(_todoDatas);
    localStorage.setItem("todolist-tit", JSON.stringify(_todoDatas));
    setTaskEditDialog(false);

    toast.current.show({
      severity: "info",
      summary: "Confirmed",
      detail: "You have edited this task!",
      life: 3000,
    });
  };

  const handleDelete = (id) => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => acceptDelete(id),
      reject: () => rejectDelete(),
    });
  };

  const acceptDelete = (id) => {
    const _todoDatas = _.remove(todoDatas, (data) => {
      return data.id !== id;
    });

    setTodoDatas(_todoDatas);
    localStorage.setItem("todolist-tit", JSON.stringify(_todoDatas));

    toast.current.show({
      severity: "info",
      summary: "Confirmed",
      detail: "You have deleted this task!",
      life: 3000,
    });
  };

  const rejectDelete = () => {
    toast.current.show({
      severity: "info",
      summary: "Rejected",
      detail: "You have rejected to delete this task",
      life: 3000,
    });
  };

  const handleSortOptionChange = (e) => {
    const optionSort = e.value;
    setSortOption(optionSort);
    let _tasks = _.clone(tasks);
    switch (optionSort) {
      case 1: {
        _tasks.sort((task1, task2) => {
          return task1.priority - task2.priority;
        });
        break;
      }
      case 2: {
        _tasks.sort((task1, task2) => {
          return task2.priority - task1.priority;
        });
        break;
      }
      case 3: {
        _tasks.sort((task1, task2) => {
          return (
            moment(
              task1.completedAt || "00:00:00 1/1/1970",
              "HH:mm:ss DD/MM/YYYY"
            ) -
            moment(
              task2.completedAt || "00:00:00 1/1/1970",
              "HH:mm:ss DD/MM/YYYY"
            )
          );
        });
        break;
      }
      case 4: {
        _tasks.sort((task1, task2) => {
          return (
            moment(
              task2.completedAt || "00:00:00 1/1/1970",
              "HH:mm:ss DD/MM/YYYY"
            ) -
            moment(
              task1.completedAt || "00:00:00 1/1/1970",
              "HH:mm:ss DD/MM/YYYY"
            )
          );
        });
        break;
      }
      case 5: {
        _tasks.sort((task1, task2) => {
          return (
            moment(task1.editedAt || task1.createdAt, "HH:mm:ss DD/MM/YYYY") -
            moment(task2.editedAt || task2.createdAt, "HH:mm:ss DD/MM/YYYY")
          );
        });
        break;
      }
      case 6: {
        _tasks.sort((task1, task2) => {
          return (
            moment(task2.editedAt || task2.createdAt, "HH:mm:ss DD/MM/YYYY") -
            moment(task1.editedAt || task1.createdAt, "HH:mm:ss DD/MM/YYYY")
          );
        });
        break;
      }
      default: {
        console.log("ERROR");
      }
    }

    setTasks(_tasks);
  };

  const header = (
    <div className="table-header">
      <h4>TodoList</h4>
      <div>
        <Dropdown
          value={statusFilter}
          options={statusFilters}
          onChange={handleStatusFilterChange}
          optionLabel="text"
          placeholder="Select a Status"
          className="dropdown-status"
        />
      </div>
      <div>
        <Dropdown
          value={sortOption}
          options={sortOptions}
          onChange={handleSortOptionChange}
          optionLabel="option"
          placeholder="Sort by..."
          className="dropdown-status"
        />
      </div>
      <div>
        <form onSubmit={handleSeachSubmit}>
          <div className="p-inputgroup">
            <InputText
              placeholder="Enter task keyword..."
              value={keywordSearch}
              onChange={handleKeywordSearchChange}
            />
            <Button icon="pi pi-search" className="p-button-primary" />
          </div>
        </form>
      </div>
    </div>
  );

  const lastEditedBodyTemplate = (rowData) => {
    if (rowData.editedAt != null) {
      return (
        <Badge
          value={rowData.editedAt}
          severity="warning"
          className="p-mr-2 lastEditedTemplate"
        />
      );
    } else {
      return (
        <Badge
          value={rowData.createdAt}
          severity="success"
          className="p-mr-2 lastEditedTemplate"
        />
      );
    }
  };

  const statusBodyTemplate = (rowData) => {
    if (rowData.completedAt) {
      return (
        <Badge
          value={rowData.completedAt}
          severity="success"
          className="p-mr-2 statusTemplate"
        />
      );
    } else {
      return (
        <Badge
          value="Processing"
          severity="danger"
          className="p-mr-2 statusTemplate"
        />
      );
    }
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <>
        {rowData.completedAt === null && (
          <Button
            title="Complete"
            icon="pi pi-check"
            className="p-button-rounded p-button-success button-space p-button-sm"
            onClick={() => {
              handleComplete(rowData.id);
            }}
          />
        )}
        {rowData.completedAt !== null && (
          <Button
            title="Uncomplete"
            icon="pi pi-times"
            className="p-button-rounded p-button-warning button-space p-button-sm"
            onClick={() => {
              handleUncomplete(rowData.id);
            }}
          />
        )}

        <Button
          title="Edit"
          icon="pi pi-pencil"
          className="p-button-rounded p-button-info button-space p-button-sm"
          disabled={!(rowData.completedAt === null)}
          onClick={() => {
            handleEdit(rowData.id);
          }}
        />
        <Button
          title="Delete"
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger button-space p-button-sm"
          onClick={() => {
            handleDelete(rowData.id);
          }}
        />
      </>
    );
  };
  const priorityBodyTemplate = (rowData) => {
    switch (rowData.priority.toString()) {
      case "1": {
        return (
          <Badge
            value="Low"
            severity="success"
            className="p-mr-2 priorityTemplate"
          />
        );
      }
      case "2": {
        return (
          <Badge
            value="Medium"
            severity="warning"
            className="p-mr-2 priorityTemplate"
          />
        );
      }
      case "3": {
        return (
          <Badge
            value="High"
            severity="danger"
            className="p-mr-2 priorityTemplate"
          />
        );
      }
      default: {
        console.log("ERROR");
      }
    }
  };
  // console.log("Re-render: TodoList");

  return (
    <div className="card m-3">
      <Toast ref={toast} />

      <DataTable
        value={tasks}
        paginator
        // className="p-datatable-customers"
        header={header}
        rows={5}
        // paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        rowsPerPageOptions={[2, 5, 10, 20, 50]}
        // dataKey="id"
        // rowHover
        selection={selectedTasks}
        onSelectionChange={(e) => setSelectedTasks(e.value)}
        filters={filters}
        // filter
        // filterDisplay="title"
        // loading={loading}
        // responsiveLayout="scroll"
        emptyMessage="No tasks found."
        // currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3em" }}
        ></Column>
        <Column
          field="title"
          style={{ width: "30rem", textAlign: "justify" }}
          header="Task"
        ></Column>
        <Column
          header="Priority"
          className="priorityTemplateColumn"
          body={priorityBodyTemplate}
        ></Column>
        <Column
          header="Status"
          className="statusTemplateColumn"
          body={statusBodyTemplate}
        ></Column>
        <Column
          header="Last Edited"
          className="lastEditedTemplateColumn"
          body={lastEditedBodyTemplate}
        ></Column>
        <Column
          body={actionBodyTemplate}
          headerStyle={{ width: "200px" }}
        ></Column>
      </DataTable>
      {taskEditDialog && (
        <TaskEditDialog
          dataEdit={taskItem}
          visible={taskEditDialog}
          onClose={hideEditDialog}
          onSave={saveTask}
        />
      )}
    </div>
  );
}

export default TodoList;
