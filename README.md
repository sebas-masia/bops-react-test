# bops platform
The bops platform consist of three main pages: home, network and notifications.

## Home page
The Home page contains three main components:
1. **Product Summary Table**: View the three main kpis of different product categories.
1. **Product Summary Graph**: Select a time range to display any of the KPIs in the summary.
1. **Product Health Table**: View detailed information about all different products.

Additionally, there is a search bar to look for a specific product. After finding a product, you navigate to the Network page. You can also navigate to the network page by selecting a product in the Product Health Table.

## Network page
The Network page displays detailed information about the selected product. It includes a map showing the geo-location of stores, distributors, and lead times of the shipment movements (note that the map is not present in this demo).

## Notifications page
The Notifications page display a table with the total alerts and recommendations that a client must handle.

## The Platform [README](platform/README.md) has instructions on how to run the platform.

### Feature
[ ] Add the list of products available in the Floating Search bar. *The list of products is available in the materials endpoint*.

### Bugs
[ ] The Home page search bar does not allow you to navigate to the Network page when a product is selected.<br>
[ ] No “selected” feedback when selecting the time range in the Product Summary’s graph. It should show as shown on the left table. *Component MaterialCategoriesChart*