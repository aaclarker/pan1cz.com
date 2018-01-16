import React, { Component } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import config from './config'

class Budget extends Component {
  constructor() {
    super()
    this.state = {
      transactions: []
    }
  }

  componentDidMount() {
    fetch(config.getTransactionsURI, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ transactions: data.transactions })
      })
  }

  render() {
    const { transactions } = this.state
    const columns = [
      {
        Header: 'Time',
        id: 'time',
        accessor: t => new Date(t.transactionTimestamp).toLocaleString(),
        sortMethod: (a, b) => {
          return new Date(a) > new Date(b) ? 1 : -1
        },
        Footer: (
          <span>
            <strong>Total Transactions: </strong>
            {this.state.transactions.length}
          </span>
        )
      },
      {
        Header: 'Amount',
        accessor: 'transactionAmount',
        sortMethod: (a, b) => {
          return Number(a) > Number(b) ? 1 : -1
        },
        Footer: (
          <span>
            <strong>Spent: </strong>
            {this.state.transactions
              .reduce((total, transaction) => Number(total) + Number(transaction.transactionAmount), 0)
              .toFixed(2)}
          </span>
        )
      }
    ]
    return <ReactTable data={transactions} columns={columns} />
  }
}

export default Budget
