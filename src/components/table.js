import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

const tableColumns = [
  {
    dataField: 'conversations',
    text: 'conversation count'
  },
  {
    dataField: 'missed_chats',
    text: 'missed chat count'
  },
  {
    dataField: 'visitor_conversations',
    text: 'visitors with conversation count'
  },
  {
    dataField: 'date',
    text: 'Date',
    sort: true
  }
];

const pagination = paginationFactory({
  sizePerPage: 5,
  hideSizePerPage: true
});

class Table extends Component {
  render() {
    return (
      <BootstrapTable
        keyField="id"
        data={this.props.dataByDate}
        columns={tableColumns}
        pagination={pagination}
        striped
        hover
        condensed
      />
    );
  }
}

export default Table;
