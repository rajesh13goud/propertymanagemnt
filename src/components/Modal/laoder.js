import React from "react";
import { render } from "react-dom";
import { makeData, Logo, Tips } from "./Utils";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Loader from "./loader";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: true
    };
  }
  render() {
    const MyLoader = () => <Loader loading={this.state.loading} />;
    return (
      <div>
        <ReactTable
          LoadingComponent={MyLoader}
          data={makeData()}
          columns={[
            {
              Header: "Name",
              columns: [
                {
                  Header: "First Name",
                  accessor: "firstName"
                },
                {
                  Header: "Last Name",
                  id: "lastName",
                  accessor: d => d.lastName
                }
              ]
            },
            {
              Header: "Info",
              columns: [
                {
                  Header: "Age",
                  accessor: "age"
                },
                {
                  Header: "Status",
                  accessor: "status"
                }
              ]
            },
            {
              Header: "Stats",
              columns: [
                {
                  Header: "Visits",
                  accessor: "visits"
                }
              ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
        <Tips />
        <Logo />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
