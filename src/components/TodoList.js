import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { FilterMatchMode, FilterService } from "primereact/api";
import { useContext, useEffect, useState } from "react";
import _, { set } from "lodash";
import moment from "moment";
import { Badge } from "primereact/badge";

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

function TodoList({props: {todoDatas, setTodoDatas}}) {

  const statusFilters = [
    { value: 0, text: "All status" },
    { value: 1, text: "Processing" },
    { value: 2, text: "Done" },
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

  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [keywordSearch, setKeywordSearch] = useState("");

  useEffect(() => {
    setTasks(todoDatas);
    console.log("Chơi thì nhào dzô...");
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
    })
    const newTaskComplete = {...todoDatas[index], completedAt: moment().format("HH:mm:ss DD/MM/YYYY")};

    let _todoDatas = _.clone(todoDatas);
    _todoDatas[index] = newTaskComplete;
    setTodoDatas(_todoDatas);
    localStorage.setItem('todolist-tit', JSON.stringify(_todoDatas));
  };

  const handleUncomplete = (id) => {
    const index = _.findIndex(todoDatas, (data) => {
      return data.id === id;
    })
    const newTaskComplete = {...todoDatas[index], completedAt: null};

    let _todoDatas = _.clone(todoDatas);
    _todoDatas[index] = newTaskComplete;
    setTodoDatas(_todoDatas);
    localStorage.setItem('todolist-tit', JSON.stringify(_todoDatas));
  };

  const handleDelete = (id) => {
    const _todoDatas = _.remove(todoDatas, (data) => {
      return data.id !== id;
    })
    
    setTodoDatas(_todoDatas);
    localStorage.setItem('todolist-tit', JSON.stringify(_todoDatas));
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
  const statusFilterTemplate = () => {
    return <span className="p-badge-success">Okla</span>;
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <>
        {rowData.completedAt === null && (
          <Button
            title="Complete"
            icon="pi pi-check"
            className="p-button-rounded p-button-default button-space"
            onClick={() => {handleComplete(rowData.id);}}
          />
        )}
        {rowData.completedAt !== null && (
          <Button
            title="Uncomplete"
            icon="pi pi-times"
            className="p-button-rounded p-button-default button-space"
            onClick={() => {handleUncomplete(rowData.id);}}
          />
        )}

        <Button
          title="Edit"
          icon="pi pi-pencil"
          className="p-button-rounded p-button-default button-space"
          onClick={() => {}}
        />
        <Button
          title="Delete"
          icon="pi pi-trash"
          className="p-button-rounded p-button-default button-space"
          onClick={() => {handleDelete(rowData.id);}}
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
    }
  };
  console.log("Re-render: TodoList");

  return (
    <div className="card m-3">
      <DataTable
        value={tasks}
        // paginator
        // className="p-datatable-customers"
        header={header}
        // rows={10}
        // paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        // rowsPerPageOptions={[10, 25, 50]}
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
        <Column field="title" style={{ width: "30rem", textAlign: "justify" }} header="Task"></Column>
        <Column header="Priority" className="priorityTemplateColumn" body={priorityBodyTemplate}></Column>
        <Column header="Status" className="statusTemplateColumn" body={statusBodyTemplate}></Column>
        <Column header="Last Edited" className="lastEditedTemplateColumn" body={lastEditedBodyTemplate}></Column>
        <Column
          body={actionBodyTemplate}
          headerStyle={{ width: "200px" }}
        ></Column>
      </DataTable>
    </div>
  );
}

export default TodoList;
