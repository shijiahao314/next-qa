import UserTable from '../../components/user/UserTable';

export default async function UsersPage() {
  return (
    <div className="flex h-full w-full flex-col px-10 py-10">
      <UserTable></UserTable>
    </div>
  );
}
