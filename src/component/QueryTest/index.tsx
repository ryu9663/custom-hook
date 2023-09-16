import useQuery from "../../hooks/useQuery/useQuery";

const QueryTest = () => {
  const { data } = useQuery(
    {
      name: "getInventory",
    },
    {
      suspense: true,
      select: (data) => {
        return Object.entries(data);
      },
    }
  );

  return (
    <>
      {data?.map(([key, value]) => (
        <div key={key}>
          {key}:{value}
        </div>
      )) || "데이터가 없습니다."}
    </>
  );
};

export default QueryTest;
