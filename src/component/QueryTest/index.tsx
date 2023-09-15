import useQuery from "../../hooks/useQuery/useQuery";

const QueryTest = () => {
  const { data } = useQuery(
    {
      name: "getInventory",
      param: {},
    },
    { suspense: true }
  );

  console.log(data);
  return <div>Pets</div>;
};

export default QueryTest;

// export const usePets = () => {
//   return useQuery({
//     queryKey: ["get-pets"],
//     queryFn: async () => {
//       let a;
//       try {
//         const res = await DefaultService["findPets"]();
//         a = res.error || res.data;
//         return a;
//       } catch (err) {
//         return a;
//       }
//       // const response = await api.pets.findPets();
//       // if (response.error) return response.error;
//       // return response.data;
//     },
//     onSuccess: (res) => {
//       // res.error;
//     },
//     onError: () => {},
//   });
// };
