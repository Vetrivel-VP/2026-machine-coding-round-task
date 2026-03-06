export const updateSearchParam = (
  key,
  value,
  searchParams,
  setSearchParams,
) => {
  const params = new URLSearchParams(searchParams);

  if (value) {
    params.set(key, value);
  } else {
    params.delete(key);
  }

  setSearchParams(params);
};
