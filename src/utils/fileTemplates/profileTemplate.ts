const getProfileTemplate = function (appName: string, tabName: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<Profile xmlns="http://soap.sforce.com/2006/04/metadata">
    <applicationVisibilities>
        <application>${appName}</application>
        <default>false</default>
        <visible>true</visible>
    </applicationVisibilities>
    <tabVisibilities>
        <tab>${tabName}</tab>
        <visibility>DefaultOn</visibility>
    </tabVisibilities>
</Profile>`;
};

export { getProfileTemplate };
