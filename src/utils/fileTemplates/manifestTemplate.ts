const getManifestTemplate = function (appName: string, lwcName: string, tabName: string): string {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
	<types>
		<members>${appName}</members>
		<name>CustomApplication</name>
	</types>
  <types>
  <members>${lwcName}</members>
  <name>LightningComponentBundle</name>
  </types>
	<types>
		<members>${tabName}</members>
		<name>CustomTab</name>
	</types>
  <types>
		<members>Admin</members>
		<name>Profile</name>
	</types>
  <version>60.0</version>
</Package>`;
};

export { getManifestTemplate };
