// https://www.npmjs.com/package/next-nprogress-bar
// Create a Providers component to wrap your application with all the components requiring 'use client', such as next-nprogress-bar or your different contexts...
'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const ProgressBarProviders = ({}) => {
  return (
    <>
      <ProgressBar
        height="2px"
        color="#4e78c7"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default ProgressBarProviders;