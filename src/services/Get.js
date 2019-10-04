const Get = async (url) => {
  try {
    const response  = await fetch(url);
    const result = await response.json();
    return result;
  } catch (err) {
    console.log("url", url);
    alert("error occurred for -> ", url);
    return null;
  }
}

export { Get };