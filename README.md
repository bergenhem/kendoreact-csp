# Sample App Showing the KendoReact Grid with Strict CSP

The purpose of this project is to show the [KendoReact Grid](https://www.telerik.com/kendo-react-ui/components/grid/) with Strict CSP.

All features of the KendoReact Grid component can run under strict CSP.

The one exception is for the embedded Font Icons, which requires a developer to allow `data:` sources for `font-src`.

The requirement to use Font Icons, and the exception above, should be addressed by January 2023.

## Steps to Run Project
1. `npm install`
2. `npm start`