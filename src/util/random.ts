function generateRandomString() {
  return (Math.random() + 1).toString(36).substring(7);
}

export { generateRandomString };
