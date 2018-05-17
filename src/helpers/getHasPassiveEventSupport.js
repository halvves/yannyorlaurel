export default () => {
  let hasPassiveSupport = false;
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get() {
        hasPassiveSupport = true;
        return hasPassiveSupport;
      },
    });

    window.addEventListener('test', null, opts);
  } catch (e) {
    hasPassiveSupport = false;
  }

  return hasPassiveSupport;
};
