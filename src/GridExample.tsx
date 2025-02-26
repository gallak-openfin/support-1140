"use client";

// import { ModuleRegistry } from "@ag-grid-community/core";
// import { InfiniteRowModelModule } from "@ag-grid-community/infinite-row-model";
import { ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule, ValidationModule } from "ag-grid-community";
// import "@ag-grid-community/styles/ag-grid.css";
import { ColDef, GridReadyEvent, IDatasource } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

ModuleRegistry.registerModules([ClientSideRowModelModule, ValidationModule]);

// const CellRenderer = (props: any) => {
//   if (props.value !== undefined) {
//     console.log(`cellRenderer: value exists`);
//     return props.value;
//   } else {
//     console.log(`cellRenderer: showing spinner`);
//     return <img src={"https://www.ag-grid.com/example-assets/loading.gif"} />;
//   }
// };

const GridExample = () => {
  //   const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  // const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const gridRef = useRef<AgGridReact>(null);

  const [rowData, setRowData] = useState<any[]>([]);

  const [columnDefs] = useState<ColDef[]>([
    // this row shows the row index, doesn't use any data from the row
    {
      headerName: "ID",
      maxWidth: 100,
      // it is important to have node.id here, so that when the id changes (which happens
      // when the row is loaded) then the cell is refreshed.
      valueGetter: "node.id",
      cellRenderer: (props: any) => {
        if (props.value !== undefined) {
          return props.value;
        } else {
          return (
            <img src={"https://www.ag-grid.com/example-assets/loading.gif"} />
          );
        }
      },
    },
    { field: "athlete", minWidth: 150 },
    { field: "age" },
    { field: "country", minWidth: 150 },
    { field: "year" },
    { field: "date", minWidth: 150 },
    { field: "sport", minWidth: 150 },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 100,
      sortable: false,
    };
  }, []);

  //   const gridReady = () => {
  //     fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  //       .then((response) => response.json())
  //       .then(function (data) {
  //         // const dataSource: IDatasource = {
  //         //   rowCount: undefined, // behave as infinite scroll

  //         //   getRows: (params) => {
  //         //     console.log(
  //         //       "asking for " + params.startRow + " to " + params.endRow
  //         //     );

  //         //     // At this point in your code, you would call the server.
  //         //     // To make the demo look real, wait for 500ms before returning
  //         //     setTimeout(() => {
  //         //       // take a slice of the total rows
  //         //       const rowsThisPage = data.slice(params.startRow, params.endRow);
  //         //       // if on or after the last page, work out the last row.
  //         //       let lastRow = -1;
  //         //       if (data.length <= params.endRow) {
  //         //         lastRow = data.length;
  //         //       }
  //         //       // call the success callback
  //         //       params.successCallback(rowsThisPage, lastRow);
  //         //     }, 500);
  //         //   },
  //         // };
  //         // setRowDataSource(dataSource);
  //         setRowData(data);
  //       });
  //   };

  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((response) => response.json())
      .then((data: any[]) => {
        // const dataSource: IDatasource = {
        //   rowCount: undefined, // behave as infinite scroll

        //   getRows: (params) => {
        //     console.log(
        //       "asking for " + params.startRow + " to " + params.endRow
        //     );

        //     // At this point in your code, you would call the server.
        //     // To make the demo look real, wait for 500ms before returning
        //     setTimeout(() => {
        //       // take a slice of the total rows
        //       const rowsThisPage = data.slice(params.startRow, params.endRow);
        //       // if on or after the last page, work out the last row.
        //       let lastRow = -1;
        //       if (data.length <= params.endRow) {
        //         lastRow = data.length;
        //       }
        //       // call the success callback
        //       params.successCallback(rowsThisPage, lastRow);
        //     }, 500);
        //   },
        // };

        const newData = data.slice(0, 11);
        console.log(`----- fetched data: `, newData);
        setRowData(newData);

        // params.api.setDatasource(dataSource);
        // setRowDataSource(dataSource);
        // console.log(data);
        // setRowData(data);
      });
  }, []);

  const [intrvl, setIntrvl] = useState<any>(null);

  useEffect(() => {
    if (rowData.length === 0) return;
    if (!intrvl) {
      // update 10 rows every 500ms
      let row = 0;
      setIntrvl(
        setInterval(() => {
          console.log("Updating rows: ", row);
          const newData = [...rowData];
          newData[row % 11].athlete = `Updated #${row}`;
          setRowData(newData);
          row += 1;
        }, 500)
      );
    }
  }, [rowData]);

  // fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //         const dataSource: IDatasource = {
  //             rowCount: undefined,
  //             getRows: (params) => {
  //                 console.log('asking for ' + params.startRow + ' to ' + params.endRow);
  //                 // At this point in your code, you would call the server.
  //                 // To make the demo look real, wait for 500ms before returning
  //                 setTimeout(function () {
  //                     // take a slice of the total rows
  //                     const rowsThisPage = data.slice(params.startRow, params.endRow);
  //                     // if on or after the last page, work out the last row.
  //                     let lastRow = -1;
  //                     if (data.length <= params.endRow) {
  //                         lastRow = data.length;
  //                     }
  //                     // call the success callback
  //                     params.successCallback(rowsThisPage, lastRow);
  //                 }, 500);
  //             }
  //         };
  //         params.api.setGridOption('datasource', dataSource);
  //     });

  //         });
  // }, []);

  return (
    <div style={{ height: "550px", width: "100%" }}>
      <div style={{ height: "100%", width: "100%" }}>
        <AgGridReact
          ref={gridRef}
          columnDefs={columnDefs}
          rowData={rowData}
          defaultColDef={defaultColDef}
          // rowBuffer={0}
          // rowModelType={"infinite"}
          // cacheBlockSize={100}
          // cacheOverflowSize={2}
          // maxConcurrentDatasourceRequests={1}
          // infiniteInitialRowCount={1000}
          // maxBlocksInCache={10}
          // onGridReady={onGridReady}
        />
      </div>
    </div>
  );
};

export default GridExample;
