async function expensesData(url, id) {
  return await fetch(url, {
    method: "POST",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ userId: id }),
  })
}

export { expensesData };
