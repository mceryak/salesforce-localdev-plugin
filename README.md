# localdev
This plugin creates a Custom Tab for your LWC and a Custom Application for the Custom Tab. It provides Admin permissions to the App and Tab, and deploys these and the specified LWC to the specified (or default) org. Then, it launches Salesforce Local Dev (currently in Beta).

## Setup

1. Follow Salesforce's steps for the initial setup of Local Dev: [Salesforce's local dev](https://developer.salesforce.com/docs/platform/lwc/guide/get-started-test-components.html)
   - `sf plugins install @salesforce/plugin-lightning-dev`
   - In the Quick Find box, enter Local Dev and then select Local Dev. Select Enable Local Dev (Beta) to turn on the feature for all org users.
2. Clone this repo into your desired plugins folder: `git clone https://github.com/mceryak/salesforce-localdev-plugin.git`
3. Link the plugin: `sf plugins link .`
4. Compile the plugin: `yarn compile`

## Usage

Run the following command from your project directory, replacing 'myLWC' with the name of your LWC that you wish to preview: 
`sf localdev start -l myLWC`
