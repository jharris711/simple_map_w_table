import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";

import { connect } from "react-redux";

import { handleSelection } from "./redux";

import circles from "./assets/data/circles";

import { addToOrRemoveFromArray } from "./utils";

const NATable = ({ handleSelection, selections }) => {
  const [selectionIndexes, setSelectionIndexes] = useState([])

  // When selections changes in redux store:
  useEffect(() => {
    // console.log("Incoming selections:", selections);
    let indexes = []
    // Get the index of each incoming piece of data:
    if (selections) {
      selections.forEach((selection) => {
        let index = circles.indexOf(selection);
        // Push to index array
        indexes.push(index);
      })
    }
    // Set data and index arrays to local hooks:
    setSelectionIndexes(indexes);
  }, [selections]);


  // Table options:
  const options = {
    rowsSelected: selectionIndexes,
    selectToolbarPlacement: "none",
    selectableRows: "multiple",
    setRowProps: (row, dataIndex, rowIndex) => {
      return {
        style: {
          padding: ".5rem",
          margin: ".5rem auto"
        }
      };
    },
    // When a row(s) is/are selected:
    onRowSelectionChange: (
      currentRowsSelected,
      allRowsSelected,
      rowsSelected
    ) => {
      let selected_row_indexes = []
      let selected_row_data = []
      // console.log("rowsSelected:", JSON.stringify(rowsSelected));
      // Find index of each data object in respective data set:
      rowsSelected.forEach((row) => {
        // Add or remove row index from indexes arr:
        selected_row_indexes = addToOrRemoveFromArray(row, selected_row_indexes, 'selected_row_indexes')
        let circle_data = circles[row]
        selected_row_data = addToOrRemoveFromArray(circle_data, selected_row_data, 'selected_row_data')
        handleSelection(selected_row_data)
      });
    }
  };

  const columns = [
    {
      name: "marker",
      label: "Marker",
      options: {
        filter: false,
        sort: false
      }
    },
    {
      name: "lat",
      label: "Latitude",
      options: {
        filter: false,
        sort: false
      }
    },
    {
      name: "lon",
      label: "Longitude",
      options: {
        filter: false,
        sort: false
      }
    },
    {
      name: "radius",
      label: "Radius",
      options: {
        filter: false,
        sort: false
      }
    }
  ];

  const table_name = `Circle Markers`;

  return (
    <>
      <div style={{ display: "table", tableLayout: "fixed", width: "100%" }}>
        <MUIDataTable
          title={<h3>{table_name}</h3>}
          data={circles}
          columns={columns}
          options={options}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    selections: state.selection.selections
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSelection: (selections) =>
      dispatch(handleSelection(selections))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NATable);
