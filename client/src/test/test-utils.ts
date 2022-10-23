export {};

// import { render as rtlRender } from '@testing-library/react';

// export const render = async (
//   ui: any,
//   { route = '/', user, ...renderOptions }: Record<string, any> = {}
// ) => {
//   // if you want to render the app unauthenticated then pass "null" as the user
//   user = await initializeUser(user);

//   window.history.pushState({}, 'Test page', route);

//   const returnValue = {
//     ...rtlRender(ui, {
//       wrapper: AppProvider as FunctionComponent<unknown>,
//       ...renderOptions,
//     }),
//     user,
//   };

//   await waitForLoadingToFinish();

//   return returnValue;
// };
