async function delay(time) {
  return new Promise((res) => setTimeout(res, time));
}

export default delay;
