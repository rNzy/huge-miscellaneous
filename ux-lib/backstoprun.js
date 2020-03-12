const backstop = require('backstopjs');

const { uxEfs } = process.env;
const baseHref = 'http://localhost:7000/all.html';

const config = {
  viewports: [
    {
      label: 'phone',
      width: 320,
      height: 480
    },
    {
      label: 'tablet',
      width: 740,
      height: 768
    },
    {
      label: 'desktop',
      width: 1090,
      height: 768
    }
  ],
  //onBeforeScript: 'puppet/onBefore.js',
  //onReadyScript: 'puppet/onReady.js',
  scenarios: [
    {
      label: uxEfs,
      url: baseHref
    }
  ],
  paths: {
    bitmaps_reference: 'backstop_data/' + uxEfs + '/bitmaps_reference',
    bitmaps_test: 'backstop_data/' + uxEfs + '/bitmaps_test',
    engine_scripts: 'backstop_data/' + uxEfs + '/engine_scripts',
    html_report: 'backstop_data/' + uxEfs + '/html_report',
    ci_report: 'backstop_data/' + uxEfs + '/ci_report'
  },
  report: ['browser'],
  engine: 'puppeteer',
  engineOptions: {
    args: ['--no-sandbox']
  },
  asyncCaptureLimit: 5,
  asyncCompareLimit: 50,
  debug: false,
  debugWindow: false
};

// const getRefFile = () => {
//   // Dl refFile from ftp server
//   // before test
// };

// const sendRefFile = () => {
//   // Up new refFile on ftp server
//   // after approve
// };

switch (process.argv[2]) {
  case 'test':
    // getRefFile();
    backstop('test', { config });
    break;
  case 'approve':
    backstop('approve', { config });
    // sendRefFile();
    break;
}
