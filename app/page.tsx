import { ControlToolbar } from "./components/control-toolbar";
import {  ProductList,ProductListProps } from "./components/products-list";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:p-24">
      <div className="z-10 w-full max-w-5xl items-center  font-mono text-sm lg:flex flex-col border rounded-md py-4 ">
        <h1 className="flex justify-center w-full text-2xl my-2">Products App</h1>
        <ControlToolbar />
        <ProductList />
      </div>
    </main>
  );
}