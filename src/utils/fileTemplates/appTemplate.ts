const getAppTemplate = function (appName: string, tabName: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<CustomApplication xmlns="http://soap.sforce.com/2006/04/metadata">
    <brand>
        <headerColor>#0070D2</headerColor>
        <shouldOverrideOrgTheme>false</shouldOverrideOrgTheme>
    </brand>
    <formFactors>Small</formFactors>
    <formFactors>Large</formFactors>
    <isNavAutoTempTabsDisabled>false</isNavAutoTempTabsDisabled>
    <isNavPersonalizationDisabled>false</isNavPersonalizationDisabled>
    <isNavTabPersistenceDisabled>false</isNavTabPersistenceDisabled>
    <isOmniPinnedViewEnabled>false</isOmniPinnedViewEnabled>
    <label>${appName}</label>
    <navType>Standard</navType>
    <tabs>${tabName}</tabs>
    <uiType>Lightning</uiType>
    <utilityBar>Local_Dev_Testing_UtilityBar</utilityBar>
</CustomApplication>
`;
};

export { getAppTemplate };
