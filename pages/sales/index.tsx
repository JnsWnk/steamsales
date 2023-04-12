import { useRouter } from "next/router";

const Sales = (props: any) => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <h1>Sales</h1>
      <p>{id}</p>
    </div>
  );
};

export default Sales;
