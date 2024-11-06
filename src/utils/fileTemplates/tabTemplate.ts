const getTabTemplate = function (tabName: string, lwcName: string): string {
  return `
<?xml version="1.0" encoding="UTF-8"?>
<CustomTab xmlns="http://soap.sforce.com/2006/04/metadata">
  <label>${tabName}</label>
  <lwcComponent>${lwcName}</lwcComponent>
  <motif>Custom37: Bridge</motif>
</CustomTab>`;
};

export { getTabTemplate };
