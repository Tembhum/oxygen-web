import React, { useState, useEffect } from "react";
import {
  SortingState,
  EditingState,
  PagingState,
  SummaryState,
  IntegratedPaging,
  IntegratedSorting,
  IntegratedSummary,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
  PagingPanel,
  DragDropProvider,
  TableColumnReordering,
  TableFixedColumns,
  TableSummaryRow,
} from "@devexpress/dx-react-grid-material-ui";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TableCell from "@material-ui/core/TableCell";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import { withStyles } from "@material-ui/core/styles";

import { ProgressBarCell } from "../components/progress-bar-cell";
import { HighlightedCell } from "../components/highlighted-cell";
import { CurrencyTypeProvider } from "../components/currency-type-provider";
import { PercentTypeProvider } from "../components/percent-type-provider";

import {
  generateRows,
  globalSalesValues2,
  valueName,
  valueTel,
  valueRole,
} from "../demo-data/generator";
import axios from "axios";

const styles = (theme) => ({
  lookupEditCell: {
    padding: theme.spacing(1),
  },
  dialog: {
    width: "calc(100% - 16px)",
  },
  inputRoot: {
    width: "100%",
  },
  selectMenu: {
    position: "absolute !important",
  },
});

const AddButton = ({ onExecute }) => (
  <div style={{ textAlign: "center" }}>
    <Button color="primary" onClick={onExecute} title="Create new row">
      New
    </Button>
  </div>
);

const EditButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Edit row">
    <EditIcon />
  </IconButton>
);

const DeleteButton = ({ onExecute }) => (
  <IconButton
    onClick={() => {
      // eslint-disable-next-line
      if (window.confirm("Are you sure you want to delete this row?")) {
        onExecute();
      }
    }}
    title="Delete row"
  >
    <DeleteIcon />
  </IconButton>
);

const CommitButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Save changes">
    <SaveIcon />
  </IconButton>
);

const CancelButton = ({ onExecute }) => (
  <IconButton color="secondary" onClick={onExecute} title="Cancel changes">
    <CancelIcon />
  </IconButton>
);

const commandComponents = {
  add: AddButton,
  edit: EditButton,
  delete: DeleteButton,
  commit: CommitButton,
  cancel: CancelButton,
};

const Command = ({ id, onExecute }) => {
  const CommandButton = commandComponents[id];
  return <CommandButton onExecute={onExecute} />;
};

const availableValues = {
  name1: globalSalesValues2.name1,
  region: globalSalesValues2.region,
  role: globalSalesValues2.role,
};

// const availableValues = {
//   name1: valueName(),
//   tel: valueTel(),
//   role: valueRole(),
// };

