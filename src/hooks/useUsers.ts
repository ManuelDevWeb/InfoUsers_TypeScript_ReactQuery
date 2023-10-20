// React query
import { useInfiniteQuery } from "@tanstack/react-query";

// Importamos el fetchUsers
import { fetchUsers } from "../services/users";

// Types
import { type User } from "../types.d";

export const useUsers = () => {
  // Gracias a react query no tenemos que declarar los estados de loading, error y data (users)
  const {
    isLoading,
    isError,
    data,
    // Refetch es una funcion que nos permite volver a hacer el fetch
    refetch,
    // Hace un fetch de la siguiente página
    fetchNextPage,
    // Indica si hay una siguiente página
    hasNextPage,
  } =
    // Los tipados que ponemos, son los tipos de los datos que nos va a devolver la query
    useInfiniteQuery<{ nextPage?: number, users: User[] }>({
      // Necesita la key para identificar la información
      queryKey: ["usersState"],
      // Necesitamos una función que devuelva una promesa con los datos del fetch. Implicitamente, se le pasa el argumento pageParam
      queryFn: fetchUsers,
      // Función que nos permite obtener la siguiente página
      getNextPageParam: (lastPage) => lastPage.nextPage,
      initialPageParam: 1,
      // Desactivamos el refetch cuando la ventana no está en foco (Tener cuidado con esto ya que si esta activo, puede hacer muchos fetch)
      refetchOnWindowFocus: false,
      // Tiempo de expiración de la data, esto nos indica que tan viejos pueden ser los datos que nos devuelve la cache
      staleTime: 1000 * 60 * 5, // 5 minutos
    });

  // Pages es un array con los datos de cada página (users y nextPage)
  // console.log(data);

  return {
    isLoading,
    isError,
    // Add a type assertion to tell TypeScript that the `data` object has a `pages` property that is an array of objects with a `users` property
    users: data?.pages.flatMap((page) => page.users) ?? [] as User[],
    refetch,
    fetchNextPage,
    hasNextPage,
  };
};
