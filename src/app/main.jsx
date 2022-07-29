import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { IntlService } from '@progress/kendo-react-intl';

import { process } from '@progress/kendo-data-query';
import orders from './orders.json';
const DATE_FORMAT = 'yyyy-mm-dd hh:mm:ss.SSS';
const intl = new IntlService('en');
orders.forEach(o => {
  o.orderDate = intl.parseDate(o.orderDate ? o.orderDate : '20/20/2020', DATE_FORMAT);
  o.shippedDate = o.shippedDate ? undefined : intl.parseDate(o.shippedDate ? o.orderDate.toString() : '20/20/2020', DATE_FORMAT);
});

const DetailComponent = props => {
  const dataItem = props.dataItem;
  return (
    <div>
        <section style={{ width: "200px", float: "left" }}>
          <p><strong>Street:</strong> {dataItem.shipAddress.street}</p>
          <p><strong>City:</strong> {dataItem.shipAddress.city}</p>
          <p><strong>Country:</strong> {dataItem.shipAddress.country}</p>
          <p><strong>Postal Code:</strong> {dataItem.shipAddress.postalCode}</p>
        </section>
        <Grid style={{ width: "500px" }} data={dataItem.details} />
    </div>
  );
};

const App = () => {
  const [dataState, setDataState] = React.useState({
    skip: 0,
    take: 20,
    sort: [{
      field: 'orderDate',
      dir: 'desc'
    }],
    group: []
  });

  const [dataResult, setDataResult] = React.useState(process(orders, dataState));

  const dataStateChange = event => {
    setDataResult(process(orders, event.dataState));
    setDataState(event.dataState);
  };

  const expandChange = event => {
    const isExpanded = event.dataItem.expanded === undefined ? event.dataItem.aggregates : event.dataItem.expanded;
    event.dataItem.expanded = !isExpanded;
    setDataResult({ ...dataResult
    });
  };

  return (
    <Grid
      style={{ height: '700px' }}
      sortable={true}
      filterable={true}
      groupable={true}
      reorderable={true}
      pageable={{ buttonCount: 4, pageSizes: true }}
      data={dataResult}
      {...dataState}
      onDataStateChange={dataStateChange}
      detail={DetailComponent}
      expandField="expanded"
      onExpandChange={expandChange}>
        <GridColumn field="customerID" width="200px" />
        <GridColumn field="orderDate" filter="date" format="{0:D}" width="300px" />
        <GridColumn field="shipName" width="280px" />
        <GridColumn field="freight" filter="numeric" width="200px" />
        <GridColumn field="shippedDate" filter="date" format="{0:D}" width="300px" />
        <GridColumn field="employeeID" filter="numeric" width="200px" />
        <GridColumn locked={true} field="orderID" filterable={false} title="ID" width="90px" />
    </Grid>
  );
};

const container = document.querySelector('my-app');
const root = createRoot(container);
root.render(<App />);