const LookupEditCellBase = ({
  availableColumnValues,
  value,
  onValueChange,
  classes,
}) => (
  <TableCell className={classes.lookupEditCell}>
    <Select
      value={value}
      onChange={(event) => onValueChange(event.target.value)}
      MenuProps={{
        className: classes.selectMenu,
      }}
      input={<Input classes={{ root: classes.inputRoot }} />}
    >
      {availableColumnValues.map((item) => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </Select>
  </TableCell>
);
export const LookupEditCell = withStyles(styles, {
  name: "ControlledModeDemo",
})(LookupEditCellBase);

const Cell = (props) => {
  const { column } = props;
  if (column.name === "name") {
    return <ProgressBarCell {...props} />;
  }
  if (column.name === "amount") {
    return <HighlightedCell {...props} />;
  }
  return <Table.Cell {...props} />;
};

const EditCell = (props) => {
  const { column } = props;
  const availableColumnValues = availableValues[column.name];
  if (availableColumnValues) {
    return (
      <LookupEditCell
        {...props}
        availableColumnValues={availableColumnValues}
      />
    );
  }
  return <TableEditRow.Cell {...props} />;
};

const getRowId = (row) => row.id;

// export default () => {
class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      columns: [
        { name: "name1", title: "ชื่อ-นามสกุล" },
        // { name: 'region', title: 'Region' },
        // { name: 'amount', title: 'Sale Amount' },
        // { name: 'name', title: 'ชื่อ-นามสกุล' },
        { name: "tel", title: "เบอร์ติดต่อ" },
        { name: "role", title: "ตำแหน่ง" },
      ],
      rows: generateRows({
        columnValues: { id: ({ index }) => index, ...globalSalesValues2 },
        length: 12,
      }),
      tableColumnExtensions: [
        { columnName: "name1", width: 200 },
        { columnName: "region", width: 180 },
        { columnName: "amount", width: 180, align: "right" },
        { columnName: "name", width: 180 },
        { columnName: "tel", width: 180 },
        { columnName: "role", width: 200 },
      ],
      sorting: [],
      editingRowIds: [],
      addedRows: [],
      rowChanges: {},
      currentPage: 0,
      pageSize: 0,
      pageSizes: [5, 10, 0],
      columnOrder: ["name1", "region", "amount", "name", "tel", "role"],
      currencyColumns: ["amount"],
      percentColumns: ["name"],
      leftFixedColumns: [TableEditColumn.COLUMN_TYPE],
      totalSummaryItems: [
        { columnName: "name", type: "avg" },
        { columnName: "amount", type: "sum" },
      ],
    };
  }

  // const [users, updateUsers] = React.useState([]);

  // React.useEffect(function effectFunction() {
  //   async function fetchBooks() {
  //     const response = await axios.get("http://localhost:8080/users");
  //     const json = await response.data.content;
  //     updateUsers(json);
  //   }
  //   fetchBooks().then(console.log(users));
  // }, []);

  // let a = axios.get("http://localhost:8080/users").then((res) => {
  //   a = res.data.content;
  // });
  // const [users, setUsers] = await useState(a);
  // const [users, setUsers] = useState([]);

  // const [columns] = useState([
  //   { name: "name1", title: "ชื่อ-นามสกุล" },
  //   // { name: 'region', title: 'Region' },
  //   // { name: 'amount', title: 'Sale Amount' },
  //   // { name: 'name', title: 'ชื่อ-นามสกุล' },
  //   { name: "tel", title: "เบอร์ติดต่อ" },
  //   { name: "role", title: "ตำแหน่ง" },
  // ]);
  // const [rows, setRows] = useState(
  //   generateRows({
  //     columnValues: { id: ({ index }) => index, ...globalSalesValues },
  //     length: 12,
  //   })
  // );
  // const [tableColumnExtensions] = useState([
  //   { columnName: "name1", width: 200 },
  //   { columnName: "region", width: 180 },
  //   { columnName: "amount", width: 180, align: "right" },
  //   { columnName: "name", width: 180 },
  //   { columnName: "tel", width: 180 },
  //   { columnName: "role", width: 200 },
  // ]);
  // const [sorting, getSorting] = useState([]);
  // const [editingRowIds, getEditingRowIds] = useState([]);
  // const [addedRows, setAddedRows] = useState([]);
  // const [rowChanges, setRowChanges] = useState({});
  // const [currentPage, setCurrentPage] = useState(0);
  // const [pageSize, setPageSize] = useState(0);
  // const [pageSizes] =    useState([5, 10, 0]);
  // const [columnOrder, setColumnOrder] = useState([
  //   "name1",
  //   "region",
  //   "amount",
  //   "name",
  //   "tel",
  //   "role",
  // ]);
  // const [currencyColumns] = useState(["amount"]);
  // const [percentColumns] = useState(["name"]);

  // const [leftFixedColumns] = useState([TableEditColumn.COLUMN_TYPE]);
  // const [totalSummaryItems] = useState([
  //   { columnName: "name", type: "avg" },
  //   { columnName: "amount", type: "sum" },
  // ]);

  // this.setState({
  //   addedRows:
  // })

  // setCurrentPage = () => {
  //   this.setState({
  //     currentPage:
  //   })
  // };

  changeAddedRows = (value) =>
    this.setState({
      addedRows: value.map((row) =>
        Object.keys(row).length
          ? row
          : {
              amount: 0,
              name: 0,
              // tel: new Date().toISOString().split('T')[0],
              tel: 0,
              name1: availableValues.name1[0],
              region: availableValues.region[0],
              role: availableValues.role[0],
            }
      ),
    });

  // setAddedRows(
  //   value.map((row) =>
  //     Object.keys(row).length
  //       ? row
  //       : {
  //           amount: 0,
  //           name: 0,
  //           // tel: new Date().toISOString().split('T')[0],
  //           tel: 0,
  //           name1: availableValues.name1[0],
  //           region: availableValues.region[0],
  //           role: availableValues.role[0],
  //         }
  //   )
  // );

  deleteRows = (deletedIds) => {
    const rowsForDelete = this.state.rows.slice();
    deletedIds.forEach((rowId) => {
      const index = rowsForDelete.findIndex((row) => row.id === rowId);
      if (index > -1) {
        rowsForDelete.splice(index, 1);
      }
    });
    return rowsForDelete;
  };

  commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId =
        this.state.rows.length > 0
          ? this.state.rows[this.state.rows.length - 1].id + 1
          : 0;
      changedRows = [
        ...this.state.rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      changedRows = this.state.rows.map((row) =>
        changed[row.id] ? { ...row, ...changed[row.id] } : row
      );
    }
    if (deleted) {
      changedRows = this.deleteRows(deleted);
    }

    this.setState({
      rows: changedRows,
    });
    // setRows(changedRows);
  };

  // useEffect(() => {
  // axios.get("http://localhost:8080/users").then((res) => {
  //   // console.log(res);
  //   // console.log(res.data.content.length);
  //   setUsers(res.data.content);
  //   console.log(users);
  // for (let i = 0; i < res.data.content.length; i++) {
  //   console.log(res.data.content[i]);
  // }
  // address: null;
  // firstName: "MR1";
  // gender: 0;
  // lastName: "Sur1";
  // location: null;
  // passwd: null;
  // phone: null;
  // serviceDate: null;
  // serviceRequestDate: null;
  // severity: 0;
  // status: 0;
  // statusDate: null;
  // type: 3;
  // userId: 18;
  // userName: null;

  ////////////////////////////////////////////////////
  /*onFinish = (values) => {
    console.log(values);
    this.setState({
      redirect: true,
      data: {
        barcode: values.barcode,
        status: 4,
      },
    });
    console.log(values.barcode);
    console.log(values.status);
    console.log(this.state.data);
    axios.post("http://localhost:8080/device", this.state.data, {
      headers: {
        "content-type": "application/json",
      },
    });
  };*/
  ////////////////////////////////////////////////////
  render() {
    // let res;
    // axios.get("http://localhost:8080/users").then((res) => {
    //   this.setState({
    //     users: res.data.content,
    //   });
    // });
    // //   // console.log(res);
    // //   // console.log(res.data.content.length);
    // //   setUsers(res.data.content);
    // //   console.log(users);
    // let names = [];
    // let tels = [];
    // let roles = [];
    // for (let i = 0; i < res.data.content.length; i++) {
    //   console.log(res.data.content[i]);
    //   names.push(res.data.content[i].firstName + res.data.content[i].lastName);
    //   tels.push(res.data.content[i].phone);
    //   roles.push(res.data.content[i].type);
    // }

    return (
      <Paper>
        <Grid
          rows={this.state.rows}
          columns={this.state.columns}
          getRowId={getRowId}
        >
          <SortingState
            sorting={this.state.sorting}
            onSortingChange={this.getSorting}
          />
          <PagingState
            currentPage={this.state.currentPage}
            // onCurrentPageChange={this.state.setCurrentPage}
            pageSize={this.state.pageSize}
            // onPageSizeChange={this.state.setPageSize}
          />
          <EditingState
            editingRowIds={this.state.editingRowIds}
            onEditingRowIdsChange={this.state.getEditingRowIds}
            rowChanges={this.state.rowChanges}
            // onRowChangesChange={this.state.setRowChanges}
            addedRows={this.state.addedRows}
            onAddedRowsChange={this.state.changeAddedRows}
            onCommitChanges={this.state.commitChanges}
          />
          <SummaryState totalItems={this.state.totalSummaryItems} />

          <IntegratedSorting />
          <IntegratedPaging />
          <IntegratedSummary />

          <CurrencyTypeProvider for={this.state.currencyColumns} />
          <PercentTypeProvider for={this.state.percentColumns} />

          <DragDropProvider />

          <Table
            columnExtensions={this.state.tableColumnExtensions}
            cellComponent={Cell}
          />
          <TableColumnReordering
            order={this.state.columnOrder}
            // onOrderChange={this.state.setColuthis.mnOrder}
          />
          <TableHeaderRow showSortingControls />
          <TableEditRow cellComponent={EditCell} />
          <TableEditColumn
            width={150}
            showAddCommand={!this.state.addedRows.length}
            showEditCommand
            showDeleteCommand
            commandComponent={Command}
          />
          <TableSummaryRow />
          <TableFixedColumns leftColumns={this.state.leftFixedColumns} />
          <PagingPanel pageSizes={this.state.pageSizes} />
        </Grid>
      </Paper>
    );
  }
}

export default Admin;
