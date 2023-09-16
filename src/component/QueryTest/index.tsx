import { useRef, useState } from "react";
import { Order } from "../../generated";
import { useMutation } from "../../hooks/useMutation/useMutation";
import { queryClient } from "../../query";
import { useQuery } from "../../hooks/useQuery/useQuery";

const QueryTest = () => {
  const [quantity, setQuantity] = useState("");
  const [petId, setPetId] = useState("");

  const orderIdRef = useRef<HTMLInputElement>(null);

  const { data } = useQuery(
    {
      name: "getInventory",
    },
    {
      select: (data) => {
        return Object.entries(data);
      },
    }
  );

  const { data: dataOrderById } = useQuery(
    {
      name: "getOrderById",
      param: {
        orderId: Number(orderIdRef.current?.value) || 1,
      },
    },
    {
      onError: (err) => console.log(err),
      select: (data) => {
        return Object.entries(data);
      },
    }
  );

  console.log(dataOrderById);
  const { data: datas, mutateAsync } = useMutation("placeOrder", {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["getOrderById"]);
    },
  });

  return (
    <>
      {data?.map(([key, value]: any) => (
        <div key={key}>
          {key}:{value}
        </div>
      )) || "데이터가 없습니다."}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(datas);
          try {
            console.log(Number(orderIdRef.current?.value));
            mutateAsync({
              body: {
                id: Number(orderIdRef.current?.value),

                petId: Number(petId),
                quantity: Number(quantity),

                status: Order.status.PLACED,
                complete: true,
              },
            });
          } catch (e) {
            alert(e);
          }
        }}
      >
        <div>
          <label htmlFor="id">id</label>

          <input
            id="id"
            type="text"
            // value={orderId}
            // onChange={(e) => setOrderId(e.target.value)}
            ref={orderIdRef}
            onChange={(e) => {
              if (isNaN(Number(e.target.value))) {
                alert("숫자만 입력하세요");
                e.target.value = "";
              }
              console.log(orderIdRef.current?.value);
            }}
          />
        </div>

        <div>
          <label htmlFor="petId">petId</label>

          <input
            id="petId"
            type="text"
            value={petId}
            onChange={(e) => setPetId(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="quantity">quantity</label>

          <input
            id="quantity"
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <button>뮤테이션</button>

        <div>dataByOrderId</div>
        <div>
          {dataOrderById?.map(([key, value]: any) => (
            <div key={key}>
              {key}:{value}
            </div>
          )) || "데이터가 없습니다."}
        </div>
        {/* <div>{dataOrderById?.id}</div> */}
      </form>
    </>
  );
};

export default QueryTest;
