// Funcion para hacer fetch de los usuarios (El pageParam lo envia react query gracias a getNextPageParam)
export const fetchUsers = async ({ pageParam = 1 }: { pageParam?: number }) => {
  // Es prefible usar fetch en vez de axios para manipular los errores
  return await fetch(
    `https://randomuser.me/api?results=10&seed=abc&page=${pageParam}`
  )
    .then(async (res) => {
      if (!res.ok) throw new Error("Ha ocurrido un error");
      return await res.json();
    })
    .then((res) => {
      const currentPage = Number(res.info.page);
      const nextPage = currentPage > 10 ? undefined : currentPage + 1;

      return {
        users: res.results,
        nextPage,
      };
    });
};
