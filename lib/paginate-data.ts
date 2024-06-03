export const paginateData = async (
  url: string,
  data: any[],
  per_page: number
) => {
  const page = parseFloat(new URL(url).searchParams.get("p") ?? "1");
  const perPage = per_page;

  const paginate = {
    total: data.length,
    per_page: perPage,
    last_page: Math.ceil(data.length / perPage),
    from: data.length ? (page - 1) * perPage + 1 : 0,
    to: Math.min(page * perPage, data.length),
    current_page: page,
    data: data.slice(
      (page - 1) * perPage + 1 - 1,
      Math.min(page * perPage, data.length)
    ),
  };

  return paginate;
};
