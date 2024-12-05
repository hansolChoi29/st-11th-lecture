import { todoApi } from "../api/todos";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { useQuery } from "@tanstack/react-query";

// useQuery에서 queryFn이 실행되고 return값이 상태변경이 된다.
export default function Home() {
  // refetch 는 queryFn 내보내기 위해 씀.
  const { data, error, refetch, isPending } = useQuery({
    queryKey: ["todos"],
    // 쿼리키는 반드시 배열이다.
    queryFn: async () => {
      // 쿼리펑션은 서버에서 데이터 불러오고 상태변경 요청 두가지 동작 함.
      const response = await todoApi.get("/todos?_sort=-createdAt");
      return response.data;
    },
  });

  if (isPending) {
    return <div style={{ fontSize: 36 }}>로딩중...</div>;
  }

  if (error) {
    return (
      <div style={{ fontSize: 24 }}>에러가 발생했습니다: {error.message}</div>
    );
  }

  return (
    <>
      <h2>서버통신 투두리스트 by useState</h2>
      <TodoForm fetchData={refetch} />
      <TodoList todos={data} />
    </>
  );
}
