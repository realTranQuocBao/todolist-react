import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { FilterMatchMode, FilterService } from "primereact/api";
import { useEffect, useState } from "react";
import _, { set } from "lodash";
import { Badge } from "primereact/badge";

const todoDatas1 = [
  {
    id: 1641579701076,
    title: "Học bài",
    completedAt: null,
    editedAt: null,
    createdAt: "01:21:41 08/01/2022",
    priority: 3,
  },
  {
    id: 1641579797085,
    title: "Ăn cơm",
    completedAt: "01:23:47 08/01/2022",
    editedAt: null,
    createdAt: "01:23:17 08/01/2022",
    priority: "1",
  },
  {
    id: 1641579827420,
    title: "Ngủ một giấc",
    completedAt: null,
    editedAt: "01:24:40 08/01/2022",
    createdAt: "01:23:47 08/01/2022",
    priority: "2",
  },
];

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

function TodoList() {
  const todoDatas = (JSON.parse(localStorage.getItem('todolist-tit'))) || [];

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
    setTasks(_.clone(todoDatas));
  }, []);

  const handleStatusFilterChange = (e) => {
    const value = e.value;
    let _filters = _.clone(filters);
    _filters["completedAt"].value = value;
    setFilters(_filters);
    setStatusFilter(e.value);
  };

  const handleSeachSubmit = (event) => {
    event.preventDefault();
    //console.log("OK, submit", event);
  };
  const handleKeywordSearchChange = (event) => {
    const value = event.target.value;
    let _filters = _.clone(filters);
    _filters["title"].value = value;
    setFilters(_filters);
    setKeywordSearch(value);
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

  const lastEditedTemplate = (rowData) => {
    if (rowData.editedAt != null) {
      return (
        <Badge
          value={rowData.editedAt}
          severity="warning"
          className="p-mr-2 statusTemplate"
        />
      );
    } else {
      return (
        <Badge
          value={rowData.createdAt}
          severity="success"
          className="p-mr-2 statusTemplate"
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
            onClick={() => {}}
          />
        )}
        {rowData.completedAt !== null && (
          <Button
            title="Uncomplete"
            icon="pi pi-times"
            className="p-button-rounded p-button-default button-space"
            onClick={() => {}}
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
          onClick={() => {}}
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
  console.log(todoDatas);
  console.log("statusFilter:", statusFilter);

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
        <Column field="title" header="Task"></Column>
        <Column header="Priority" body={priorityBodyTemplate}></Column>
        <Column header="Status" body={statusBodyTemplate}></Column>
        <Column header="Last Edited" body={lastEditedTemplate}></Column>
        <Column
          body={actionBodyTemplate}
          headerStyle={{ width: "200px" }}
        ></Column>
      </DataTable>
    </div>
  );
}

export default TodoList;
