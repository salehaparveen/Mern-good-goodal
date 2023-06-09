import { AdminAddForm } from "./AdminAddForm";
import { AdminProducts } from "./AdminProducts";

export const AdminDashboard = () => {
  return (
    <main className="flex w-full items-center bg-bgcolor md:min-h-screen">
      <div className="container mx-auto py-16 px-6 lg:px-16">
        <div className="mt-10 grid grid-cols-3 gap-8">
          <AdminAddForm />
          <AdminProducts />
        </div>
      </div>
    </main>
  );
};
